import { Link } from "react-router-dom";
const navigation = () => {
    return (
        <div className="bg-[#6E599C] p-2">
             <ul className="flex gap-5 justify-center">
             <li className="text-[#fff] text-[14px]">
                    <Link to={'/'}>Thông Tin Chung</Link>
                </li>
                <li className="text-[#fff]  text-[14px]">
                    <Link to={'/BookNew'}>Sách Mới</Link>
                </li>
                <li className="text-[#fff] text-[14px]">
                    <Link to={'/RegisterMember'}>Đăng Ký Thành VIên</Link>
                </li>
             </ul>
        </div>
    );
};

export default navigation;