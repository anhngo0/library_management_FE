import { useState, useEffect } from "react";
import getClassNumbers from "../../../api/classNumber"
import ReactPaginate from "react-paginate";
import "../book_category/dropdown.css"

function Book_Class_Number_Selector({handleClassNumberChange}) {
    const PAGE_SIZE = 10;
	const [classNumbers, setClassNumbers] = useState([]);
    const [selectedClassNumber, setSelectedClassNumber] = useState("");
    // navigate variables
    const [classNumberPages, setClassNumberPages] = useState();
    const [classNumberCurrentPage, setClassNumberCurrentPage] = useState(0);
    //search
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
		getClassNumbers(keyword, classNumberCurrentPage, PAGE_SIZE).then((data) => {
            const listClassNumbers = data._embedded ? data._embedded.bookClassNumberDtoList : [];
			setClassNumbers(listClassNumbers);
            setClassNumberPages(data.page.totalPages);
		})
	}, [classNumberCurrentPage])

    const handlePageClick = ({ selected }) => {
        setClassNumberCurrentPage(selected);
      };

      const findClassNumbersBaseOnKeyword = async (e) => {
        const search = {keyword: e.target.value.trim()};
        setClassNumberCurrentPage(0);
        await getClassNumbers(search, 0, PAGE_SIZE).then((data) => {
            const listClassNumbers = data._embedded ? data._embedded.bookClassNumberDtoList : [];
			setClassNumbers(listClassNumbers);
            setClassNumberPages(data.page.totalPages);
		})
        setKeyword(search);
    }

    const resetClassNumbers = e => {
        e.preventDefault();
        setSelectedClassNumber("")
        handleClassNumberChange(e, "")
    }

    return (
        <div className="d-flex dropdown-input dropdown-form-group h-100">
            <input id="bookClassNumber"  
                name="classNumber" readOnly={true} placeholder="VD: 110" 
                value={selectedClassNumber} 
                className={`form-control `} />     
            
            <div className="dropdown">
                    <button className="btn btn-info dropdown-toggle h-100" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                    <ul className="dropdown-menu dropdown-menu-end drop_menu">
                        {/* FIND CLASS NUMBER BY KEY WORD */}

                        <li><input type="text" placeholder="Nhập từ khóa" onChange={(e) => findClassNumbersBaseOnKeyword(e)} className="type-dropdown-input form-control" /></li>

                        <li><button name="classNumberId"  className="dropdown_item " onClick={e => resetClassNumbers(e)}>Làm mới</button></li>
                        {classNumbers.length > 0 ? classNumbers.map((value) => (
                        <li key={value.id}>
                            <button name="classNumberId" onClick={(e) => {e.preventDefault();setSelectedClassNumber(value.name);handleClassNumberChange(e,value.id);}} 
                            type="button" className="dropdown_item ">
                                {value.name} {value.note ? `(${value.note})`:""} 
                            </button>
                        </li>
                    )) : <li>
                                <button onClick={(e) => {e.preventDefault()}} type="button" className="dropdown_item ">Không tìm thấy kết quả phù hợp</button>
                            </li>}

                        {/* PAGINATOR */}
                       { classNumberPages < 2 ? <div></div> : 
                       <div className="flex justify-center" onClick={e => e.stopPropagation()} style={{background:"#f0f0f0"}}>
                            <ReactPaginate
                            previousLabel={'Trước'}
                            nextLabel={'Sau'}
                            breakLabel={'...'}
                            pageCount={classNumberPages}
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

export default Book_Class_Number_Selector;