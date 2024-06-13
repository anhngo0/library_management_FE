import {Link} from 'react-router-dom'
const Header = () => {
    return (
        <>
           <div className="flex justify-between items-center w-[60%] m-auto p-1">
                 <div>
                     <Link to={'/'}> 
                       <img className="w-full" src="../../public/images/logo.png" alt="" />
                       </Link>
                 </div>
                 <div className="flex gap-2 items-center">
                   <span>Ngôn ngữ:</span>
                    <img className="w-[20px] h-[20px]" src="../../public/icon/vn.png" alt="" />
                    <img className="w-[20px] h-[20px]" src="../../public/icon/jp.png" alt="" />
                 </div>
           </div>

        </>
    );
};

export default Header;