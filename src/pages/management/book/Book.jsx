import { useState, useEffect } from 'react';
import getBooks from '../../../api/book';
import Book_Category_Selector from '../../../components/management/book_category/Book_Category_Selector';
import Book_Class_Number_Selector from '../../../components/management/book_class_number/Book_Class_Number_Selector';
import BooksTable from '../../../components/management/book/BooksTable';

function Book() {

    const ITEMS_PER_PAGES = 30;
    
    //books are showed on table
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const [searchParams, setSearchParams] = useState({})

    //fetch book every time current page changes (when click on the navigation)
    useEffect(() => {
        getBooks(searchParams, currentPage, ITEMS_PER_PAGES).then(data => {
            setBooks(data._embedded?.bookDtoList);
            setTotalPages(data.page.totalPages);
        });
    }, [currentPage])

    // HANDLE INPUT CHANGES
    const searchInputOnChange = (e, id) => {
        
        let updateSearchParams = ( id === "" || id) ?{...searchParams, [e.target.name]: id}: {...searchParams, [e.target.name]: e.target.value} ;
        setSearchParams(updateSearchParams);
    }

    // CALL API TO SEARCH BOOK BY PARAMS
    const searchBooks = async e => {
        e.preventDefault();
       
        setCurrentPage(0);
        await getBooks(searchParams,currentPage, ITEMS_PER_PAGES).then(data => {
            console.log(searchParams);
            setBooks(data._embedded ? data._embedded.bookDtoList : []);
            setTotalPages(data.page.totalPages);
        });
    }

    return (
        <div className="container pt-2  ">
           
            <div className="d-flex justify-content-between pt-3">
                <div className=" d-flex align-items-end">
                    <h4 className="text-[3rem] text-[#495057] font-semibold">Sách</h4>
                </div>

                <form className='row' style={{width:"55%"}}>
                    <div className="col-3 d-flex align-items-end text-[#FFFBF5]">
                        <button className="btn hover:bg-[#ADB5BD] duration-300 text-[#FFFBF5] bg-[#6C757D] px-3 text-center" onClick={e => searchBooks(e)}>Tìm kiếm</button>
                    </div>

                    <div className="col-9 p-0">
                        <div className="input-group">
                            <label className="form-label text-sm text-[#3F2305]" htmlFor="inputGroupFile01">
                                *Tìm kiếm theo từ khóa tiêu đề,tên khác, tác giả, nhà xuất bản
                            </label>
                            <div className="d-flex justify-content-between">
                                <input placeholder="VD: 120" onChange={e => searchInputOnChange(e)} type="text" name='keyword' className="w-[24rem] form-control" id="inputGroupFile01"/>

                                <div className="container">
                                    <select defaultValue={false} name='borrowed' className="form-select form-select-sm" onChange={e => searchInputOnChange(e)} aria-label="Small select example">
                                        <option value={false}>Chưa mượn</option>
                                        <option value={true}>Đã mượn</option>
                                    </select>
                                </div>
                                
                            </div>
                        </div>
                        <div className="d-flex mt-2 align-items-center h-[2rem]">
                            <div className="input-group h-[2rem]">
                                <Book_Class_Number_Selector handleClassNumberChange={searchInputOnChange}/>
                            </div>
                            <div className="input-group h-[2rem] ms-3">
                                <Book_Category_Selector handleCategoryChange={searchInputOnChange} />
                            </div>
                        </div>
                    </div>
                    
                </form>

            </div>
            
            <BooksTable totalPages={totalPages} books={books} setCurrentPage={setCurrentPage}/>
        </div>
    );
}

export default Book;