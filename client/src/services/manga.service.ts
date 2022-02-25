import { Service } from './service';

export class MangaService extends Service {
    public async getAll(): Promise<any> {
        return await this.get('/comics');
    }
    
    public async getPopular(): Promise<any> {
        return await this.get('/comics/popular');
    }
}