import { axiosClient } from "./axiosClient";

export async function getImageById(id){
    try {
        const response = await axiosClient.get(`/file/image/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("error fetching image")
    }
}

export async function getDocumentById(id){
    try {
        const response = await axiosClient.get(`/file/document/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("error fetching document")
    }
}