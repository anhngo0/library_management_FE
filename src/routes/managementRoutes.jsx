import Account from "../pages/management/account/Account";
import BookMain from "../pages/management/book/BookMain";
import ImportTicketMain from "../pages/management/importTicket/ImportTicketMain";
import paths from "./path";

const management_router = [
    /* --- MANAGEMENT --- */
    //Books
    {
        path:paths.Book_Main,
        component: BookMain
    },
    {
        path: paths.Book_InDetails,
        component:BookMain
    },

    //Import Ticket
    {
        path:paths.Import_Ticket,
        component: ImportTicketMain
    }, 
    {
        path: paths.ImportTicket_InDetails,
        component: ImportTicketMain
    },

    {
        path: paths.Account,
        component: Account
    }
]

export default  management_router;