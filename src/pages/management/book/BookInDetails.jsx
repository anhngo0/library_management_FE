
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById, updateBookById, addBookToNewList, addBookToNominatedList, removeBookFromList } from "../../../api/book";
import Book_Class_Number_Selector from "../../../components/management/book_class_number/Book_Class_Number_Selector";
import Book_Category_Selector from "../../../components/management/book_category/Book_Category_Selector";
function BookInDetails() {

    const { id } = useParams();
    const [bookInfo, setBookInfo] = useState({})
    const [image, setImage] = useState();
    const [updateMode, setUpdateMode] = useState(false);
    const [updatedBook, setUpdatedBook] = useState({});

    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        getBookById(id).then(response => {
            setBookInfo(response);
            setImage(response.base64Data ? `data:image/jpeg;base64,${response.base64Data}` :"../../../../public/images/images_not_ound.png")
    
            setUpdatedBook(response);
        })
       
    }, []);

    const changeUpdateMode = e => {
        e.preventDefault();
        setUpdateMode(true);
    }

    const confirmChangeBook = e=> {
        e.preventDefault();
        setUpdateMode(false);
        //call api update here
        updateBookById(id, updatedBook, image);
    }

    const handleChangeInput = (e, id) => {
        const value = !id ? e.target.value : id; 
        e.preventDefault();
        const newBook = {
            ...updatedBook,
            [e.target.name]: value
        }
        setUpdatedBook(newBook);
    }

    const addToNewList = e => {
        e.preventDefault();
        setSuccessMessage("")
        addBookToNewList(id).then(response => {
            
            if (response.status === 200) {
                setSuccessMessage("Thêm vào danh sách sách mới thành công")
            }
        }) 
    }
    
    const addToNominatedList = e => {
        setSuccessMessage("")
        e.preventDefault();
        addBookToNominatedList(id).then(response => {
            if (response.status === 200) {
                setSuccessMessage("Thêm vào danh sách sách đề cử thành công")
            }
        }) 
    }

    const removeFromList = e => {
        e.preventDefault();
        setSuccessMessage("")
        removeBookFromList([Number(id)]).then(response => {
            if (response.status === 200) {
                setSuccessMessage("Bỏ sách khỏi danh sách đề cử (hoặc mới) thành công")
            }
        })
    }
    return (
        <div className=" pt-3">
            <div className="row">
                <div className="col-9">
                    <div className="container">
                        <h1 className="fs-1 text-blue-600 text-semibold mt-1">{bookInfo.titleName}  
                            <span className="fs-5 text-blue-400 ms-4 mt-1">* {bookInfo.borrowed? "Đang mượn" : "Chưa mượn"}</span>
                        </h1>
                      
                        <div className="row py-2">
                            <div className="col-3"><p className="fs-5 ">Tên khác:</p></div>
                            <div className="col-9">
                            <input type="text" name="alterName" className="fs-5 text-blue-400 w-100 " onChange={e => handleChangeInput(e)}
                                disabled={updateMode ? false: true} value={updateMode ? updatedBook.alterName :bookInfo.alterName}/>
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-3"><p className="fs-5 ">Tác giả:</p></div>
                            <div className="col-9">
                            <input type="text" name="author" className="fs-5 text-blue-400 w-100" onChange={e => handleChangeInput(e)}
                                disabled={updateMode ? false: true} value={updateMode ? updatedBook.author :bookInfo.author}/>
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-3"><p className="fs-5 ">Nhà xuất bản:</p></div>
                            <div className="col-9">
                                <input type="text" name="publisher" className="fs-5 text-blue-400 w-100 " onChange={e => handleChangeInput(e)}
                                disabled={updateMode ? false: true} value={updateMode ? updatedBook.publisher :bookInfo.publisher}/>
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-3"><p className="fs-5 ">Thể loại:</p></div>
                            <div className="col-9">
                                
                                { !updateMode ? 
                                   <p className="fs-5 text-blue-400">{bookInfo.category?.name}</p>
                                    : <Book_Category_Selector handleCategoryChange={handleChangeInput} selected={bookInfo.category?.name}/>}
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-6 row">
                                <div className="col-6"><p className="fs-5 ">Mã sách:</p></div>
                                <div className="col-6">
                               { !updateMode ? 
                                    <p className="fs-5 text-blue-400">{bookInfo.classNumber?.name}</p>
                                    : <Book_Class_Number_Selector handleClassNumberChange={handleChangeInput} selected={bookInfo.classNumber?.name}/>}
                                </div>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6"><p className="fs-5 ">Vị trí: </p></div>
                                <div className="col-6">
                                    <input type="text" name="bookPosition" className="fs-5 text-blue-400 w-100 " onChange={e => handleChangeInput(e)}
                                    disabled={updateMode ? false: true} value={updateMode ? updatedBook.bookPosition : bookInfo.bookPosition}/>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row py-2">
                            <div className="col-6 row">
                                <div className="col-5"><p className="fs-5 ">Mã ISBN:</p></div>
                                <div className="col-7">
                                    <input type="text" name="isbnnumber" className="fs-5 text-blue-400 w-100" onChange={e => handleChangeInput(e)} 
                                    disabled={updateMode ? false: true} value={bookInfo.isbnnumber}/>
                                </div>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6"><p className="fs-5 ">Ngôn ngữ: </p></div>
                                <div className="col-6">
                                    <input type="text" name="language" className="fs-5 text-blue-400 w-100"  onChange={e => handleChangeInput(e)}
                                    disabled={updateMode ? false: true} value={bookInfo.language}/>
                                </div>
                            </div>
                        </div>

                        <div className="row py-2">
                            <div className="col-6 row">
                                <div className="col-6"><p className="fs-5 ">Giá:</p></div>
                                <div className="col-6">
                                    <input type="text" name="price" className="fs-5 text-blue-400 w-100"  onChange={e => handleChangeInput(e)}
                                    disabled={updateMode ? false: true} value={updateMode ? updatedBook.price:bookInfo.price}/>
                                </div>
                            </div>
                            <div className="col-6 row">
                                <div className="col-6"><p className="fs-5 ">Số lượng: </p></div>
                                <div className="col-6">
                                    <input type="text" name="quantity" className="fs-5 text-blue-400 w-100" onChange={e => handleChangeInput(e)}
                                    disabled={updateMode ? false: true} value={updateMode ? updatedBook.quantity:bookInfo.quantity}/>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3 form-group">
                            <label htmlFor="description" className="form-label fs-5">Mô tả</label>
                            <textarea onChange={(e)=>{handleChangeInput(e)}}
                                className={`form-control mb-5`} id="bookDescription" disabled={updateMode ? false: true}
                                rows="5" name="description" value={updateMode ? updatedBook.description:bookInfo.description} ></textarea>
                        </div>
                    </div>
                </div>    
                <div className="col-3">
                    <div className="container d-flex">
                        {updateMode ? <button className="btn btn-primary"onClick={() => setUpdateMode(false)}>Hủy</button>:<button className="btn btn-primary"onClick={(e) => changeUpdateMode(e)}>Sửa</button>}
                        {updateMode ? <button className="ms-2 btn btn-info"onClick={(e) => confirmChangeBook(e)}>Xác nhận</button>:<div></div>}
                    </div>

                    <div className="container d-flex flex-column align-items-center pt-3">
                        {image ? <img className="w-[125px] " src={typeof image === 'object' ? URL.createObjectURL(image) : image} alt="" /> 
                        : <img className="w-[125px] h-[165px] " src="../../public/images/images_not_ound.png" alt="" /> }
                        
                        <input disabled={updateMode ? false: true} type="file" name="quantity" className="form-control w-100 mt-3" 
                        onChange={e => {e.preventDefault(); setImage(e.target.files[0])}}/>
                    </div>

                    <div className="container d-flex flex-column align-items-center pt-3">
                        <button onClick={e=> addToNewList(e)} className="btn btn-info">Thêm vào danh sách sách mới</button>
                        <button onClick={e => addToNominatedList(e)}className="btn btn-info mt-3">Thêm vào danh sách đề cử</button>
                        <button onClick={e => removeFromList(e)}className="btn bg-gray-300 hover:bg-gray-400 duration-300 mt-3">Xóa khỏi danh sách đề cử /mới</button>
                        {successMessage ? <p className="text-success">{successMessage}</p> : <p></p>}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default BookInDetails;