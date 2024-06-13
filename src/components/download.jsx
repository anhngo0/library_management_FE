import { FaDownload } from "react-icons/fa";

const download = ({pageDown}) => {
    return (
        <>
          <div className="flex items-center pt-[20px]">
                    <FaDownload className="text-[#BCBDBE] text-[40px]" />
                    <h1 className="text-[25px] font-bold">Tải xuống</h1>
                </div>
                <div className="flex items-center pt-[20px] gap-2">
                    <div className="bg-[#6E599C] flex gap-1 rounded-2xl pr-[10px] pl-[10px] items-center">
                        <FaDownload className="text-[#fff]" />
                        <span  className="text-[#fff] text-[14px]">Tải xuống</span>
                    </div>
                    <div>
                    <span>
                    {pageDown}
                    </span></div>
                </div>   
        </>
    );
};

export default download;