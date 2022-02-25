import React, { Component } from 'react'
import { UserForm } from '../../models/user.model';
import { AuthService, UserService } from '../../services';

import { format } from 'date-fns';

type State = {
    form: UserForm
}

export class RegisterComponent extends Component<any, State> {
    private userService = new UserService();
    private authService = new AuthService();

    public constructor(props: any) {
        super(props);

        this.state = {
            form: {
                username: '',
                password: '',
                password2: '',
                email: '',
                birthDate: '',
            }
        };
    }

    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        const { form } = this.state;
        
        (form as any)[e.currentTarget.name] = e.currentTarget.value;

        this.setState({ form });
    };

    onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        const { form } = this.state;

        if (form.password !== form.password2) {
            return;
        }

        this.authService.register(form).then(() => {
            this.authService.login(form.username, form.password).then(() => {
                this.props.navigation('/');
            });
        }).catch((error) => {
            console.log(error);
        });

        e.preventDefault();
    }

    render() {
        return (
            <div className="auth-wrapper">
                <div className="auth-form">
                    <form className="form" method="post" action="" onSubmit={this.onSubmit}>
                        <h3>Registro de usuario</h3>
                        <div className="form-group">
                            <label>Usuario</label>
                            <input type="text" value={this.state.form.username} onChange={this.onChange} name="username" autoComplete="off" required />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" value={this.state.form.email} onChange={this.onChange} name="email" autoComplete="off" required />
                        </div>
                        <div className="form-group">
                            <label>Contraseña</label>
                            <input type="password" value={this.state.form.password} onChange={this.onChange} name="password" required />
                        </div>
                        <div className="form-group">
                            <label>Confirmar contraseña</label>
                            <input type="password" value={this.state.form.password2} onChange={this.onChange} name="password2" required />
                        </div>
                        <div className="form-group">
                            <label>Fecha de nacimiento</label>
                            <input type="date" onChange={this.onChange} name="birthday" required />
                        </div>
                        <div className="form-group">
                            <label>
                                <input type="checkbox" name="terms" required />
                                Aceptar terminos y condiciones
                            </label>
                        </div>
                        <div className="form-group submit">
                            <input type="submit" value="Registrarse" className="btn green" />
                        </div>
                    </form>
                    <div className="splash">
                        <h3>Unete ahora!</h3>
                        <p>
                            Adquiere características al registrar un usuario en nuestro sitio!
                        </p>
                        <ul>
                            <li>
                                <span className="fa-li"><i className="fas fa-star"></i></span> 
                                <span className="text">Tu colección de comics & manga</span>
                            </li>
                            <li>
                                <span className="fa-li"><i className="fas fa-comments"></i></span> 
                                <span className="text">Habilidad para comentar en el sitio</span>
                            </li>
                            <li>
                                <span className="fa-li"><i className="fas fa-eye"></i></span> 
                                <span className="text">Notificaciones sobre nuevos episodios</span>
                            </li>
                            <li>
                                <span className="fa-li"><i className="fas fa-list"></i></span> 
                                <span className="text">Y mucho más...</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}