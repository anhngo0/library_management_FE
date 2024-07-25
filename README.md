# Mini-project: library management (Frontend).
## This frontend part is still developing and lack a lot of functions 
( This is the frontend part written in Spring boot. You can find the backend part here: <a>https://github.com/anhngo0/library_management.git</a> )

I build the common pages (those no need to login) based on japan foundation library website. There you can find many manga, magazines and Japanese books in a quiet and modernly decorated space. If you are a fan of japanese books and culture, this library is definitely a great choice to visit and enjoy.

## Install & Run on Localhost
-  Clone this project.  
-  Open this project folder on your terminal.
-  After running successfully, you can use account with username: NhatAn and password: NhatAn to login in manager role. / or username: MaiAnh and password: Graeme139 to login in librarian role

### Using npm command
        - Prerequisite: Having nodejs installed on your computer
        - Steps: + Run command 'npm clean install'
                 + Then run 'npm run dev'

## Web Features
This frontend part has following pages (at this time):
### Common Pages (No need to login):
        - common home page : users can see common library information.
        - nominated books page: users can see nominated books.
        - How to be a member of library: users can see how to sign in borrowing books service information.
### Login pages:
        - login page: (librarian and manager) login to access management pages using username and password.
        - forgot password page: In case forgetting password, they can type their account's email to send link reset. Click to the link to redirect to reset password page.
        - reset password page: type new password and confirm it by type again in confirm field. The form is invalid after 15 minutes.
### Management pages
       - account page: where (librarian and manager) can see himself/herself profile. 
       - book's management page: where (librarian and manager) can view / add/ update / delete books and add book to nominated list or new list.
