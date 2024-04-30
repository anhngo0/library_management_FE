import { axiosClient } from "./axiosClient";

export async function getBookCategories_byPage(searchWord, pageNumber, pageSize){
    pageNumber = pageNumber === null ? 0 : pageNumber;
    try {
        const response = await axiosClient.get("/book-category", {
            params: {
                keyword: searchWord,
                page: pageNumber,
                size: pageSize 
            }
        });
        return response.data;
    } catch (error) {
        throw new Error("error fetching book categories")
    }
}
