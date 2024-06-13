import ReactPaginate from 'react-paginate';
import Header from "../components/header";
import Navigation from "../components/navigation";
import LogoPage from "../components/logoPage";
import Book from "../components/Book";
import dataBook from "../../data/data";
import { useState } from 'react';
const BookNew = () => {
    const [currentPage,setCurrentPage] = useState(0);
    const booksPerPage = 8;
    const offset = currentPage * booksPerPage;
    const currentBooks = dataBook.slice(offset, offset + booksPerPage);
    const pageCount = Math.ceil(dataBook.length / booksPerPage);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
      };
    return (
        <>
            <Header />
            <Navigation />
            <LogoPage contentLogoPage1={"SÁCH MỚI"} contentLogoPage2={'sách mới'} />
            <div className="w-[60%] m-auto grid grid-cols-4 gap-3">
            
                {currentBooks.map((book) => (
                    <div key={book.id} >
                        <Book image={book.image} description={book.description} name={book.name} author={book.author} genres={book.genres} />
                    </div>
                ))}
         
            </div>
            <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={pageCount}
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
        </>
    );
};

export default BookNew;