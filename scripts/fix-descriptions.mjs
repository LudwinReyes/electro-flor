/**
 * Script para corregir descripciones que se importaron como [object Object]
 * 
 * Ejecutar con:
 * $env:SANITY_WRITE_TOKEN="tu_token"; node scripts/fix-descriptions.mjs
 */

import { createClient } from '@sanity/client';

const client = createClient({
    projectId: '2gy084y4',
    dataset: 'production',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: '2024-01-01'
});

async function fixDescriptions() {
    if (!process.env.SANITY_WRITE_TOKEN) {
        console.log('⚠️  FALTA EL TOKEN. Ejecuta:');
        console.log('$env:SANITY_WRITE_TOKEN="tu_token"; node scripts/fix-descriptions.mjs');
        return;
    }

    console.log('📂 Buscando productos con descripciones rotas...');

    // Obtener todos los productos
    const products = await client.fetch(`*[_type == "product"] { _id, name, description }`);

    let fixedCount = 0;

    for (const product of products) {
        let needsFix = false;
        let newDescription = '';

        // Caso 1: description es un array de bloques de Portable Text
        if (Array.isArray(product.description)) {
            newDescription = product.description
                .map(block => {
                    if (block._type === 'block' && block.children) {
                        return block.children.map(child => child.text || '').join('');
                    }
                    if (typeof block === 'object') {
                        return block.text || block.value || JSON.stringify(block);
                    }
                    return String(block);
                })
                .join('\n');
            needsFix = true;
        }
        // Caso 2: description es un objeto
        else if (typeof product.description === 'object' && product.description !== null) {
            if (product.description.children) {
                newDescription = product.description.children.map(c => c.text || '').join('');
            } else {
                newDescription = product.description.text || product.description.value || '';
            }
            needsFix = true;
        }
        // Caso 3: description contiene "[object Object]"
        else if (typeof product.description === 'string' && product.description.includes('[object Object]')) {
            // No podemos recuperar el texto original, lo dejamos vacío
            newDescription = '';
            needsFix = true;
        }

        if (needsFix) {
            try {
                await client.patch(product._id)
                    .set({ description: newDescription || '' })
                    .commit();
                fixedCount++;
                console.log(`✅ Corregido: ${product.name}`);
                if (newDescription) {
                    console.log(`   📝 "${newDescription.substring(0, 80)}..."`);
                } else {
                    console.log(`   ⚠️  Descripción vacía (necesita editarse manualmente)`);
                }
            } catch (error) {
                console.error(`❌ Error con "${product.name}": ${error.message}`);
            }
        }
    }

    if (fixedCount === 0) {
        console.log('✅ No se encontraron descripciones rotas.');
    } else {
        console.log(`\n📊 Corregidos: ${fixedCount} productos`);
    }
}

fixDescriptions().catch(console.error);
