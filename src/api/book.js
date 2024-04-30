import { createFormData } from "../component/utils/utilFunctions";
import { axiosClient } from "./axiosClient";

 export async function create_new_book(data, file){
   const formRequest = createFormData("book", data, "file", file);
   try {
       const response = await axiosClient.post("/book",formRequest.form, formRequest.config);
       return response.data;
   } catch (error) {
    console.trace(error);
    throw new Error("error fetching book")
   }
}
export async function updateEquipment(bookId,form, image) {
  let formData = createFormData('book',form, 'image', [image]);
  const url = `book/${bookId}`;
  return axiosClient.put(url, formData.form, formData.config);
}