import paths from "./path";
import Home from "../pages/Home";
import BookNominated from "../pages/BookNominated";
import RegisterMember from "../pages/RegisterMember";



const allRouter = [
    // *** COMMON PAGE ***
    {
        path:paths.Home,
        component:Home
    },
    {
        path:paths.BookNominated,
        component:BookNominated
    },
    {
        path:paths.RegisterMember,
        component:RegisterMember
    },


    

    
]
export default allRouter;