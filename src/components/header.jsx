import {Link} from 'react-router-dom'
const Header = () => {
    return (
        <>
           <div className="flex justify-between items-center w-[60%] m-auto p-1 mb-1">
                 <div>
                     <Link className='text-[1.2rem] italic tracking-wide font-semibold' to={'/'}> 
                       Thư viện
                       </Link>
                 </div>
                 
           </div>

        </>
    );
};

export default Header;