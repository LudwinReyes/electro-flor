/**
 * Script para importar productos desde Excel (.xlsx) a Sanity
 * 
 * Instrucciones:
 * 1. Llena el archivo plantilla_productos.xlsx
 * 2. Ejecuta: node scripts/importar-productos.mjs
 */

import { createClient } from '@sanity/client';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración del cliente Sanity
const client = createClient({
    projectId: '2gy084y4',
    dataset: 'production',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: '2024-01-01'
});

// Campos fijos que NO son especificaciones
const FIXED_FIELDS = [
    'nombre',
    'slug',
    'descripcionCorta',
    'marca',
    'categoria',
    'urlPdf',
    'urlVideo',
    // Variaciones comunes
    'descripcióncorta', 'descripción corta',
    'url pdf', 'url video'
];

function normalizeHeader(header) {
    return header.toLowerCase().trim();
}

// Función para generar slug
function generateSlug(name) {
    if (!name) return '';
    return name
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// Función para crear documento de producto
function createProductDocument(row, index) {
    const rowNormalized = {};
    Object.keys(row).forEach(key => {
        rowNormalized[normalizeHeader(key)] = row[key];
    });

    const nombre = rowNormalized['nombre'];
    if (!nombre) return null;

    const slug = rowNormalized['slug'] || generateSlug(nombre);

    // Extraer especificaciones dinámicas
    const specifications = [];
    Object.keys(row).forEach(key => {
        const normalizedKey = normalizeHeader(key);
        if (!FIXED_FIELDS.includes(normalizedKey) && row[key]) {
            specifications.push({
                _type: 'object',
                _key: generateSlug(key),
                label: key.trim(),
                value: row[key].toString().trim()
            });
        }
    });

    return {
        _type: 'product',
        _id: `imported-product-${index}-${Date.now()}`,
        name: nombre,
        slug: { _type: 'slug', current: slug },
        shortDescription: rowNormalized['descripcioncorta'] || rowNormalized['descripcion corta'] || '',
        brand: rowNormalized['marca'] || '',
        category: rowNormalized['categoria'] ? { _type: 'reference', _ref: `category-${generateSlug(rowNormalized['categoria'])}` } : undefined,
        pdfUrl: rowNormalized['urlpdf'] || rowNormalized['url pdf'] || undefined,
        youtubeVideo: rowNormalized['urlvideo'] || rowNormalized['url video'] || undefined,
        specifications: specifications,
        isNew: true
    };
}

async function createTemplate() {
    const wb = XLSX.utils.book_new();
    const data = [
        {
            nombre: "Ejemplo: Llave Térmica",
            descripcionCorta: "Llave térmica de alta calidad",
            marca: "Schneider",
            categoria: "Interruptores",
            urlPdf: "https://example.com/ficha.pdf",
            urlVideo: "",
            // Columnas dinámicas de ejemplo
            "Voltaje": "220V",
            "Amperaje": "25A",
            "Polos": "2"
        }
    ];
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Productos");
    const path = join(__dirname, '..', 'plantilla_productos.xlsx');
    XLSX.writeFile(wb, path);
    console.log(`✅ Plantilla creada en: ${path}`);
}

// Función principal
async function importProducts() {
    // Si se pasa --template, solo crea la plantilla
    if (process.argv.includes('--template')) {
        await createTemplate();
        return;
    }

    const excelPath = join(__dirname, '..', 'plantilla_productos_rellena.xlsx');

    if (!existsSync(excelPath)) {
        console.log('❌ No se encontró el archivo plantilla_productos.xlsx');
        console.log('💡 Ejecuta "node scripts/importar-productos.mjs --template" para crear uno de ejemplo.');
        return;
    }

    console.log('📂 Leyendo archivo Excel...');
    const workbook = XLSX.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const records = XLSX.utils.sheet_to_json(worksheet);

    console.log(`📦 Se encontraron ${records.length} filas para procesar`);

    if (records.length === 0) {
        console.log('❌ El archivo está vacío');
        return;
    }

    // Verificar token
    if (!process.env.SANITY_WRITE_TOKEN) {
        console.log('\n⚠️  FALTA CONFIGURAR EL TOKEN DE SANITY\n');
        console.log('Ejecuta: $env:SANITY_WRITE_TOKEN="tu_token_aqui" (PowerShell) o set SANITY_WRITE_TOKEN=token (CMD)');
        return;
    }

    console.log('🚀 Iniciando importación...');
    let successCount = 0;
    let errorCount = 0;

    // Paso previo: Crear categorías únicas
    const categories = new Set();
    records.forEach(r => {
        if (r.categoria) categories.add(r.categoria);
    });

    console.log(`📋 Creando ${categories.size} categorías...`);
    for (const catName of categories) {
        const catSlug = generateSlug(catName);
        const catId = `category-${catSlug}`;
        try {
            await client.createOrReplace({
                _type: 'category',
                _id: catId,
                name: catName,
                slug: { _type: 'slug', current: catSlug }
            });
            console.log(`   ✨ Categoría: ${catName}`);
        } catch (e) {
            console.error(`   ❌ Error creando categoría ${catName}: ${e.message}`);
        }
    }

    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        try {
            const doc = createProductDocument(record, i);
            if (!doc) continue;

            // Limpieza de undefined
            Object.keys(doc).forEach(key => doc[key] === undefined && delete doc[key]);

            await client.createOrReplace(doc);
            successCount++;
            console.log(`✅ [${i + 1}/${records.length}] ${doc.name}`);
        } catch (error) {
            errorCount++;
            console.log(`❌ [${i + 1}/${records.length}] Error: ${error.message}`);
        }
    }

    console.log(`\n📊 Importados: ${successCount} | Errores: ${errorCount}`);
}

importProducts().catch(console.error);
