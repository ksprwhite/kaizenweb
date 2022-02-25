import React, { Component } from 'react'
import { AuthService } from '../../services/auth.service';


export class LoginComponent extends Component<any, any> {
    private authService = new AuthService();

    constructor(props: any) {
        super(props);
        
        
        this.state = {
            username: '',
            password: '',
            error: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event: any) {
        console.log(this.state);

        this.authService.login(this.state.username, this.state.password).then((response) => {
            console.log(response);

            if (response.status === 'success') {
                this.setState({ error: false });
                console.log(this.props);
                this.props.navigation('/');
            } else {
                this.setState({ error: response.message || 'Error al iniciar sesión' });
            }
        });

        event.preventDefault();
    }

    onChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-form">
                    <form className="form" method="post" onSubmit={this.onSubmit}>
                        <h3>Autentificación</h3>
                        {this.state.error !== false && 
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                <div className="font-bold">Error  </div>
                                <span className="block sm:inline">{this.state.error}.</span>
                            </div>
                        }
                        <div className="form-group">
                            <label>Usuario</label>
                            <input type="text" name="username" value={this.state.username} onChange={this.onChange} autoCapitalize='off' required />
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input type="password" name="password" value={this.state.password} onChange={this.onChange} required />
                        </div>
                        <div className="form-group troubleshoots">
                            <ul>
                                <li>
                                    <a>¿Olvidaste tu contraseña?</a>
                                </li>
                                <li>
                                    <a>¿Aún no tienes una cuenta?</a>
                                </li>
                            </ul>
                        </div>
                        <div className="form-group submit">
                            <input type="submit" value="Ingresar" className="btn blue" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}