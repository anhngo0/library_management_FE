import { FaBookOpen } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import paths from "../../../routes/path";
import { logoutApp } from "../../../api/axiosClient";

const Sidebar = ({selected}) => {
    const navigate = useNavigate();

    const logout = async () => {
        await logoutApp().then(response => {
            if(response.status === 200){
                localStorage.clear();
                navigate("/login");
            }
        })
    }

    return (
        <div className="bg-[#FFF] shadow border-e-2 text-[#343A40] h-100 ">
            <div className="py-3 h-dvh text-center">
                <div className="border-b-2">
                    <span className="text-[30px]">Thư Viện Sách</span>
                </div>

                <div className={`flex p-3 gap-2 items-center hover:bg-[#6C757D] duration-300 cursor-pointer my-2 ${selected === 3? ' bg-[#6C757D]' : ''}`} 
                onClick={()=>navigate("/"+paths.Account)}>
                    <span className={`text-[20px]  ${selected === 3? 'text-[#fff]' : ''}`}>Tài khoản</span>
                </div>
                <div className={`flex p-3 gap-2 items-center hover:bg-[#6C757D] duration-300 cursor-pointer my-2 ${selected === 1? ' bg-[#6C757D]' : ''}`}
                 onClick={()=>navigate("/" + paths.Book_Main)}>
                    <FaBookOpen className={`text-[20px] ${selected === 1? 'text-[#fff]' : ''}`} />
                    <span className={`text-[20px] ${selected === 1? 'text-[#fff]' : ''}`}>Sách</span>
                </div>
                <div className={`flex p-3 gap-2 items-center hover:bg-[#6C757D] duration-300 cursor-pointer my-2 ${selected === 2? ' bg-[#6C757D]' : ''}`} 
                onClick={()=>navigate("/"+paths.Import_Ticket)}>
                    <span className={`text-[20px] ${selected === 2? 'text-[#fff]' : ''}`}>Phiếu nhập</span>
                </div>

                <div  onClick={() => logout()} className="flex p-3 gap-2 items-center hover:bg-[#6C757D] duration-300 cursor-pointer text-[20px]">
                    <CgLogOut />
                    <span>Đăng xuất</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;