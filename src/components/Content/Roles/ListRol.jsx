import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import swal from 'sweetalert';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export const ListRol = () => {

    const auth = useAuth();

    const [roles, setroles] = useState([])

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
            setroles(data.data);

        } catch (error) {
            swal({
                title: 'Error',
                text: error.response.data.msg,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const handleDelete = async (event, id) => {
        event.preventDefault();

        try {

            const { status, data } = await axios({
                method: 'DELETE',
                url: `http://localhost:4000/api/ciclo3/rol/delete/${id}`,
                /* url: `${process.env.EndpointApi}/auth/google/login`, */
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });

            if (status === 201) {
                return swal({
                    title: "Eliminación exitosa",
                    text: data.msg,
                    icon: "success",
                    dangerMode: true,
                    confirmButtonText: 'OK'
                })
            }

            if (status === 404) {
                return swal({
                    title: "Problema de eliminación",
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
    }, []);


    return (
        <React.Fragment>
            <div className="form-row">
                <h2 className="mb-4 form-group col-md-6">Gestion de Roles</h2>
                <NavLink className="form-group col-md-6 float-right" exact to='/home/CreateRol'>
                    Crear
                </NavLink>
            </div>
            <div className="table">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Permisos</th>
                            <th scope="col">Status</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            roles.map((rol, index) => (
                                <tr key={rol._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{rol.name}</td>
                                    <td>{(rol.typeRol == 1)?'Edición':(rol.typeRol == 2)?'Visualización':'Invitado'}</td>
                                    <td>{(rol.status == true)?'Activo':'Inactivo'}</td>
                                    <td>
                                        <div className="btn-group btn-group-sm" role="group">
                                            <NavLink className="badge badge-info ml-4" exact to={`/home/EditRol/${rol._id}`}>
                                                Actualizar
                                            </NavLink>
                                            {/* <NavLink className="badge badge-danger ml-4" exact to='/home/User/' onClick={handleDelete(user._id)}>
                                                Eliminar
                                            </NavLink> */}
                                            <button type="button" className="badge badge-danger ml-4" onClick={(event) => handleDelete(event, rol._id)}>
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>

                </table>
            </div>
        </React.Fragment>
    )
}
