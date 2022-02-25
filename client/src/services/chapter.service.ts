import { Service } from './service';
import { Chapter } from '../models/chapter.model';

export class ChapterService extends Service {
    getAll(): Promise<Chapter[]> {
        return this.get('/chapters');
    }
    
    getOne(chapterId: number) {
        return this.get(`/chapters/${chapterId}`);
    }
}