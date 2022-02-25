import React, { Component } from 'react';

export class SearchComponent extends Component {
    render() {
        return (
            <div className="search-container flex w-full">
                <div className="filters flex-none">
                    <div className="filter">
                        <h3>Filtrar por género</h3>
                        <ul className="checkboxes">
                            <li>
                                <input type="checkbox" id="genre-1" />
                                <label htmlFor="genre-1">Acción</label>
                            </li>
                            <li>
                                <input type="checkbox" id="genre-2" />
                                <label htmlFor="genre-2">Aventura</label>
                            </li>
                            <li>
                                <input type="checkbox" id="genre-3" />
                                <label htmlFor="genre-3">Ciencia ficción</label>
                            </li>
                            <li>
                                <input type="checkbox" id="genre-4" />
                                <label htmlFor="genre-4">Comedia</label>
                            </li>
                            <li>
                                <input type="checkbox" id="genre-5" />
                                <label htmlFor="genre-5">Drama</label>
                            </li>
                            <li>
                                <input type="checkbox" id="genre-6" />
                                <label htmlFor="genre-6">Fantasía</label>
                            </li>
                            <li>
                                <input type="checkbox" id="genre-7" />
                                <label htmlFor="genre-7">Histórico</label>
                            </li>
                            <li>
                                <input type="checkbox" id="genre-8" />
                                <label htmlFor="genre-8">Misterio</label>
                            </li>
                            <li>
                                <input type="checkbox" id="genre-9" />
                                <label htmlFor="genre-9">Policíaco</label>
                            </li>
                            <li>
                                <input type="checkbox" id="genre-10" />
                                <label htmlFor="genre-10">Romance</label>
                            </li>
                            <li>
                                <input type="checkbox" id="genre-11" />
                                <label htmlFor="genre-11">Terror</label>
                            </li>
                        </ul>
                    </div>
                    <div className="filter">
                        <h3>Filtrar por tipo</h3>
                        <div className="dropdown relative">
                            <button
                            className="
                                dropdown-toggle
                                inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out
                                flex
                                items-center
                                whitespace-nowrap
                            "
                            type="button"
                            id="dropdownMenuMediumButton"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            >
                            Manga
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="caret-down"
                                className="w-2 ml-2"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                            >
                                <path
                                fill="currentColor"
                                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                                ></path>
                            </svg>
                            </button>
                            <ul
                            className="
                                dropdown-menu
                                min-w-max
                                absolute
                                hidden
                                bg-white
                                text-base
                                z-50
                                float-left
                                py-2
                                list-none
                                text-left
                                rounded-lg
                                shadow-lg
                                mt-1
                                hidden
                                m-0
                                bg-clip-padding
                                border-none
                            "
                            aria-labelledby="dropdownMenuMediumButton"
                            >
                                <li>
                                    <a
                                    className="
                                        dropdown-item
                                        text-sm
                                        py-2
                                        px-4
                                        font-normal
                                        block
                                        w-full
                                        whitespace-nowrap
                                        bg-transparent
                                        text-gray-700
                                        hover:bg-gray-100
                                    "
                                    >Manwha</a
                                    >
                                </li>
                                <li>
                                    <a
                                    className="
                                        dropdown-item
                                        text-sm
                                        py-2
                                        px-4
                                        font-normal
                                        block
                                        w-full
                                        whitespace-nowrap
                                        bg-transparent
                                        text-gray-700
                                        hover:bg-gray-100
                                    "
                                    >Donghua</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="filter">
                        <h3>Número máximo de capitulos</h3>
                        <input
                            type="range"
                            className="
                            form-range
                            appearance-none
                            w-full
                            h-6
                            p-0
                            bg-gray-200
                            rounded-lg
                            focus:outline-none focus:ring-0 focus:shadow-none
                            "
                            min={1}
                            max={1000}
                        />
                    </div>
                </div>
                <div className="results flex-1">
                    <div className="searchbox mb-3 xl:w-128">
                        <div className="input-group relative flex flex-wrap items-stretch w-full mb-4">
                            <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                            <button className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg hover:text-white focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="results-list">
                        
                    </div>
                </div>
            </div>
        );
    }
}