import React, { Component, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChapterService } from '../../services';

type Chapter = {
    id: number;
    title: string;
    number: number;
    thumbnail: string;
    pages: {
        id: number;
        number: number;
        extension: string;
    }[];
}

type State = {
    chapter: Chapter;
}

class PageComponent extends Component<any, State> {
    private chapterService: ChapterService = new ChapterService();

    constructor(props: any) {
        super(props);

        this.state = {
            chapter: ({} as Chapter)
        };

        this.chapterService.getOne(this.props.match.params.id).then(chapter => {
            this.setState({ chapter });
            console.log(chapter);
        });
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="chapter-container">
                <h1 className='title'>{this.state.chapter?.title}</h1>

                <ul className="pages">
                    {this.state.chapter?.pages?.map(page => (
                        <li key={page.id}>
                            <img src={`/static/images/chapters/${this.state.chapter?.id}/${page.number}.${page.extension}`} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export function withRouter(Children: any){
    return(props: any)=>{
       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
 }

 export const ChapterPageComponent = withRouter(PageComponent);