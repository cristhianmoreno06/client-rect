import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import swal from 'sweetalert';
import axios from 'axios';

export const CreateRol = () => {
    const auth = useAuth();

    const [rol, setrol] = useState([]);

    const handleChange = (e) => {
        setrol({
            ...rol,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (rol.name === '' || rol.status === '') {

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
                url: `http://localhost:4000/api/ciclo3/rol/create`,
                /* url: `${process.env.EndpointApi}/auth/google/login`, */
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                },
                data: rol
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
        setrol();
    }, []);

    
    return (
        <React.Fragment>
            <h2 className="mb-4">Creación de Roles</h2>
            <hr />
            <div className="card col-md-8 mx-auto">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="name">Nombre</label>
                                <input name="name" type="text" className="form-control" id="name" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="typeRol">Permisos</label>
                                <select name="typeRol" id="typeRol" className="form-control" onChange={handleChange}>
                                    <option value="0">Invitado</option>
                                    <option value="1">Edición</option>
                                    <option value="2">Visualización</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="status">Estado</label>
                                <select name="status" id="status" className="form-control" onChange={handleChange}>
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Guardar</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}
