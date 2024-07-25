import { useContext, useEffect } from "react";
import {NavbarContext} from "../../../components/management/hooks/TabContext";
import { useNavigate } from "react-router-dom";
import Book from "./Book";
import BookInDetails from "./BookInDetails";
import AddBook from "./AddBook";
import SideBar from "../../../components/management/layout/SideBar";

const BookMain =() =>  {
    const {handleNavbarTabUi , navbarTab} = useContext(NavbarContext)
    const navigate = useNavigate();
    
    useEffect(() => {handleNavbarTabUi(1)}, [])
    return (
        <div className="d-flex">
            <div className="w-[15%]">
                <SideBar selected={1}/>
            </div>
            <div className="w-[85%] p-4 h-[100%] bg-[#FFFBF5]">
                <div className="w-100 mt-2 h-[3rem] d-flex flex-center container rounded-[5px]">

                    <div className="container d-flex justify-content-start text-[#FFFBF5]">
                        <div className={`me-6 shadow hover:bg-[#495057] duration-300 cursor-pointer rounded-[5px] my-2 ${navbarTab === 1? ' bg-[#495057]' : 'bg-[#ADB5BD]'}`}
                        onClick={()=>{handleNavbarTabUi(1); navigate("/manage/book")}}>
                            <span className={`text-[1.2rem]  p-4 `}>Chung</span>
                        </div>

                        <div className={`shadow-sm hover:bg-[#495057] duration-300 cursor-pointer rounded-[5px] my-2 ${navbarTab === 2? ' bg-[#495057]' : 'bg-[#ADB5BD]'}`}
                        onClick={()=>{handleNavbarTabUi(2); navigate("/manage/book")}}>
                            <span className={`text-[1.2rem] p-4 `}>Thêm sách</span>
                        </div>


                    </div>
            
                </div>

                <div className="container w-100 ">
                    {navbarTab === 1 && (<Book/>)}
                    {navbarTab === 2 && (<AddBook/>)}
                    {navbarTab === 3 && (<BookInDetails/>)}
                </div>
            </div>
            
        </div>
    );
}

export default BookMain;