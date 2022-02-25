import { Comic } from "./comic.model";

export type Chapter = {
    id: number;
    title?: string;
    comic_id: number;
    comic: Comic;
    number: number;
    pages: number;
    thumbnail: string;
    created_at?: Date;
    update_at?: Date;
}