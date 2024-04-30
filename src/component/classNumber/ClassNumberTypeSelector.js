import React, { useState, useEffect } from "react"
import { getClassNumber_byPage } from "../../api/classNumber";
import { getDataByLink } from "../../api/pagination";
import "../utils/css/dropdown.css"
import "../utils/css/validateForm.css"
import Paginator from "../common/Paginator";

const ClassNumberTypeSelector = ({ handleClassNumberInputChange,isValid, newClassNumber }) => {
    const PAGE_SIZE = 8;
	const [classNumbers, setClassNumbers] = useState([]);
    const [links, setLinks] = useState();
    const [pageProps, setPageProps]=useState();

    const [classNumber, setClassNumber] = useState({
        id:"",
        name:''
    })

	const [showNewClassNumberTypeInput, setShowNewClassNumberTypeInput] = useState(false)
	const [newClassNumberType, setNewClassNumberType] = useState("")

	useEffect(() => {
		getClassNumber_byPage("", 0, PAGE_SIZE).then((data) => {
            const listClassNumbers = data.hasOwnProperty("_embedded") ? data._embedded.bookClassNumberDtoList : [];
			setClassNumbers(listClassNumbers);
            setLinks(data._links);
            setPageProps(data.page);
		})
	}, [])

    const findClassNumbersBaseOnKeyword = (e) => {
        const keyword = e.target.value;
        getClassNumber_byPage(keyword, 0, PAGE_SIZE).then((data) => {
            const listClassNumbers = data.hasOwnProperty("_embedded") ? data._embedded.bookClassNumberDtoList : [];
			setClassNumbers(listClassNumbers);
            setLinks(data._links);
            setPageProps(data.page);
		})
    }

    const changePage = (link)=>{
        getDataByLink(link).then((data) => {
            const listClassNumbers = data.hasOwnProperty("_embedded") ? data._embedded.bookClassNumberDtoList : [];
			setClassNumbers(listClassNumbers);
            setLinks(data._links);
            setPageProps(data.page);
		})
    }

    //HANDLE CREATE NEW CLASS NUMBER
	const handleNewClassNumberTypeInputChange = (e) => {
		setNewClassNumberType(e.target.value)
	}

	const handleAddNewClassNumberType = () => {
		if (newClassNumberType !== "") {
			setClassNumbers([...classNumbers, newClassNumberType])
			setNewClassNumberType("")
			setShowNewClassNumberTypeInput(false)
		}
	}

	return (
	<>
        <div className="d-flex dropdown-input dropdown-form-group">
            <input readOnly={true} placeholder="VD: 010" value={classNumber.name}
            className={`form-control ${(isValid.firstChange | isValid.isExistValue) ?"":"invalid" }`}  />
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"  aria-expanded="false"></button>
                <ul className="dropdown-menu dropdown-menu-end drop_menu">
                    {/* FIND CLASS NUMBER BY KEY WORD */}
                    <li>
                        <input type="text" placeholder="Nhập từ khóa" onChange={(e) => findClassNumbersBaseOnKeyword(e)} className="classNumber-input form-control" />
                    </li>
                    
                    { classNumbers.length > 0 ? 
                        classNumbers.map((value) => (<li>
                            <button name="classNumberId" onClick={(e) => {e.preventDefault();setClassNumber(value);handleClassNumberInputChange(e,value.id)}} type="button" className="dropdown_item ">{value.name}</button>
                        </li>)) : 
                        <li>   
                            <button onClick={(e) => {e.preventDefault()}} type="button" className="dropdown_item ">Không tìm thấy kết quả phù hợp</button>
                        </li>
                    }
                    {/* PAGINATOR */}
                    { pageProps?.totalPages > 1 &&
                    <li>
                        <div  style={{position:"relative"}} className="d-flex justify-content-center pt-2 pb-2">
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

export default ClassNumberTypeSelector