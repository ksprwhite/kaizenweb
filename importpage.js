const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kaizen',
});

const episodesFolder = path.join(__dirname, 'server/public/static/images/episodes');

const folders = fs.readdirSync(episodesFolder);

for (const folder of folders) {
    const folderPath = path.join(episodesFolder, folder);
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
        // get extension
        const filename = path.basename(file, path.extname(file));
        const extension = path.extname(file).replace('.', '');

        db.query('INSERT INTO chapter_pages (chapter_id, number, extension, created_at) VALUES (?, ?, ?, ?)', [parseInt(folder), parseInt(filename), extension, new Date()]);
    }
}