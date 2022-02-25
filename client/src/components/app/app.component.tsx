import React, { Component, useEffect } from 'react'
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './app.css'
import {
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SearchComponent,
    DirectoryComponent,
    ChapterPageComponent,
} from '../pages'
import { AuthService } from '../../services/auth.service'
import { User } from '../../models/user.model'

export default function App() {
    const navigation = useNavigate();
    const authService = new AuthService();
    const loggedIn = authService.isLoggedIn();
    let user: User | null = authService.getUser();

    useEffect(() => {
        authService.refreshToken();
    });

    const logout = () => {
        console.log('test');
        authService.logout().then(() => {
            navigation('/');
        });
    }
    
    return (
        <div className="application">
            <header id="header">
                <nav id="navbar">
                    <NavLink to="/" className="brand">
                        <span className="title">Kaizen</span> 
                        <span className="slogan">Tu sitio de comics &amp; manga</span>
                    </NavLink>
                    <div className="navbar-section searchbox">
                        <div className="input">
                            <input type="text" name="q" placeholder="Buscar algo..." />
                            <a className="search-btn">
                                <i className="fa fa-search"></i>
                            </a>
                        </div>
                    </div>

                    <ul className="navbar-section menu nav">
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? 'selected' : ''}>
                                <FontAwesomeIcon icon="home" className='icon' />
                                <span>Inicio</span>
                            </NavLink>
                        </li>
                        {/*
                        <li>
                            <NavLink to="/search" className={({ isActive }) => isActive ? 'selected' : ''}>
                                <FontAwesomeIcon icon="search" className='icon' />
                                <span>Buscador</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/directory" className={({ isActive }) => isActive ? 'selected' : ''}>
                                <FontAwesomeIcon icon="book" className='icon' />
                                <span>Directorio</span>
                            </NavLink>
                        </li>
                        */}
                    </ul>

                    {!loggedIn && 
                        <ul className="auth menu right navbar-section">
                            <li>
                                <NavLink to="/login">
                                    Ingresar
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/register">
                                    Registrarse
                                </NavLink>
                            </li>
                        </ul>
                    }
                    {loggedIn && <ul className="auth menu right navbar-section">
                            <li>{user?.username}</li>
                            <li>
                                <button onClick={logout}>salir</button>
                            </li>
                        </ul>}
                </nav>
            </header>
            <main id="main">
                <Routes>
                    <Route path="/" element={<HomeComponent navigation={navigation} />} />
                    <Route path="/login" element={<LoginComponent navigation={navigation} />} />
                    <Route path="/register" element={<RegisterComponent navigation={navigation} />} />
                    <Route path="/search" element={<SearchComponent />} />
                    <Route path="/directory" element={<DirectoryComponent />} />
                    <Route path="/chapter/:id" element={<ChapterPageComponent />} />
                </Routes>
            </main>
            <footer id="footer">
                <div className="sections">
                    <div className="section">
                        <h3>Kaizen</h3>
                        <ul>
                            <li>
                                <a href="javascript:void(0)">Acerca de nosotros</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Contacto</a>
                            </li>
                        </ul>
                    </div>
                    <div className="section">
                        <h3>Encuentranos en</h3>
                        <ul>
                            <li>
                                <i className="fab fa-facebook-square fa-fw"></i>
                                <a href="javascript:void(0)">Facebook</a>
                            </li>
                            <li>
                                <i className="fab fa-instagram-square fa-fw"></i>
                                <a href="javascript:void(0)">Instagram</a>
                            </li>
                            <li>
                                <i className="fab fa-twitter-square fa-fw"></i>
                                <a href="javascript:void(0)">Twitter</a>
                            </li>
                            <li>
                                <i className="fab fa-youtube-square fa-fw"></i>
                                <a href="javascript:void(0)">Youtube</a>
                            </li>
                        </ul>
                    </div>
                    <div className="section">
                        <h3>Categorías</h3>
                        <div className="break"></div>
                        <ul>
                            <li>
                                <a href="javascript:void(0)">Acción</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Comedia</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Drama</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Romance</a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <a href="javascript:void(0)">Acción</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Comedia</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Drama</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Romance</a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <a href="javascript:void(0)">Acción</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Comedia</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Drama</a>
                            </li>
                            <li>
                                <a href="javascript:void(0)">Romance</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bottom">
                    <strong>Kaizen&copy; 2021</strong>
                </div>
            </footer>
        </div>
    )
}