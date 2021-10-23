import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import swal from 'sweetalert';
import axios from 'axios';

export const CreateUser = () => {
    const auth = useAuth();

    const [user, setuser] = useState([]);
    const [roles, setrol] = useState([]);

    const getRoles = async () => {
        try {
            const { status, data } = await axios({
                method: 'GET',
                url: 'http://localhost:4000/api/ciclo3/rol/list/',
                /* url: `${process.env.EndpointApi}/auth/google/login`, */
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            setrol(data.data);

        } catch (error) {
            swal({
                title: 'Error',
                text: error.response.data.msg,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const handleChange = (e) => {
        setuser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let phone = parseInt(user.phone, 10);

        if (user.email === '' || user.user === '' || user.name === '' || phone <= 0 || user.rol === '' || user.status === '') {

            return swal({
                title: 'Error',
                text: 'Los campos no pueden estar vacios',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }

        try {

            const { status, data } = await axios({
                method: 'POST',
                url: `http://localhost:4000/api/ciclo3/user/create`,
                /* url: `${process.env.EndpointApi}/auth/google/login`, */
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                },
                data: user
            });

            if (status === 201) {
                return swal({
                    title: "Creacion exitosa",
                    text: data.msg,
                    icon: "success",
                    dangerMode: true,
                    confirmButtonText: 'OK'
                })
            }

            if (status === 404) {
                return swal({
                    title: "Problema de cracion",
                    text: data.msg,
                    icon: "error",
                    dangerMode: true,
                    confirmButtonText: 'OK'
                })
            }

        } catch (error) {
            return swal({
                title: 'Error',
                text: error.response.data.msg,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    useEffect(() => {
        getRoles();
        setuser();
    }, []);

    
    return (
        <React.Fragment>
            <h2 className="mb-4">Creación de Usuarios</h2>
            <hr />
            <div className="card col-md-8 mx-auto">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="email">email</label>
                                <input name="email" type="email" className="form-control" id="email" onChange={handleChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="user">user</label>
                                <input name="user" type="text" className="form-control" id="user" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="name">name</label>
                                <input name="name" type="text" className="form-control" id="name" onChange={handleChange} />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="phone">phone</label>
                                <input name="phone" type="number" className="form-control" id="phone" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label htmlFor="rol">rol</label>
                                <select name="rol" id="rol" className="form-control" onChange={handleChange}>
                                    {roles.map((rol) => (
                                        <option key={rol._id} value={rol._id}> {rol.name} </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="status">estado</label>
                                <select name="status" id="status" className="form-control" onChange={handleChange}>
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="password">Password</label>
                                <input name="password" type="password" className="form-control" id="password" onChange={handleChange} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Guardar</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}
