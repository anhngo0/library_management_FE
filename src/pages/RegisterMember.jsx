import Header from "../components/header";
import Navigation from "../components/navigation";
import LogoPage from "../components/logoPage";
import Download from "../components/download";
const RegisterMember = () => {
    return (
        <> 
            <Header/>
            <Navigation/>
             <div className="w-[51%] m-auto">
             <LogoPage contentLogoPage1={'ĐĂNG KÝ THÀNH VIÊN'} contentLogoPage2={'đăng ký thành viên'}/>
            <div>
                 <span className="pb-2 block">1. Đối tượng đăng ký</span>
                 <ul className="pb-3">
                    <li>- Công dân Việt Nam.</li>
                    <li>- Người nước ngoài cư trú tại Việt Nam không dưới 6 tháng.</li>
                 </ul>
                 <span className="block pb-3">1. Thủ tục đăng ký</span>
                 <p> - Chuẩn bị một bản photo CMTND hoặc hộ chiếu, chứng nhận cư trú tại Việt Nam (với người nước ngoài) và hai ảnh chân dung 2x3cm chụp không quá 6 tháng.
                 (Độc giả dưới 16 tuổi có thể dùng bản photo giấy tờ tùy thân khác như thẻ học sinh hoặc CMTND/hộ chiếu của người giám hộ.)</p>
                 <p> - Điền thông tin vào mẫu đăng ký do thư viện cấp, nộp mẫu đăng ký cùng các giấy tờ kể trên và nộp phí thành viên.
                 (Mang theo bản gốc CMTND hoặc hộ chiếu để đối chiếu.)</p>
                 <span className="block py-3">1. Phí thành viên</span>
                 <p> - Phí quản lý: 60,000 VNĐ/năm (không hoàn trả)</p>
                 <p> - Phí đảm bảo: 200,000 VNĐ
                 (Phí đảm bảo sẽ được hoàn trả chỉ khi độc giả yêu cầu hủy tư cách thành viên và không vi phạm quy định nào của thư viện.)</p>
                 <span className="block py-3">1. Thời hạn thành viên</span>
                 <p>- Tư cách thành viên có giá trị 1 năm ngay sau khi đăng ký.
                 (Thành viên có thể xuất trình biên lai thu phí thành viên để mượn tài liệu ngay trong thời gian đợi làm thẻ.)</p>
                 <p>- Tư cách thành viên có thể được gia hạn tối đa trong vòng 14 ngày trước khi hết hạn.</p>
                 <p>- Phí gia hạn: 60,000 VNĐ</p>
                 <p>- (Nếu không gia hạn, mã thẻ thành viên đó sẽ bị xóa khỏi hệ thống quản lý thành viên mà không được báo trước, độc giả sẽ phải đăng ký lại từ đầu và trả đầy đủ phí đăng ký.)</p>
                 <span className="block py-3">1. Trường hợp mất thẻ</span>
                 <p> - Nếu mất thẻ, thông báo ngay cho thủ thư và làm thủ tục cấp lại thẻ.
                </p>
                 <p>-  Phí cấp lại thẻ: 5,000 VNĐ/lần</p>
            </div>
            <Download pageDown={'Mẫu đăng ký'}/>
             </div>
        </>
    );
};

export default RegisterMember;