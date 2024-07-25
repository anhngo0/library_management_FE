import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate, useSearchParams } from 'react-router-dom';
import paths from '../../routes/path';
import { resetPassword } from '../../api/axiosClient';
import { confirmNewPasswordTheSameAsTyped } from '../../utils/validate';

function ResetPassword() {

    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [ validateTokenParams ] = useSearchParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const uuid = validateTokenParams.get("uuid");
        console.log(uuid);
        const typedError = confirmNewPasswordTheSameAsTyped(newPassword, confirmNewPassword);
        if(typedError) {setErrorMessage(typedError); return;}

        await resetPassword(newPassword, uuid)
        .then(response => {
            console.log(response);
            if(response.status === 200){
                setSuccessMessage("Tạo mới mật khẩu thành công ! Chuyển về trang đăng nhập sau 5 giây.")
                setTimeout(() => navigate(paths.Login), 5000)
            }
        })
        .catch(error => {
            if(error.status === 404){
                setErrorMessage("link đã quá hạn, không thể tạo mới bằng link này nữa")
            }
        })
    } 

    return (
        <div className="w-100 vh-100 p-0 flex justify-center items-center login-background">
        <Card className="w-full max-w-sm">
            <CardContent>
           <Typography variant="h5" component="div" className="text-center mb-4">
               Làm mới mật khẩu
           </Typography>
           <p  className="text-[#6096ba] mb-2 fs-6">Biểu mẫu có thời hạn trong vòng 15 phút</p>
           <form onSubmit={handleSubmit}>
              <div className="mb-4">
              <TextField
                   label="Nhập mật khẩu mới"
                   variant="outlined"
                   type="password"
                   fullWidth
                   value={newPassword}
                   onChange={(e) => {setErrorMessage("");setNewPassword(e.target.value)}}
                   required
               />
               </div>
               <div className="mb-4">
               <TextField
                   label="Xác nhận mật khẩu mới"
                   variant="outlined"
                   type="password"
                   fullWidth
                   value={confirmNewPassword}
                   onChange={(e) => {setErrorMessage("");setConfirmNewPassword(e.target.value)}}
                   required
               />
               </div>
               <Button
               type="submit"
               variant="contained"
               color="primary"
               fullWidth
               className="py-2"
               >
               Làm mới mật khẩu
               </Button>
               {errorMessage && <p className='mt-2 text-danger'> {errorMessage}</p>}
               {successMessage && <p className='mt-2 text-success'> {successMessage}</p>}
           </form>
           
           </CardContent>
       </Card>
       
   </div>
    );
}

export default ResetPassword;