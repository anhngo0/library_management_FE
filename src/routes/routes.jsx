import paths from "./path";
import Home from "../pages/Home";
import BookNew from "../pages/BookNew";
import RegisterMember from "../pages/RegisterMember";

const allRouter = [
    {
        path:paths.Home,
        component:Home
    },
    {
        path:paths.BookNew,
        component:BookNew
    },
    {
        path:paths.RegisterMember,
        component:RegisterMember
    }
]
export default allRouter;