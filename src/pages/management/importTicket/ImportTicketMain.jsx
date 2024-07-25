
import { useContext } from "react";
import {NavbarContext} from "../../../components/management/hooks/TabContext";
import { useNavigate } from "react-router-dom";

import ImportTicket from './ImportTicket';
import CreateImportTicket from './CreateImportTicket';
import ImportTicketInDetails from './ImportTicketInDetails';
import SideBar from "../../../components/management/layout/SideBar";
import paths from "../../../routes/path";

function ImportTicketMain() {
    const {handleNavbarTabUi , navbarTab} = useContext(NavbarContext)
    const navigate = useNavigate();
    return (
        <div className="d-flex">
             <div className="w-[15%] ">
                <SideBar selected={2}/>
            </div>
            <div className="w-[85%]  p-4 vh-min-[100%] bg-[#FFFBF5]">
                
                <div className="w-100 mt-2 h-[3rem] d-flex flex-center container rounded-[5px]">

                    <div className="container d-flex justify-content-start text-[#FFFBF5]">
                        <div className={`me-6 shadow hover:bg-[#495057] duration-300 cursor-pointer rounded-[5px] my-2 ${navbarTab === 1? ' bg-[#495057]' : 'bg-[#ADB5BD]'}`}
                        onClick={()=>{handleNavbarTabUi(1); navigate("/" + paths.Import_Ticket)}}>
                            <span className={`text-[1.2rem]  p-4 `}>Chung</span>
                        </div>

                        <div className={`shadow-sm hover:bg-[#495057] duration-300 cursor-pointer rounded-[5px] my-2 ${navbarTab === 2? ' bg-[#495057]' : 'bg-[#ADB5BD]'}`}
                        onClick={()=>{handleNavbarTabUi(2); navigate("/" + paths.Import_Ticket)}}>
                              <span className={`text-[1.2rem] p-3 ${navbarTab === 2? 'text-[#fff]' : ''}`}>Tạo phiếu Nhập mới</span>
                        </div>


                    </div>

                </div>
                <div className="container shadow w-100 mt-3 rounded-[5px] bg-light">
                    {navbarTab === 1 && (<ImportTicket/>)}
                    {navbarTab === 2 && (<CreateImportTicket/>)}
                    {navbarTab === 3 && (<ImportTicketInDetails/>)}
                </div>
            </div>
        </div>
    );
}

export default ImportTicketMain;