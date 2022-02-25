import React, { Component } from 'react';
import { generatePath, NavLink } from 'react-router-dom';
import { Chapter } from '../../models/chapter.model';

interface ChapterProps {
    data: Chapter;
};

interface ChapterState {
    data: Chapter;
};

export class ChapterComponent extends Component<ChapterProps, ChapterState> {
    constructor(props: ChapterProps) {
        super(props);

        this.state = {
            data: props.data
        };
    }
    
    render() {
        return (
            <div className="col">
                <div className="episode">
                    <NavLink to={`/chapter/${this.state.data.id}`} className="thumbnail">
                        <div className="context overlay">
                            <i className="fas fa-eye play"></i>
                        </div>
                        <div className="img">
                            <img src={this.state.data.thumbnail} />
                        </div>
                    </NavLink>
                    <div className="content">
                        <a className="title">{this.state.data.comic.title}</a>
                        <span className="chapter">{this.state.data.title || `Episodio ${this.state.data.number}` }</span>
                    </div>
                    <div className="footer">
                        <span className="item">
                            <i className="fas fa-heart icon"></i>
                            <span>{ 0 }</span>
                        </span>
                        <span className="item">
                            <i className="fas fa-comments icon"></i>
                            <span>{ 0 }</span>
                        </span>
                        <span className="item right"></span>
                    </div>
                </div>
            </div>
        )
    }
}
