import React, { Component, useState } from 'react';
import { Chapter } from '../../models/chapter.model';
import { ChapterComponent } from '../chapter';
import { ChapterService } from '../../services';

interface ChaptersListProps {
    chapters: Chapter[]
}

interface ChaptersListState {
    chapters: Chapter[]
}

export class ChaptersListComponent extends Component<ChaptersListProps, ChaptersListState> {
    private chapterService: ChapterService = new ChapterService();

    constructor(props: ChaptersListProps) {
        super(props);

        this.state = {
            chapters: []
        };
    }

    async componentDidMount() {
        const chapters = await this.chapterService.getAll();
        this.setState({ chapters });
    }

    render() {
        return (
            <div className="last-episodes">
                <h2 className="text-3xl font-bold py-4">Ultimos Capitulos</h2>
                <div className="grid">
                    {this.state.chapters.length == 0 
                        ? <div className="col">No se encontraron episodios</div> 
                        : this.state.chapters.map(chapter => <ChapterComponent data={chapter} />)}
                </div>
            </div>
        )
    }
}