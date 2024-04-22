import React, { useState, useEffect } from "react"
import { getBookCategories_byPage, getDataByLink } from "../utils/ApiFunctions"
import "../utils/css/dropdown.css"
import Paginator from "../common/Paginator";

const BookCategoryTypeSelector = ({ handleBookCategoryInputChange,isValid, newCategory }) => {
    const PAGE_SIZE = 8;
	const [categories, setCategories] = useState([]);
    const [links, setLinks] = useState();
    const [pageProps, setPageProps]=useState();

    const [category, setCategory] = useState({
        id:"",
        name:'',
        note:""
    })

    //handle add new category
	const [showNewCategoryTypeInput, setShowNewCategoryTypeInput] = useState(false)
	const [newCategoryType, setNewCategoryType] = useState("")

	useEffect(() => {
		getBookCategories_byPage("", 0, PAGE_SIZE).then((data) => {
            const listCategories = data.hasOwnProperty("_embedded") ? data._embedded.bookCategoryDtoList : [];
			setCategories(listCategories);
            setLinks(data._links);
            setPageProps(data.page);
		})
	}, [])

    const findCategoriesBaseOnKeyword = (e) => {
        const keyword = e.target.value;
        getBookCategories_byPage(keyword, 0, PAGE_SIZE).then((data) => {
            const listCategories = data.hasOwnProperty("_embedded") ? data._embedded.bookCategoryDtoList : [];
			setCategories(listCategories);
            setLinks(data._links);
            setPageProps(data.page);
		})
    }

    const changePage = (link)=>{
        getDataByLink(link).then((data) => {
            const listCategories = data.hasOwnProperty("_embedded") ? data._embedded.bookCategoryDtoList : [];
			setCategories(listCategories);
            setLinks(data._links);
            setPageProps(data.page);
		})
    }

	const handleNewCategoryTypeInputChange = (e) => {
		setNewCategoryType(e.target.value)
	}

	const handleAddNewCategoryType = () => {
		if (newCategoryType !== "") {
			setCategories([...categories, newCategoryType])
			setNewCategoryType("")
			setShowNewCategoryTypeInput(false)
		}
	}

	return (
	<>
        <div className="d-flex dropdown-input dropdown-form-group">
            <input id="bookCategory"  name="category" readOnly={true} placeholder="VD: Xã hội" 
            value={category.name} className={`form-control ${(isValid.firstChange | isValid.isExistValue) ?"":"invalid" }`}   />     
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                <ul className="dropdown-menu dropdown-menu-end drop_menu">
                    {/* FIND CATEGORIES BY KEY WORD */}
                    <li><input type="text" placeholder="Nhập từ khóa" onChange={(e) => findCategoriesBaseOnKeyword(e)} className="type-dropdown-input form-control" /></li>
                    {categories.length > 0 ? categories.map((value) => (
                    <li>
                        <button name="categoryId" onClick={(e) => {e.preventDefault();setCategory(value);handleBookCategoryInputChange(e,value.id);}} 
                        type="button" className="dropdown_item ">
                            {value.name} {value.note ? `(${value.note})`:""} 
                        </button>
                    </li>
                )) : <li>
                            <button onClick={(e) => {e.preventDefault()}} type="button" className="dropdown_item ">Không tìm thấy kết quả phù hợp</button>
                        </li>}
                    {/* PAGINATOR */}
                    { pageProps?.totalPages > 1 &&
                    <li onClick={e=> e.stopPropagation()}>
                        <div style={{position:"relative"}} className="d-flex justify-content-center pt-2 pb-2">
                        <Paginator pageNumber={pageProps.number} total={pageProps.totalPages} links={links} handlePageChange={changePage}/>
                        <span className="page-position">{pageProps.number + 1}/{pageProps.totalPages}</span>
                        </div>                       
                    </li>}
                </ul>
            </div>
        </div>
        <span className="form-message">Trường này không được bỏ trống</span>
    </>
	)
}

export default BookCategoryTypeSelector