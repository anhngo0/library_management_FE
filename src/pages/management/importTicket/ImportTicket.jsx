import { useState, useEffect } from "react";
import getImportTickets from "../../../api/importTicket"
import ImportTicketsTable from "../../../components/management/import_ticket/ImportTicketsTable"

function ImportTicket() {

    const ITEMS_PER_PAGES = 20;

    const [importTickets, setImportTickets] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [searchParams, setSearchParams] = useState({});

    //fetch book every time current page changes (when click on the navigation)
    useEffect(() => {
        getImportTickets(searchParams, currentPage, ITEMS_PER_PAGES).then(data => {
            setImportTickets( data._embedded.importTicketDtoList );
            setTotalPages(data.page.totalPages);
            console.log(data);
        });

    }, [currentPage])

     // HANDLE INPUT CHANGES
     const searchInputOnChange = (e, id) => {
        
        let updateSearchParams = ( id === "" || id) ?{...searchParams, [e.target.name]: id}: {...searchParams, [e.target.name]: e.target.value} ;
        setSearchParams(updateSearchParams);
    }

     // CALL API TO SEARCH BOOK BY PARAMS
     const searchImportTickets = async e => {
        e.preventDefault();
       
        setCurrentPage(0);
        await getImportTickets(searchParams,currentPage, ITEMS_PER_PAGES).then(data => {
            setImportTickets( data._embedded.importTicketDtoList);
            setTotalPages(data.page.totalPages);
        });
    }

    return (
        <div className="container pt-2">
           
        <div className="d-flex justify-content-between pt-3">
           
            <form className='' style={{width:"55%"}}>
                <div className="input-group">
                    <label className="form-label text-muted text-sm" htmlFor="inputGroupFile01">
                        *Tìm kiếm theo tên nhà cung cấp , tên người tạo và tên người phê duyệt
                    </label>
                    <div className="d-flex justify-content-between">
                        <input placeholder="VD: 120" onChange={e => searchInputOnChange(e)} type="text" name='keyword' className="w-[24rem] form-control" id="inputGroupFile01"/>
                    </div>
                </div>
                <button className="btn btn-info mt-2 h-[2rem] d-flex align-items-center" onClick={e => searchImportTickets(e)}>Tìm kiếm</button>
            
            </form>

            <div className=" d-flex align-items-end">
                <h4 className="fs-1 text-primary font-semibold">Phiếu nhập</h4>
            </div>

        </div>
        <ImportTicketsTable totalPages={totalPages} importTickets={importTickets} setCurrentPage={setCurrentPage} />
        
    </div>
    );
}

export default ImportTicket;