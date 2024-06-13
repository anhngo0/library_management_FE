
const logoPage = ({contentLogoPage1,contentLogoPage2}) => {
    return (
        <>
                 <div className="flex justify-center pt-5">
                    <div className="relative ">
                        <img src="../../public/images/flower.png" alt="" />
                        <div className="absolute top-[35%] left-[-10%]">
                            <h1 className="w-max font-bold text-[26px] tracking-widest">{contentLogoPage1}</h1>
                        </div>
                        <span className="text-center text-[#A4A4A4] pt-3 block"> {contentLogoPage2}</span>
                    </div>
                </div>
        </>
    );
};

export default logoPage;