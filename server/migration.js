const fs = require('fs');
const db = require('./services/database.service');



fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);

    const chapters = [];

    let i = 0;

    for (const chapter of data.chapters) {
        chapters.push([
            ++i,
            chapter.comic_id,
            chapter.chapter.title,
            chapter.chapter.number,
            chapter.chapter.pages,
            chapter.thumbnail,
            new Date(),
            new Date()
        ]);
    }

    console.log(chapters);

    for (const chapter of chapters) {
        db.query(`INSERT IGNORE INTO chapters (id, comic_id, title, number, pages, thumbnail, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, chapter)
    }
});
