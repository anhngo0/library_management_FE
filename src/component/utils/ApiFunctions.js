import axios from "axios";

const ITEMS_PER_PAGE = 10;
const CATEGORIES_PER_PAGE = 10;
const api = axios.create({
    baseURL:"http://localhost:8080/api/v1"
});

// export async function addBook(newBook){
//     const formData = new FormData();
//     formData.append("book", newBook);
//     const response = await api.post("/book",formData );
//     return response.status === 201 ? true : false;
// }

export async function getBookCategories_byPage(searchWord, pageNumber, pageSize){
    pageNumber = pageNumber === null ? 0 : pageNumber;
    try {
        const response = await api.get("/book-category", {
            params: {
                keyword: searchWord,
                page: pageNumber,
                size: pageSize ? pageSize:CATEGORIES_PER_PAGE
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("error fetching book categories")
    }
}
export async function getDataByLink(link){
    try {
        const axios = require('axios');
        const response = await axios.get(link);
        return response.data;
    } catch (error) {
        throw new Error("error fetching")
    }
}
// export async function getBookCategories(searchWord){
//     try {
//         const response = await api.get("/book-category", {
//             params: {
//                 keyword: searchWord
//             }
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error("error fetching book categories")
//     }
// }

export async function getClassNumber_byPage(searchWord, pageNumber,pageSize){
    pageNumber = pageNumber === null ? 0 : pageNumber; 
    try {
        const response = await api.get("/class-number", {
            params: {
                keyword: searchWord,
                page: pageNumber,
                size:pageSize ? pageSize:ITEMS_PER_PAGE
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("error fetching book categories")
    }
}

export async function create_new_book(data){
    if(!data){return;} 
    try {
        let formData = new FormData();
        let blobBook = new Blob([JSON.stringify(data)], { type: 'application/json' })
        formData.append("book",blobBook);
        console.log([...formData.entries()]);
        const response = await api.post("/book",formData, {
            maxBodyLength: Infinity, headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        return response.data;
    } catch (error) {
        throw new Error("error fetching book")
    }
}