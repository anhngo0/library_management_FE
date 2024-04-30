export async function getDataByLink(link){
    try {
        const axios = require('axios');
        const response = await axios.get(link);
        return response.data;
    } catch (error) {
        throw new Error("error fetching")
    }
}