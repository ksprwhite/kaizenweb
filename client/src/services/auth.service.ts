import { Service } from './service';
import { User, UserForm } from '../models/user.model';
import jwt_decode from 'jwt-decode';


export class AuthService extends Service {
    async refreshToken() {
        try {
            const response = await this.get('/auth/token');
            console.log('response', response);

            if (response.status === 'success') {
                localStorage.setItem('token', response.accessToken);
            }
        } catch (error) {
            console.log('==============>', error);
            console.log(error);
        }
    }

    login(username: string, password: string): Promise<any> {
        return this.post('/auth/login', { username, password })
            .then(res => {
                if (res.status === 'success') {
                    localStorage.setItem('token', res.accessToken);
                    return res;
                }

                return res;
            });
    }

    register(user: UserForm): Promise<any> {
        return this.post('/auth/register', user);
    }

    logout(): Promise<boolean> {
        return this.post('/auth/logout')
            .then(res => {
                if (res.status === 'success') {
                    return true;
                }

                return false;
            })
            .finally(() => {
                localStorage.removeItem('token');
            });
    }

    isLoggedIn(): boolean {
        if (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null) {
            try {
                const data: any = localStorage.getItem('token');
                jwt_decode(data);
                return true;
            } catch (e) {
                console.log(e);
                localStorage.removeItem('token');
                return false;
            }
        }

        return false;
    }

    getUser(): User | null {
        const data = localStorage.getItem('token');

        if (data !== undefined && data !== null) {
            let parsed;

            try {
                const decoded: any = jwt_decode(data);
                return decoded.user;
            } catch (e) {
                console.log(e);
                localStorage.removeItem('token');
                return null;
            }
        }

        return null;
    }
}