export type Comic = {
    id: number;
    title: string;
    synopsis: string;
    status: 'publising' | 'finished';
    type: 'manga' | 'manhwa' | 'manhua';
    thumbnail: string;
    created_at: Date;
    updated_at: Date;
}