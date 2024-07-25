import  axiosClient  from "./axiosClient";

export default async function getCategories(params, pageNumber, pageSize){
    try {
        const category_params = {
            page: pageNumber,
            size: pageSize,
            ...params
        }
        const response = await axiosClient.get("/book-category", {
            params: category_params
        });
        return response.data;
        
    } catch (error) {
        console.log(error);
        return "get categories error " + error;
    }
}