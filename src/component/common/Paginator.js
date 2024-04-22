import React from 'react';
import "../utils/css/dropdown.css"
const Paginator = ({pageNumber, total, links, handlePageChange}) => {

    const setLinkPage = (page) => {
        return links[page].href;
    }
    const pageChange = (page) => {
        handlePageChange(setLinkPage(page));
    }
    return (
        <div>
            <nav>
            <ul className="pagination">
                {pageNumber > 1 && <li className="page-item">
                    <span className="page-link" onClick={(e) => {pageChange("first");e.stopPropagation()}}  aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </span>
                </li>}
               
                {pageNumber > 0 && <li className="page-item"><span onClick={(e) => {pageChange("prev");e.stopPropagation()}} className="page-link" >{pageNumber}</span></li>}
                <li className="page-item"><span onClick={(e) => {e.stopPropagation()}}className="page-link active" >{pageNumber+1}</span></li>
                {pageNumber+1<total&& <li className="page-item"><span onClick={(e) => {pageChange("next");e.stopPropagation()}} className="page-link" >{pageNumber+2}</span></li>}
               
               {pageNumber+2 <total&& <li className="page-item">
                <span className="page-link" onClick={(e) => {pageChange("last");e.stopPropagation()}} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </span>
                </li>}
            </ul>
            </nav>
        </div>
    );
};

export default Paginator;