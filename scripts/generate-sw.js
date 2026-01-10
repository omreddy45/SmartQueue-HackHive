
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple .env parser since we can't rely on dotenv being installed/configured in this context easily
// or we want to keep dependencies minimal.
const loadEnv = (envPath) => {
    if (!fs.existsSync(envPath)) return {};
    const content = fs.readFileSync(envPath, 'utf-8');
    return content.split('\n').reduce((acc, line) => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            acc[match[1].trim()] = match[2].trim();
        }
        return acc;
    }, {});
};

const env = loadEnv(path.resolve(__dirname, '../.env'));
const templatePath = path.resolve(__dirname, '../public/firebase-messaging-sw-template.js');
const outputPath = path.resolve(__dirname, '../public/firebase-messaging-sw.js');

if (fs.existsSync(templatePath)) {
    let content = fs.readFileSync(templatePath, 'utf-8');

    // Replace all placeholders using a regex or simple replacement
    // We expect placeholders like {{VITE_FIREBASE_API_KEY}}
    Object.keys(env).forEach(key => {
        const placeholder = `{{${key}}}`;
        // Global replace
        content = content.split(placeholder).join(env[key]);
    });

    fs.writeFileSync(outputPath, content);
    console.log('Successfully generated public/firebase-messaging-sw.js');
} else {
    console.error('Template file not found: ' + templatePath);
    process.exit(1);
}
