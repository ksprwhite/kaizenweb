const db = require('./database.service');

async function getAll() {
    const [rows] = await db.execute(
        `SELECT chapters.id, chapters.title, chapters.number, chapters.pages, chapters.thumbnail, chapters.created_at, chapters.updated_at,
                comics.id AS comic_id, comics.title AS comic_title, comics.thumbnail AS comic_thumbnail, comics.type as comic_type,
                comics.status as comic_status, comics.created_at as comic_created_at, comics.updated_at as comic_updated_at,
                comics.synopsis as comic_synopsis
         FROM chapters LEFT JOIN comics ON chapters.comic_id = comics.id`
    );

    const chapters = rows.map(row => {
        return ({
            id: row.id,
            title: row.title,
            number: row.number,
            pages: row.pages,
            thumbnail: row.thumbnail,
            created_at: row.created_at,
            updated_at: row.updated_at,
            comic: {
                id: row.comic_id,
                title: row.comic_title,
                synopsis: row.comic_synopsis,
                thumbnail: row.comic_thumbnail,
                type: row.comic_type,
                status: row.comic_status,
                created_at: row.comic_created_at,
                updated_at: row.comic_updated_at
            }
        })
    });

    return chapters;
}

async function get(id) {
    let [rows] = await db.execute('SELECT * FROM chapters WHERE id = ?', [id]);
    const chapter = rows[0];

    [pages] = await db.execute('SELECT * from chapter_pages WHERE chapter_id = ?', [chapter.id]);


    return {
        ...chapter,
        pages
    };
}

module.exports = {
    getAll,
    get
}