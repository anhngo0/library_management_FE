import axiosClient from "./axiosClient";
import { unAuthAxiosClient } from "./axiosClient";

export default async function getBooks(obj, pageNumber, pageSize){
    try {
        const book_params = {
            page: pageNumber,
            size: pageSize,
            ...obj
        }
        console.log({
            params: book_params
        });
        const response = await unAuthAxiosClient.get("/book/read", {
            params: book_params
        });
        return response.data;
        
    } catch (error) {
        console.log(error);
        return "get book error " + error;
    }
}

export const getAllNewBooks = async ({pageNumber, pageSize}) => {
    try {
        const response = await axiosClient.get("/book/read/new-book", {
            params: {
                page: pageNumber,
                size: pageSize 
            }
        });
        return response.data;
        
    } catch (error) {
        console.log(error);
        return "get all book error " + error;
    }
}

export const getAllNominatedBooks = async ({pageNumber, pageSize}) => {
    try {
        const response = await unAuthAxiosClient.get("/book/read/nominated-book", {
            params: {
                page: pageNumber,
                size: pageSize 
            }
        });
        return response.data;
        
    } catch (error) {
        console.log(error);
        return "get all book nominated error " + error;
    }
}

export const getBookById = async (id) => {
    try {
        const response = await axiosClient.get(`/book/${id}`);
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        console.log(error);
        return "delete error " + error;
    }
}

export const getBookImageById = async (id) => {
    try {
        const response = await axiosClient.get(`/file/book-image/${id}`);
        return response.data;
        
    } catch (error) {
        console.log(error);
        return "get book error " + error;
    }
}
export const addBookToNewList = async (id) => {
    try {
        const response = await axiosClient.put(`/book/new/${id}`);
        return response;
        
    } catch (error) {
        console.log(error);
        return "add book error " + error;
    }
}

export const addBookToNominatedList = async (id) => {
    try {
        const response = await axiosClient.put(`/book/nominated/${id}`);
        return response;
        
    } catch (error) {
        console.log(error);
        return "add book error " + error;
    }
}

export const createBook = async (updatedBook, file) => {

    try {
        const formData = new FormData();
        formData.append('book', new Blob([JSON.stringify(updatedBook)], { type: 'application/json' }));
        if (file) {
            formData.append('file', file);
        }
        const response = await axiosClient.post(`/book`, formData, {
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

export const createBooksByExcel = async (excelfile) => {

    try {
        const formData = new FormData();
        formData.append('file', excelfile);
        
        const response = await axiosClient.post(`/book/excel/import`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return "create error " + error;
    }
}

export const updateBookById = async (id, updatedBook, file) => {

    try {
        const formData = new FormData();
        formData.append('book', new Blob([JSON.stringify(updatedBook)], { type: 'application/json' }));
        if (file) {
            formData.append('file', file);
        }
        const response = await axiosClient.put(`/book/${id}`, formData, {
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

export const deleteBookById = async (id) => {
    try {
        const response = await axiosClient.delete(`/book/${id}`);
        return response;
        
    } catch (error) {
        console.log(error);
        return "delete error " + error;
    }
}

