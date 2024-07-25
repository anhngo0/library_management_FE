const paths = {

    // *** COMMON PAGE ***
    Home:'/',
    BookNominated:'/BookNominated',
    RegisterMember:'/RegisterMember',

    // *** LOGIN ***
       Login:"/login",
       Forgot_Password:"/forgot_password",
       Reset_Password: "/reset-password/confirm",

                        // *** MANAGEMENT PAGE ***
  
   // *** BORROW BOOKS PAGES ***
   Borrow_Home:"manage/borrow", 
   Borrow_Detail:"manage/borrow/:id",

   /* --- BOOK --- */
   Book_Main: "manage/book",
   Book_InDetails:"manage/book/:id",

   /* --- IMPORT TICKET --- */
    Import_Ticket:"manage/import_ticket",
    ImportTicket_InDetails:"manage/import_ticket/:id",

    /* --- ACCOUNT --- */
    Account: "manage/account"

}
export default paths