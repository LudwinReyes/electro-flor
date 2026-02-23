
import { createRequire } from 'module';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');
const pdfModule = require('pdf-parse');
const PDFParse = pdfModule.PDFParse || pdfModule.default?.PDFParse;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function debug() {
    // 1. Check Excel Content
    const excelPath = path.join(__dirname, '..', 'plantilla_productos_rellena.xlsx');
    if (fs.existsSync(excelPath)) {
        console.log('--- EXCEL CONTENT ---');
        const wb = XLSX.readFile(excelPath);
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet);
        console.log(`Rows found: ${data.length}`);
        if (data.length > 0) {
            console.log('First Row:', JSON.stringify(data[0], null, 2));
        } else {
            console.log('Excel file is valid but empty (no rows).');
        }
    } else {
        console.log('Excel file does not exist.');
    }

    // 2. Check PDF Extraction on one file
    const pdfDir = path.join(__dirname, '..', 'pdf');
    if (fs.existsSync(pdfDir)) {
        const files = fs.readdirSync(pdfDir).filter(f => f.endsWith('.pdf'));
        if (files.length > 0) {
            const file = files[0];
            console.log(`\n--- TESTING PDF: ${file} ---`);
            const buffer = fs.readFileSync(path.join(pdfDir, file));

            try {
                if (!PDFParse) {
                    console.error('PDFParse class not found in module export!');
                    console.log('Module keys:', Object.keys(pdfModule));
                    return;
                }
                const parser = new PDFParse({ data: buffer });
                const result = await parser.getText();
                console.log('Text Length:', result.text.length);
                console.log('First 500 chars review:');
                console.log(result.text.slice(0, 500));

                await parser.destroy();
            } catch (e) {
                console.error('PDF Parse Error:', e);
            }
        }
    }
}

debug();
