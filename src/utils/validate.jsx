
export default function validateBlankValue(input){
    if(input.trim() === "") {return "Trường này không được bỏ trống"}
    return ""; 
}

export function validateMinSize(input, MIN_SIZE) {
    if(input.length < MIN_SIZE) {return "Trường này phải có ít nhất " + MIN_SIZE + " kí tự"}
    return ""; 
}

export function validateEmailFormat(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (input && !emailRegex.test(input)) {
      return 'Giá trị của trường này phải là email';
    } 
    return "";
}

export function confirmNewPasswordTheSameAsTyped(newPassword, confirmNewPassword){
    if(newPassword !== confirmNewPassword){
        return "Mật khẩu xác nhận nhập không giống với mật khẩu mới đã nhập";
    }
    return "";
}