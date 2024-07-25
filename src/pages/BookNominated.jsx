import ReactPaginate from 'react-paginate';
import Header from "../components/header";
import Navigation from "../components/navigation";
import LogoPage from "../components/logoPage";
import Book from "../components/Book";
import Footer from '../components/footer';
import { useEffect, useState } from 'react';
import { getAllNominatedBooks } from '../api/book';

const BookNominated = () => {
    const [currentPage,setCurrentPage] = useState(0);
    const BOOKS_PER_PAGE = 12;

    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getAllNominatedBooks({currentPage, BOOKS_PER_PAGE}).then(
            data => {
                setBooks(data._embedded?.bookDtoList);
                setTotalPages(data.page.totalPages);
            }
        );
    }, [currentPage]);


    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
      };


    return (
        <>
            <Header />
            <Navigation />
            <LogoPage contentLogoPage1={"SÁCH ĐỀ CỬ"} />
            <div className="w-[80%] m-auto grid grid-cols-4 gap-3">
            
                {books.map((book) => (
                    <div key={book.id}>
                        <Book image={book.base64Data} titleName={book.titleName}
                         alterName={book.alterName} author={book.author} category={book.category?.name} />
                    </div>
                ))}
         
            </div>
            <div className="flex justify-center mt-4">
                <ReactPaginate
                previousLabel={'Trước'}
                nextLabel={'Sau'}
                breakLabel={'...'}
                pageCount={totalPages}
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
            </div>
            <Footer/>
        </>
    );
};

export default BookNominated;