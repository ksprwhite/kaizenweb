import axios from 'axios';
import jwt_decode from 'jwt-decode';


interface FetchParams {
    [key: string]: any;
}

export abstract class Service {
    //private API_URL: string = `${window.location.protocol}//${window.location.host}/api`;
    private API_URL: string = `http://localhost:3000`;

    constructor() {
        if (window.location.host.includes('localhost')) {
            this.API_URL =  `http://localhost:3000`;
        } else {
            this.API_URL = `${window.location.protocol}//${window.location.host}`;
        }
    }

    request(path: string, data?: FetchParams, options?: RequestInit): Promise<any> {
        let url = [this.API_URL, path.startsWith('/') ? '' : '/', path].join('');
        let params = new URLSearchParams();

        if (options?.method === 'GET') {
            for (let key in data) {
                params.append(key, data[key]);
            }

            url += '?' + params.toString();
        } else {
            options = {
                ...options,
                body: JSON.stringify(data)
            };
        }

        const token = localStorage.getItem('token') || '';

        options = {
            ...options,
            credentials: 'include'
        }

        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`
        };

        return fetch(url, options)
            .then(response => {
                try {
                    // check if json
                    if (response.headers.get('content-type')?.includes('application/json')) {
                        return response.json();
                    } else {
                        return response;
                    }
                } catch (ex) {
                    return response;
                }
            });
    }

    public get(path: string, data?: FetchParams, options?: RequestInit): Promise<any> {
        return this.request(path, data, {
            ...options,
            'credentials': 'include',
            mode: 'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    public post(path: string, data?: FetchParams, options?: RequestInit): Promise<any> {
        return this.request(path, data, {
            ...options,
            'credentials': 'include',
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}