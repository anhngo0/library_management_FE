import  axiosClient from "./axiosClient";

export default async function getClassNumbers(params, pageNumber, pageSize){
    try {
        const classNumber_params = {
            page: pageNumber,
            size: pageSize,
            ...params
        }
        const response = await axiosClient.get("/class-number", {
            params: classNumber_params
        });
        return response.data;
        
    } catch (error) {
        console.log(error);
        return "get class number error " + error;
    }
}