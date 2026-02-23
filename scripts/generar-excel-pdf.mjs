/**
 * Script para generar Excel desde PDFs
 * 
 * Uso: node scripts/generar-excel-pdf.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import * as XLSX from 'xlsx';

const require = createRequire(import.meta.url);
const pdfModule = require('pdf-parse');
// The installed version of pdf-parse exports a class named PDFParse
const PDFParse = pdfModule.PDFParse || pdfModule.default?.PDFParse || pdfModule;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_DIR = path.join(__dirname, '..', 'pdf');
const OUTPUT_FILE = path.join(__dirname, '..', 'plantilla_productos_rellena.xlsx');

// Listas de referencia para heurísticas
const KNOWN_BRANDS = [
    'PHILIPS', 'LEDVANCE', 'SCHNEIDER', 'BTICINO', 'INDECO',
    'MACROLED', 'OPALUX', 'DAXSO', 'SOLUM', 'DIXON', '3M',
    'LEGRAND', 'DONILUX', 'CENTELSA', 'GENERAL ELECTRIC', 'ABB'
];

const CATEGORY_KEYWORDS = {
    'Reflectores': ['REFLECTOR', 'FLOODLIGHT', 'PROYECTOR'],
    'Alumbrado Público': ['LUMINARIA ORNAMENTAL', 'PASTORAL', 'ALUMBRADO PUBLICO', 'STREETLIGHT', 'FAROLA'],
    'Interruptores': ['INTERRUPTOR', 'LLAVE', 'TOMACORRIENTE', 'ENCHUFE', 'PLACA', 'DIFERENCIAL', 'TERMICA'],
    'Cables': ['CABLE', 'ALAMBRE', 'CORDON', 'CONDUCTOR'],
    'Industrial': ['HIGH BAY', 'CAMPANA', 'HERMETICO', 'ESTANCA', 'NUCLEO', 'TRANSFORMADOR'],
    'Paneles y Downlights': ['PANEL', 'DOWNLIGHT', 'SPOT', 'EMPOTRABLE', 'ADOSABLE'],
    'Emergencia': ['EMERGENCIA', 'SEÑALIZACION', 'SALIDA']
};

// Expresiones regulares para buscar datos técnicos
const PATTERNS = {
    'Potencia': /(\d+\s*[Ww](?:atts?)?)(?!\w)/i,
    'Voltaje': /(\d{2,3}(?:-\d{2,3})?\s*[Vv](?:olt(?:ios?)?)?)(?!\w)/i,
    'Tensión': /(?:Tensión|Voltaje)[:\s]+(\d{2,3}(?:-\d{2,3})?\s*V)/i,
    'Lúmenes': /(\d+\s*(?:lm|Lúmenes|Lumenes|lumens))/i,
    'Temperatura': /(\d{3,4}\s*[Kk])(?!\w)/i,
    'IP': /(IP\s*\d{2})/i,
    'Vida Útil': /(\d+[.,]?\d*\s*[hH](?:oras?)?)/i,
    'CRI': /CRI\s*[:>]?\s*(\d+)/i,
    'Ángulo': /(\d+°)/
};

function inferBrand(text) {
    const upperText = text.toUpperCase();
    for (const brand of KNOWN_BRANDS) {
        if (upperText.includes(brand)) return brand;
    }
    return "";
}

function inferCategory(text, filename) {
    const combinedText = (filename + " " + text).toUpperCase();
    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        if (keywords.some(k => combinedText.includes(k))) return category;
    }
    return "";
}

function extractDescription(text) {
    // Buscar secciones comunes de descripción
    const match = text.match(/(?:DESCRIPCIÓN(?: DE PRODUCTO)?|CARACTERÍSTICAS|PRESENTACIÓN)[:\s\r\n]+((?:.{1,200}[\r\n]){1,3})/i);
    if (match && match[1]) {
        return match[1].replace(/\s+/g, ' ').trim();
    }
    return "";
}

function cleanText(text) {
    if (!text) return "";
    return text.toString().replace(/\s+/g, ' ').trim();
}

// Función para obtener nombre legible del archivo
function getNameFromFilename(filename) {
    return filename
        .replace(/\.pdf$/i, '')
        .replace(/[-_]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

async function processPdfs() {
    if (!fs.existsSync(PDF_DIR)) {
        console.error(`❌ No se encontró la carpeta 'pdf' en: ${PDF_DIR}`);
        return;
    }

    const files = fs.readdirSync(PDF_DIR).filter(f => f.toLowerCase().endsWith('.pdf'));
    console.log(`📂 Encontrados ${files.length} archivos PDF.`);

    const products = [];

    for (const file of files) {
        const filePath = path.join(PDF_DIR, file);
        const dataBuffer = fs.readFileSync(filePath);

        try {
            let text = "";
            let rawText = "";

            // Handle different PDFParse instantiation patterns
            if (typeof PDFParse === 'function') {
                const parser = new PDFParse({ data: dataBuffer });
                const result = await parser.getText();
                rawText = result.text;
                if (parser.destroy) await parser.destroy();
            } else if (typeof PDFParse === 'object' && typeof PDFParse.default === 'function') {
                // Sometimes module interop puts the class deeper
                const parser = new PDFParse.default({ data: dataBuffer });
                const result = await parser.getText();
                rawText = result.text;
                if (parser.destroy) await parser.destroy();
            } else {
                // Fallback for function export
                const data = await pdfModule(dataBuffer);
                rawText = data.text;
            }

            text = cleanText(rawText);

            const product = {
                nombre: getNameFromFilename(file),
                descripcionCorta: extractDescription(rawText),
                marca: inferBrand(text),
                categoria: inferCategory(text, file),
                urlPdf: file,
                urlVideo: ""
            };

            // Intentar extraer especificaciones
            let specsFound = 0;
            for (const [key, regex] of Object.entries(PATTERNS)) {
                const match = text.match(regex);
                if (match) {
                    product[key] = match[1] || match[0];
                    specsFound++;
                }
            }

            products.push(product);
            console.log(`✅ Procesado: ${file} (Marca: ${product.marca}, Cat: ${product.categoria})`);

        } catch (error) {
            console.error(`❌ Error procesando ${file}:`, error.message);
            products.push({
                nombre: getNameFromFilename(file),
                urlPdf: file,
                ERROR: "Error leyendo PDF: " + error.message
            });
        }
    }

    if (products.length === 0) {
        console.log("⚠️ No se procesaron productos.");
        return;
    }

    // Calcular todas las columnas posibles (Unión de claves)
    const allKeys = new Set();
    // Definir orden preferido para las primeras columnas
    const priorityKeys = ['nombre', 'descripcionCorta', 'marca', 'categoria', 'urlPdf', 'urlVideo'];
    priorityKeys.forEach(k => allKeys.add(k));

    // Agregar el resto de claves dinámicamente
    products.forEach(p => Object.keys(p).forEach(k => allKeys.add(k)));

    console.log(`\n📋 Columnas detectadas: ${Array.from(allKeys).join(', ')}`);

    // Crear Excel con encabezados explícitos
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(products, { header: Array.from(allKeys) });

    // Ajustar ancho de columnas visualmente
    const colWidths = Array.from(allKeys).map(() => ({ wch: 25 }));
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, "Productos Extraídos");
    try {
        XLSX.writeFile(wb, OUTPUT_FILE);
        console.log(`\n🎉 Excel generado exitosamente: ${OUTPUT_FILE}`);
        console.log(`Total productos: ${products.length}`);
    } catch (e) {
        if (e.code === 'EBUSY') {
            console.error("\n❌ ERROR: El archivo Excel está abierto. Ciérralo y vuelve a intentar.");
        } else {
            console.error("\n❌ Error escribiendo Excel:", e.message);
        }
    }
}

processPdfs().catch(console.error);
