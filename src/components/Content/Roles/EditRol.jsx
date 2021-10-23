import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useParams } from "react-router-dom";
import swal from 'sweetalert';
import axios from 'axios';

export const EditRol = () => {
    const auth = useAuth();

    const [rol, setrol] = useState([]);

    const { id } = useParams();

    const getRol = async () => {
        try {
            const { status, data } = await axios({
                method: 'GET',
                url: `http://localhost:4000/api/ciclo3/rol/list/${id}`,
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
        setrol({
            ...rol,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (rol.email === '' || rol.user === '' || rol.name === '') {

            return swal({
                title: 'Error',
                text: 'Los campos no pueden estar vacios',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }

        try {

            const { status, data } = await axios({
                method: 'PUT',
                url: `http://localhost:4000/api/ciclo3/rol/edit/${id}`,
                /* url: `${process.env.EndpointApi}/auth/google/login`, */
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                },
                data: rol
            });

            if (status === 201) {
                return swal({
                    title: "Actualización exitosa",
                    text: data.msg,
                    icon: "success",
                    dangerMode: true,
                    confirmButtonText: 'OK'
                })
            }

            if (status === 404) {
                return swal({
                    title: "Problema de actualización",
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
        getRol();
    }, []);

    return (
        <React.Fragment>
            <h2 className="mb-4">Actualización de Roles</h2>
            <hr />
            <div className="card col-md-8 mx-auto">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="name">name</label>
                                <input name="name" type="text" className="form-control" id="name" value={rol.name} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="typeRol">Permisos</label>
                                <select name="typeRol" id="typeRol" className="form-control"  value={(rol.typeRol == 1)?'Edición':(rol.typeRol == 2)?'Visualización':'Invitado'} onChange={handleChange}>
                                    <option value="0">Invitado</option>
                                    <option value="1">Edición</option>
                                    <option value="2">Visualización</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label htmlFor="status">estado</label>
                                <select name="status" id="status" className="form-control" value={rol.status} onChange={handleChange}>
                                    <option value="true">Activo</option>
                                    <option value="false">Inactivo</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Actualizar</button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )

}
