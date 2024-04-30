import React, { useState, useEffect } from "react";
import BookCategoryTypeSelector from "../../category/BookCategoryTypeSelector";
import "../../utils/css/validateForm.css"
import ClassNumberTypeSelector from "../../classNumber/ClassNumberTypeSelector";
import { create_new_book } from "../../../api/book";
import {convertBase64} from "../../utils/utilFunctions"

const AddBook = () => {
    const [newBook, setNewBook] = useState({
        vietnameseName: "",
        alterName:"",
        author:"",
        ISBNNumber:"",
        bookPosition:"", 
        price:"",
        quantity:"",
        year_of_publication:"",
        publisher:"",
        language:"",
        description:"",
        categoryId:"",
        status:null,
        classNumberId:""
    });
    const [isSubmitValid, setIsSubmitValid] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState('');
    const [image, setImage] = useState('');
    const [imageToBeUploaded, setImageToBeUploaded] = useState('');

    //two flag to control input value exist status in (isValidForm):
    // first (isExistValue) to verify whether input value exist or not => handle in onChange, onBlur and onSubmit
    //and second (firstChange) to control when the user open add_book modal, the error message is hidden  => handle in onBlur and onSubmit
    //if one of them is true then hide the error message ,or if both is false, then show the error message
    let [isValidForm, setIsValidForm] = useState({
        vietnameseName: {
            isExistValue:false,
            firstChange:true
        },
        alterName: {
            isExistValue:false,
            firstChange:true
        },
        author: {
            isExistValue:false,
            firstChange:true
        },
        // ISBNNumber: {
        //     isExistValue:false,
        //     firstChange:true
        // },
        bookPosition: {
            isExistValue:false,
            firstChange:true
        }, 
        price: {
            isExistValue:false,
            firstChange:true
        },
        quantity: {
            isExistValue:false,
            firstChange:true
        },
        year_of_publication: {
            isExistValue:false,
            firstChange:true
        },
        publisher: {
            isExistValue:false,
            firstChange:true
        },
        language: {
            isExistValue:false,
            firstChange:true
        },
        description: {
            isExistValue:false,
            firstChange:true
        },
        categoryId: {
            isExistValue:false,
            firstChange:true
        },
        classNumberId: {
            isExistValue:false,
            firstChange:true
        }
    })
    
    const setIsValidField = (name, isExistValue, isFirstChange)=>{
        setIsValidForm(isValidForm => ({
            ...isValidForm,
            [name]:{
                isExistValue:isExistValue,
                firstChange:isFirstChange
            }
    })); 
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        let isValidSubmit = true;
        let isNameExist = (isValidForm["vietnameseName"].isExistValue | isValidForm["alterName"].isExistValue ) ? true:false;
        
        for (let [key, value] of Object.entries(isValidForm)) {
            setIsValidField(key, value.isExistValue,false );
            //if vietnameseName or alterName exist (or both) then submit condition is not false  
            if((key === "vietnameseName"|key==="alterName") && isNameExist) {continue;}
            if(!value.isExistValue) {isValidSubmit = false;};
        }
        if(isValidSubmit === false) {setIsSubmitValid(false); return;}

       try {
        //SHOW SUCCESS MESSAGE AND NAVIGATE HERE
         const new_book = await create_new_book(newBook,imageToBeUploaded).then(data => console.log(data));
       } catch (error) {
        console.log(error);
       }
    }

    const handleChangeImg = async (e) => {
        let file = e.target.files[0];
        setImageToBeUploaded(file);
        if (file) {
          let img = URL.createObjectURL(file);
          let fileBase64 = await convertBase64(file);
          setSelectedImage(img);
          setImage(fileBase64);
          console.log(img);
        }
      };

    const handleOnBlur = (e) => {
        let value = e.target.value; 
        const name =  e.target.name;
        if(!value | (typeof value === String && value.trim() === "")){
            setIsValidField(name, false,false); 
        }

    }

    const handleChangeInput = (e,index) => {
        let value = e.target.value; 
        const name =  e.target.name;
        if(name==="categoryId" |name==="classNumberId") { 
            setIsValidField(name,true,false);
            setNewBook({
                ...newBook,
                [name]:index
            }) 
        
            return;
        }
       
        if((!value) | (typeof value === String && value.trim() === "")){setIsValidField(name, false,false); return;}
        //handle in case: text is blank 
        if(name === "quantity"| name ==="ISBNNumber"){
            value = !isNaN(value) ? parseInt(value) : ""; 
        }
        if(name === "price") {value = !isNaN(value) ? parseFloat(value): "" ; }
        setIsValidField(name,true,false);
        setNewBook({
            ...newBook,
            [name]:value
        }) 
        }
        //handle onclose modal
    const handleOnCloseModal = (e) => {

    }
    return (
        <div>
            <form style={{width:"90%",backgroundColor:"rgba(241, 242, 246,1.0)"}} className="container shadow needs-validation">
                <div className="row mt-3">
                    <div className="col-9">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <label  htmlFor="vietnameseName" className="form-label">Tên tiếng việt</label>
                                <div className="form-group">
                                    <input type="text" id="vietnameseName" onChange={(e)=>{handleChangeInput(e)}} onBlur={(e)=>handleOnBlur(e)} 
                                    className={`form-control ${(isValidForm["alterName"].firstChange | isValidForm["alterName"].isExistValue) 
                                    | (isValidForm["vietnameseName"].firstChange |isValidForm["vietnameseName"].isExistValue) ? "":"invalid"}`}  
                                    name="vietnameseName"/>
                                    <span className="form-message">Tên tiếng việt hoặc tên khác phải có giá trị</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <label htmlFor="book-alter-name" className="form-label">Tên khác</label>
                                <div className="form-group">
                                    <input type="text" id="book-alter-name" onChange={(e)=>{handleChangeInput(e)}} onBlur={(e)=>handleOnBlur(e)}
                                    className={`form-control ${(isValidForm["alterName"].firstChange | isValidForm["alterName"].isExistValue) 
                                    | (isValidForm["vietnameseName"].firstChange |isValidForm["vietnameseName"].isExistValue) ? "":"invalid"}`}  
                                    name="alterName"/> 
                                    <span className="form-message">Tên tiếng việt hoặc tên khác phải có giá trị</span>
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col-6">
                                <label htmlFor="bookCategory" className="form-label">Thể loại</label>
                                <div className="form-group">
                                    <BookCategoryTypeSelector handleBookCategoryInputChange={handleChangeInput} isValid={isValidForm["categoryId"]}/>
                                </div>
                            </div>

                            <div className="col-6">
                                    <label htmlFor="language" className="form-label">Ngôn ngữ</label>
                                    <div className="form-group">
                                        <input type="text" id="language" onChange={(e)=>{handleChangeInput(e)}} onBlur={(e)=>handleOnBlur(e)}
                                        className={`form-control ${(isValidForm["language"].firstChange |isValidForm["language"].isExistValue ) ? "":"invalid"}`}
                                        name="language"/>
                                        <span className="form-message">Truờng này không được bỏ trống</span>
                                    </div>
                                </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col-6">
                                <label htmlFor="book-class-number" className="form-label">Mã xếp giá</label>
                                <div className="form-group">
                                    <ClassNumberTypeSelector handleClassNumberInputChange={handleChangeInput} isValid={isValidForm["classNumberId"]}/>
                                </div>
                            </div>
                            <div className="col-6">
                                <label htmlFor="ISBNNumber" className="form-label">Mã ISBN</label>
                                <div className="form-group">
                                    <input type="text" id = "ISBNNumber" onChange={(e)=>{handleChangeInput(e)}} className="form-control " name="ISBNNumber" />
                                </div>
                            </div>
                            
                        </div>

                        <div className="row align-items-center">
                            <div className="col-6">
                                <label htmlFor="book-author" className="form-label">Tác giả</label>
                                <div className="form-group">
                                    <input type="text" id="book-author" onChange={(e)=>{handleChangeInput(e)}} onBlur={(e)=>handleOnBlur(e)}
                                    className={`form-control ${(isValidForm["author"].firstChange|isValidForm["author"].isExistValue) ? "":"invalid"}`} 
                                    name="author"/>
                                    <span className="form-message">Truờng này không được bỏ trống</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <label htmlFor="publisher" className="form-label">Nhà xuất bản</label>
                                <div className="form-group">
                                    <input type="text" id="publisher"onChange={(e)=>{handleChangeInput(e)}} onBlur={(e)=>handleOnBlur(e)}
                                    className={`form-control ${(isValidForm["publisher"].firstChange | isValidForm["publisher"].isExistValue ) ? "":"invalid"}`} 
                                    name="publisher" />
                                    <span className="form-message">Truờng này không được bỏ trống</span>
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col-6">
                                <label htmlFor="book-position" className="form-label">Mã vị trí</label>
                                <div className="form-group">
                                    <input type="text" id="book-position" onChange={(e)=>{handleChangeInput(e)}} onBlur={(e)=>handleOnBlur(e)}
                                    className={`form-control ${(isValidForm["bookPosition"].firstChange| isValidForm["bookPosition"].isExistValue) ? "":"invalid"}`} 
                                    name="bookPosition"/>
                                    <span className="form-message">Truờng này không được bỏ trống</span>
                                </div>
                            </div>
                            <div className="col-6">
                                <label htmlFor="book-price" className="form-label">Giá</label>
                                <div className="form-group">
                                    <input type="text" id="book-price" onChange={(e)=>{handleChangeInput(e)}} onBlur={(e)=>handleOnBlur(e)}
                                    className={`form-control ${(isValidForm["price"].firstChange| isValidForm["price"].isExistValue) ? "":"invalid"}`} name="price"/>
                                    <span className="form-message">Truờng này không được bỏ trống</span>
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-center">
                            <div className="col-6">
                                <label htmlFor="book-yop" className="form-label">Năm xuất bản</label>
                                <div className="form-group">
                                    <input type="text" id="book-yop"  onChange={(e)=>{handleChangeInput(e)}} onBlur={(e)=>handleOnBlur(e)}
                                    className={`form-control ${(isValidForm["year_of_publication"].firstChange|isValidForm["year_of_publication"].isExistValue) ? "":"invalid"}`} 
                                    name="year_of_publication"/>
                                    <span className="form-message">Truờng này không được bỏ trống</span>
                                </div>
                            </div>
                            <div className="col-6">
                                    <label htmlFor="book-quantity" className="form-label">Số lượng</label>
                                    <div className="form-group">
                                        <input type="text" id="book-quantity" onChange={(e)=>{handleChangeInput(e)}} onBlur={(e)=>handleOnBlur(e)}
                                        className={`form-control ${(isValidForm["quantity"].firstChange|isValidForm["quantity"].isExistValue) ? "":"invalid"}`}
                                        name="quantity" />
                                        <span className="form-message">Truờng này không được bỏ trống</span>
                                    </div>
                                </div>
                        </div>

                        <div className="row p-2 form-group">
                            <label htmlFor="bookDescription" className="form-label">Mô tả</label>
                            <textarea onChange={(e)=>{handleChangeInput(e)}} onBlur={(e)=>handleOnBlur(e)}
                            className={`form-control ${(isValidForm["description"].firstChange | isValidForm["description"].isExistValue) ? "":"invalid"}`}id="bookDescription"
                            rows="5" name="description"></textarea>
                            <span className="form-message">Truờng này không được bỏ trống</span>
                        </div>
                    </div>
                    <div className="col-3">
                         <div className='basis-1/3 mt-4 flex flex-col items-center'>
                            <div className='text-center mb-4'>Ảnh đại diện</div>
                            <div className='preview-content'>
                            <input
                                type='file'
                                className='form-control'
                                id='inputImage'
                                accept="image/*"
                                onChange={(e) => {handleChangeImg(e);console.log(image);}}
                            />
                            <label className='text-center w-100 mt-3 ' style={{minHeight:"6rem"}} htmlFor='inputImage'>
                                {image === '' ? <img alt='ava' className='w-52 h-52' /> : <div
                                className='w-80'
                                style={{ background: `center/cover no-repeat url(${selectedImage})`,minHeight:"8rem"  }}    
                                ></div>}
                            </label>
                            </div>
                        </div>
                    </div>    
                </div>
                <div className="row pb-4 align-items-center">
                        <div className="col-10">
                            <div className="row ">
                            <div className="col-10 ml-2">
                                <p>* Không được để trống cả tên Tiếng việt và Tên khác, phải điền một trong hai</p>
                                <p>* Trường có thể để trống là mã ISBN, các trường còn lại trừ 2 trường trên là bắt buộc phải điền</p>
                            </div>
                            </div>
                        </div>
                        <div className="col-2">
                            {/* SUBMIT */}
                            <button style={{marginLeft:"3rem"}} onClick={(e) => handleSubmit(e)}  className={`${isSubmitValid ? "": "submit-failed"} btn btn-info`}>Thêm mới</button>
                            <span className="form-message">Vui lòng nhập các truờng bắt buộc phía trên</span>
                        </div>
                    </div>
            </form>
        </div>
    );
};

export default AddBook;