import axios from 'axios';


export const loginGoogle = async ({ tokenId }) => {
    try {
        return await axios({
            method: 'POST',
            url: `${process.env.EndpointApi}/auth/google/login`,
            headers: {
                'Authorization': `Bearer ${tokenId}`
            }
        });
    } catch (error) {
        throw new Error(error);
    }
}