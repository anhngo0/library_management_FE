import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import ReactPaginate from 'react-paginate';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { NavbarContext } from '../hooks/TabContext';
import { deleteBookById} from '../../../api/book';

function BooksTable({totalPages, books, setCurrentPage}) {

    const HEADERS = ["Tiêu đề", "Tên khác", "Thể loại", "Vị trí", "Tác giả", "Nhà xuất bản", "Mượn"];

    // Navigate to clicked on book in table
    const navigate = useNavigate();
    const { handleNavbarTabUi } = useContext(NavbarContext);
    const handleItemOnClick = (id) => {
        handleNavbarTabUi(3);
        navigate(`/manage/book/${id}`);
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
      };

    const handleDeleteOnCLick = (id) => {
        deleteBookById(id).then(response => console.log(response))
    }

    return (
        <div className=" pt-4">
                <TableContainer component={Paper} sx={{ maxHeight: 380 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                {HEADERS.map((header, index) => (
                                    <TableCell key={index}>{header}</TableCell>
                                ))}
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.length <= 0 ?   <TableRow></TableRow> :
                            books.map((book) => (
                                <TableRow  sx={{ cursor: 'pointer' }} key={book.id}>
                                    <TableCell>{book.titleName}</TableCell>
                                    <TableCell>{book.alterName || "Không có"}</TableCell>
                                    <TableCell>{book.category?.name}</TableCell>
                                    <TableCell>{book.bookPosition}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.publisher || "Không rõ"}</TableCell>
                                    <TableCell>{book.borrowed ? "Đang mượn":"Chưa mượn"}</TableCell>
                                    <TableCell>
                                        <div className="d-flex">
                                            <Button size='small' variant="contained"  onClick={() => handleItemOnClick(book.id)}>Xem</Button>
                                            <Button size='small' className="ms-2"variant="contained" color="warning" onClick={() => handleDeleteOnCLick(book.id)}>Xóa</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* NAVIGATION */}
                {totalPages < 2 ? <div></div> :
                <div className="flex justify-center mt-1">
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
                </div>}
            </div>
    );
}

export default BooksTable;