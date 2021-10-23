import axios from 'axios';


export const getUsres = async (token) => {    

    try {
        return await axios({
            method: 'GET',
            url: `${process.env.EndpointApi}/user/list`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}