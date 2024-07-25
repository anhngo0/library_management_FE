
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import  { validateMinSize } from '../../utils/validate';
import { login } from '../../api/axiosClient';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameErrorMes, setUsernameErrorMes] = useState("");
    const [passwordErrorMes, setPasswordErrorMes] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    
    
    const JWT_EXPIRATION = 120000;
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      setUsernameErrorMes("");
      setPasswordErrorMes(() => validateMinSize(password,6));     
      
      if(!usernameErrorMes && !passwordErrorMes){

        await login(username,password).then(response => {
            if(response.status === 200){
                
            localStorage.clear();
            // Store the token in local storage or state
            localStorage.setItem('ACCESS_TOKEN', response.data.access_token);
            localStorage.setItem("REFRESH_TOKEN", response.data.refresh_token)
            localStorage.setItem('ACCESS_TOKEN_EXPIRATION', new Date().getTime() + JWT_EXPIRATION); // 2 minutes
            navigate("/manage/book")
            }
            else {
                setErrorMessage("Đăng nhập thất bại!")
            }
        });
          
          
      }
    };

    return (
        

        <div className="w-100 vh-100 p-0 flex justify-center items-center login-background">
             <Card className="w-full max-w-sm">
                 <CardContent>
                <Typography variant="h5" component="div" className="text-center mb-4">
                    Đăng nhập
                </Typography>
                <form onSubmit={handleSubmit}>
                   <div className="mb-4">
                   <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        error={!!usernameErrorMes}
                        helperText={usernameErrorMes}
                    />
                    </div>
                    <div className="mb-4">
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        error={!!passwordErrorMes}
                        helperText={passwordErrorMes}
                    />
                    </div>
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="py-2"
                    >
                    Đăng nhập
                    </Button>
                    {errorMessage && <p className='mt-2 text-danger'> {errorMessage}</p>}
                </form>
                <div className="w-100 text-end mt-3">
                    <Link to={"forgot_password"} className='text-[#6096ba]'>Quên mật khẩu</Link>
                </div>
                </CardContent>
            </Card>
            
        </div>
    );
}

export default Login;