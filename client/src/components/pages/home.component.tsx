import React, { Component, useState } from 'react';
import { ChaptersListComponent } from '../chapters-list';
import { MangaService } from '../../services';

interface Manga {
    id: number;
    title: string;
    type: string;
    synopsis: string;
    status: 'PUBLISHING' | 'FINISHED';
    year: number;
    thumbnail: string;
}

export class HomeComponent extends Component<any, any> {
    private mangaService: MangaService = new MangaService();

    constructor(props: any) {
        super(props);

        this.state = {
            mangas: []
        };
    }

    componentDidMount() {
        this.mangaService.getAll()
            .then(mangas => {
                this.setState({ mangas });
            });
    }

    render() {
        return (
            <div className="home-container">
                <div className="column-a">
                    <ChaptersListComponent chapters={[]} />
                </div>
                <div className="column-b">
                    <div className="block featured-episodes">
                        <h2>Titulos destacados</h2>
                        <ul>
                            {this.state.mangas.map((manga: Manga) => (
                                <li className="featured-item" key={manga.id}>
                                    <div className="thumbnail">
                                        <img src={manga.thumbnail} alt={manga.title} />
                                    </div>
                                    <div className="content">
                                        <h3 className="title">{manga.title}</h3>
                                        <p className="synopsis">{manga.synopsis.substring(0, 150) + '...'}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeComponent