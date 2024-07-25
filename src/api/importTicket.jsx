import  axiosClient from "./axiosClient";

export default async function getImportTickets(obj, pageNumber, pageSize){
    try {
        const importTicket_params = {
            page: pageNumber,
            size: pageSize,
            ...obj
        }
        
        const response = await axiosClient.get("/import-ticket", {
            params: importTicket_params
        });
        return response.data;
        
    } catch (error) {
        console.log(error);
        return "get importTicket error " + error;
    }
}


export const getImportTicketById = async (id) => {
    try {
        const response = await axiosClient.get(`/import-ticket/full-info/${id}`);
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log(error);
        return `get import ticket by id = ${id} error ` + error;
    }
}


export const createImportTicket = async (upsertForm, file) => {
    try {
        const formData = new FormData();
        formData.append('form', new Blob([JSON.stringify(upsertForm)], { type: 'application/json' }));
        if (file) {
            formData.append('file', file);
        }
        const response = await axiosClient.post(`/import-ticket`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
    } catch (error) {
        console.log(error);
        return "create error " + error;
    }
}


export const respondImportTicketById = async (id, upsertForm) => {

    try {
        const response = await axiosClient.put(`/import-ticket/respond/${id}`, upsertForm, {
            headers: {
                'Content-Type':'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return "respond error " + error;
    }
}

export const updateImportTicketById = async (id, upsertForm, file) => {

    try {
        const formData = new FormData();
        formData.append('form', new Blob([JSON.stringify(upsertForm)], { type: 'application/json' }));
        if (file) {
            formData.append('file', file);
        }
        const response = await axiosClient.put(`/import-ticket/update/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return "update error " + error;
    }
}

export const deleteImportTicketById = async (id) => {
    try {
        const response = await axiosClient.delete(`/import-ticket/${id}`);
        return response;
        
    } catch (error) {
        console.log(error);
        return "delete error " + error;
    }
}
