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
import { deleteImportTicketById } from '../../../api/importTicket';

function ImportTicketsTable({totalPages, importTickets, setCurrentPage}) {

    const HEADERS = ["Người tạo", "Ngày tạo", "Người duyệt", "Ngày duyệt", "Nguồn", "Cách nhập", "Trạng thái"];

    // Navigate to clicked on importTicket in table
    const navigate = useNavigate();
    const { handleNavbarTabUi } = useContext(NavbarContext);
    const handleItemOnClick = (id) => {
        handleNavbarTabUi(3);
        navigate(`/manage/import_ticket/${id}`);
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
      };

    const handleDeleteOnCLick = (id) => {
        deleteImportTicketById(id).then(response => console.log(response))
    }

    return (
        <div className=" pt-4">
                <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
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
                            {importTickets.length <= 0 ?   <TableRow></TableRow> :
                            importTickets.map((importTicket) => (
                                <TableRow  sx={{ cursor: 'pointer' }} key={importTicket.id}>
                                    <TableCell>{importTicket.creator_name}</TableCell>
                                    <TableCell>{importTicket.created_date}</TableCell>
                                    <TableCell>{importTicket.approval_name || "Chưa duyệt"}</TableCell>
                                    <TableCell>{importTicket.appoval_date|| "Chưa duyệt"}</TableCell>
                                    <TableCell>{importTicket.supplier}</TableCell>
                                    <TableCell>{importTicket.import_way}</TableCell>
                                    <TableCell>{importTicket.status }</TableCell>
                                    <TableCell>
                                        <div className="d-flex">
                                            <Button size='small' variant="contained" color="primary" onClick={() => handleItemOnClick(importTicket.id)}>Xem</Button>
                                            <Button size='small' className="ms-2"variant="contained" color="error" onClick={() => handleDeleteOnCLick(importTicket.id)}>Xóa</Button>
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

export default ImportTicketsTable;