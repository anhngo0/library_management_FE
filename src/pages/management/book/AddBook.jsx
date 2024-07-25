import { useState } from "react";
import { createBook } from "../../../api/book";
import Book_Category_Selector from "../../../components/management/book_category/Book_Category_Selector";
import Book_Class_Number_Selector from "../../../components/management/book_class_number/Book_Class_Number_Selector";

function AddBook() {

    const [image, setImage] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [upsertBookForm ,setUpsertBookForm] = useState(
        {
            titleName: "",
            alterName: "",
            author: "",
            bookPosition: "",
            price: null,
            quantity: null,
            categoryId: null,
            classNumberId: null,
            isbnNumber:"",
            language:"",
            description:""
        }
    )

    const handleChangeInput = (e, id) => {
        let value = !id ? e.target.value: id;
        if(typeof value === "string") {value = value.trim()}
        console.log(value);
        const newUpsertBookForm = {
            ...upsertBookForm,
            [e.target.name]: value
        };
        setUpsertBookForm(newUpsertBookForm);
        setIsSuccess(false)
    }

    const createNewBook = e => {
        e.preventDefault();
        createBook(upsertBookForm, image).then(response => {
            if(response.status === 200){
                setIsSuccess(true)
            }
        })
    }

    return (
        <div>
            <form className="row">
            <div className="col-9">
                    <div className="container bg-[#E9ECEF] mt-3 py-3 px-4">
                        
                        <div className="row py-2">
                            <div className="col-3"><p className="fs-5 ">Tiêu đề:</p></div>
                            <div className="col-9">
                            <input type="text" name="titleName" className="fs-5 text-blue-400 w-100 " onChange={e => handleChangeInput(e)}/>
                            </div>
                        </div>
                        
                        <div className="row py-2">
                            <div className="col-3"><p className="fs-5 ">Tên khác:</p></div>
                            <div className="col-9">
                            <input type="text" name="alterName" className="fs-5 text-blue-400 w-100 " onChange={e => handleChangeInput(e)}/>
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-3"><p className="fs-5 ">Tác giả:</p></div>
                            <div className="col-9">
                            <input type="text" name="author" className="fs-5 text-blue-400 w-100" onChange={e => handleChangeInput(e)}/>
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-3"><p className="fs-5 ">Nhà xuất bản:</p></div>
                            <div className="col-9">
                                <input type="text" name="publisher" className="fs-5 text-blue-400 w-100 " onChange={e => handleChangeInput(e)}/>
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-3"><p className="fs-5 ">Thể loại:</p></div>
                            <Book_Category_Selector handleCategoryChange={handleChangeInput}/>
                        </div>

                        <div className="row py-2">
                            <div className="col-6"><p className="fs-5 ">Mã sách:</p></div>
                            <Book_Class_Number_Selector handleClassNumberChange={handleChangeInput}/>
                        </div>

                        <div className="row py-2">
                            <div className="col-3"><p className="fs-5 ">Vị trí: </p></div>
                            <div className="col-9">
                                <input type="text" name="bookPosition" className="fs-5 text-blue-400 w-100 " onChange={e => handleChangeInput(e)}/>
                            </div>
                        </div>
                        
                        <div className="row py-2">
                            <div className="col-6 row">
                                <div className="col-6"><p className="fs-5 ">Mã ISBN:</p></div>
                                <div className="col-6">
                                    <input type="text" name="isbnnumber" className="fs-5 text-blue-400 w-100" onChange={e => handleChangeInput(e)} />
                                </div>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6"><p className="fs-5 ">Ngôn ngữ: </p></div>
                                <div className="col-6">
                                    <input type="text" name="language" className="fs-5 text-blue-400 w-100"  onChange={e => handleChangeInput(e)}/>
                                </div>
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-6 row">
                                <div className="col-6"><p className="fs-5 ">Giá:</p></div>
                                <div className="col-6">
                                    <input type="text" name="price" className="fs-5 text-blue-400 w-100"  onChange={e => handleChangeInput(e)}/>
                                </div>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6"><p className="fs-5 ">Số lượng: </p></div>
                                <div className="col-6">
                                    <input type="text" name="quantity" className="fs-5 text-blue-400 w-100" onChange={e => handleChangeInput(e)}/>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3 form-group">
                            <label htmlFor="description" className="form-label fs-5">Mô tả</label>
                            <textarea onChange={(e)=>{handleChangeInput(e)}}
                                className={`form-control mb-5`} id="bookDescription"
                                rows="5" name="description" ></textarea>
                        </div>
                    </div>
                </div>    
                <div className="col-3">
                    <div className="container d-flex flex-column align-items-center pt-3">
                        {image ? <img className="w-[125px] " src={URL.createObjectURL(image)} alt="" /> : <img className="w-[125px] h-[165px] " src="../../public/images/images_not_ound.png" alt="" /> }
                        <input type="file"  className="form-control w-100 mt-3" onChange={e => {e.preventDefault();setImage(e.target.files[0])}}/>
                    </div>
                    <div className="container d-flex flex-column align-items-center pt-3">
                        <button onClick={e=> createNewBook(e)} className="btn btn-info">Thêm sách vào hệ thống</button>
                        {isSuccess ? <p className="text-success">Thêm mới thành công</p> : <p></p>}
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddBook;