
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import validateBlankValue, { validateEmailFormat } from '../../utils/validate';
import { sendEmailToResetPassword } from '../../api/axiosClient';
function ForgotPassword() {

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage("");    
            
        let error  = validateBlankValue(email);
        if(error) { setErrorMessage(error); return;}
        
        error = validateEmailFormat(email);
        if(error){setErrorMessage(error); return;}

        try {
            await sendEmailToResetPassword(email).then(response => {
                setSuccessMessage("Gửi mail thành công");
            })
            
        } catch (error) {
            console.log(error);
        }
        
    };

    return (
        <div className="w-100 vh-100 p-0 flex justify-center items-center login-background">
             <Card className="w-full max-w-sm">
                 <CardContent>
                <Typography variant="h5" component="div" className="text-center mb-4">
                    Quên mật khẩu
                </Typography>
                <p className='text-[#6096ba] mb-2 fs-6'>Nhập email của tài khoản để hệ thống gửi link làm mới mật khẩu. Chú ý link chỉ có hiệu lực trong 15 phút</p>
                <form onSubmit={handleSubmit}>
                   <div className="mb-4">
                   <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    Gửi yêu cầu
                    </Button>
                   
                </form>
                {errorMessage && <p className='mt-2 text-danger'> {errorMessage}</p>}
                {successMessage && <p className='mt-2 text-success'> {successMessage}</p>}
                </CardContent>
            </Card>
            
        </div>
    );
}

export default ForgotPassword;