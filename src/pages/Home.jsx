import Header from "../components/header";
import Navigation from "../components/navigation";
import Download from "../components/download";
import LogoPage from "../components/logoPage";
const Home = () => {
    return (
        <>
            <Header />
            <Navigation />
            <div className="w-[70%] m-auto ">
            <LogoPage contentLogoPage1={'THÔNG TIN CHUNG'} contentLogoPage2={'thông tin chung'}/>
                <div className="pt-[50px]">
                    <p>Trung tâm giao lưu Văn Hóa Nhật Bản tại Việt Nam dành trọn không gian tầng 1 làm thư viện với mong muốn đưa đến cho độc giả những ấn phẩm gồm sách, tạp chí cũng như các đĩa CD, DVD giới thiệu về văn hóa Nhật Bản bằng tiếng Nhật, tiếng Anh và tiếng Việt. Ngoài ra các bạn cũng có thể tham khảo và trau dồi thêm khả năng ngôn ngữ thông qua rất nhiều đầu sách và tài liệu liên quan đến việc dạy và học tiếng Nhật. Thư viện mở cửa tự do để phục vụ độc giả, trong trường hợp bạn muốn mượn sách, vui lòng đăng ký thẻ hội viên.</p>
                    <div className="flex items-center gap-2 pt-2">
                        <img src="../../public/images/img-home1.png" alt="" />
                        <img src="../../public/images/img-home2.png" alt="" />
                    </div>
                </div>
                <div className="pt-[50px]">
                    <span className="block"> Dịch vụ thư viện:</span>
                    <span className="block"> 1. Đọc sách, tạp chí, truyện tranh, v.v.</span>
                    <span className="block">
                        2. Xem DVD và CD
                    </span>
                    <span className="block">
                        3. Mượn sách và tạp chí
                    </span>
                </div>
                <div className="pt-[50px]">
                    <span className="block">   ■ Số điện thoại</span>
                    <span className="block">
                        024-3944-7419 (Số máy lẻ: 118)
                    </span>
                    <span className="block">
                        ■ Thời gian mở cửa
                    </span>
                    <span className="block">
                        Thứ Ba đến thứ Bảy: Sáng 9:30 -12:00 Chiều 13:00 – 18:00
                    </span>
                    <span className="block">
                        Ngày nghỉ: Chủ Nhật, thứ Hai và ngày lễ
                    </span>
                </div>
                <div className="border-b-2 border-slate-500 pb-[100px]">
                </div>
                <Download pageDown={' Danh mục Sách - Thư viện Japan Foundation'}/>
               
            </div>
        </>
    );
};

export default Home;