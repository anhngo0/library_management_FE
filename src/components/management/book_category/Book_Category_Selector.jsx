import { useState, useEffect } from "react";
import getCategories from "../../../api/category"
import ReactPaginate from "react-paginate";
import "./dropdown.css"

function Book_Category_Selector({handleCategoryChange, selected}) {
    const PAGE_SIZE = 8 ;
	const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    // navigate variables
    const [categoryPages, setCategoryPages] = useState();
    const [categoryCurrentPage, setCategoryCurrentPage] = useState(0);
    //search
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        selected && setSelectedCategory(selected);
		getCategories(keyword, categoryCurrentPage, PAGE_SIZE).then((data) => {
            const listCategories = data._embedded ? data._embedded.bookCategoryDtoList : [];
			setCategories(listCategories);
            setCategoryPages(data.page.totalPages);
		})
	}, [categoryCurrentPage])

    const handlePageClick = ({ selectedPage }) => {
        setCategoryCurrentPage(selectedPage);
      };

      const findCategoriesBaseOnKeyword = async (e) => {
        const search = {keyword: e.target.value.trim()};
        setCategoryCurrentPage(0);
        await getCategories(search, 0, PAGE_SIZE).then((data) => {
            const listCategories = data._embedded ? data._embedded.bookCategoryDtoList : [];
			setCategories(listCategories);
            setCategoryPages(data.page.totalPages);
		})
        setKeyword(search);
    }

    const resetCategories = e => {
        e.preventDefault();
        setSelectedCategory("")
        handleCategoryChange(e, "")
    }

    return (
        <div className="d-flex dropdown-input dropdown-form-group h-100">
            <input id="bookCategory"  
                name="category" readOnly={true} placeholder="VD: Xã hội" 
                value={selectedCategory} 
                className={`form-control `} />     
            
            <div className="dropdown">
                    <button className="btn btn-info dropdown-toggle h-100" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                    <ul className="dropdown-menu dropdown-menu-end drop_menu">
                        {/* FIND CATEGORIES BY KEY WORD */}
                        <li><input type="text" placeholder="Nhập từ khóa" onChange={(e) => findCategoriesBaseOnKeyword(e)} className="type-dropdown-input form-control" /></li>
                        <li><button name="categoryId"  className="dropdown_item " onClick={e => resetCategories(e)}>Làm mới</button></li>
                        {categories.length > 0 ? categories.map((value) => (
                        <li key={value.id}>
                            <button name="categoryId" onClick={(e) => {e.preventDefault();setSelectedCategory(value.name);handleCategoryChange(e,value.id);}} 
                            type="button" className="dropdown_item ">
                                {value.name} {value.note ? `(${value.note})`:""} 
                            </button>
                        </li>
                    )) : <li>
                                <button onClick={(e) => {e.preventDefault()}} type="button" className="dropdown_item ">Không tìm thấy kết quả phù hợp</button>
                            </li>}

                        {/* PAGINATOR */}
                       { categoryPages < 2 ? <div></div> : 
                       <div className="flex justify-center" onClick={e => e.stopPropagation()} style={{background:"#f0f0f0"}}>
                            <ReactPaginate
                            previousLabel={'Trước'}
                            nextLabel={'Sau'}
                            breakLabel={'...'}
                            pageCount={categoryPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            />
                        </div>}
                    </ul>
            </div>
        </div>
    );
}

export default Book_Category_Selector;