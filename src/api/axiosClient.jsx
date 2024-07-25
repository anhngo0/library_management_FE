


import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1'; // Replace with your API URL
const JWT_EXPIRATION = 120000;

const isTokenExpired = () => {
    const expiration = JSON.parse(localStorage.getItem('ACCESS_TOKEN_EXPIRATION'));
    return expiration && new Date().getTime() > expiration;
  };
const refreshToken = async () => {
    const refreshToken = localStorage.getItem('REFRESH_TOKEN');
    console.log(refreshToken);
    if (refreshToken) {
        try {
        const response = await axios.post(`${API_URL}/auth/refresh-token`,null, {
            headers: {
            "Authorization": `Bearer ${refreshToken}`,
            },
        });
        if (response.status === 200) {
            console.log(response.data);
            const { access_token, refresh_token } = response.data;
            localStorage.setItem('ACCESS_TOKEN', access_token);
            localStorage.setItem('REFRESH_TOKEN', refresh_token);
            localStorage.setItem('ACCESS_TOKEN_EXPIRATION', new Date().getTime() + JWT_EXPIRATION);
        
            return access_token;
        }
        } catch (refreshError) {
        console.error('Error refreshing tokens:', refreshError);
        }
    }
};  

const axiosClient = axios.create({
    // baseURL:"http://127.0.0.1:8080/api/v1"
     baseURL: API_URL
});


// Request interceptor to add the access token to headers
axiosClient.interceptors.request.use(
    async (config) => {
      let accessToken = localStorage.getItem('ACCESS_TOKEN');
      if (isTokenExpired()) {
        accessToken = await refreshToken();
      }
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Response interceptor to refresh the token if it has expired
  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const newAccessToken = await refreshToken();
          if (newAccessToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosClient(originalRequest);
          }
        }
      return Promise.reject(error);
    }
  );

export default axiosClient;

export const unAuthAxiosClient = axios.create({
    // baseURL:"http://127.0.0.1:8080/api/v1"
     baseURL: API_URL
});

export const login = async (username, password) => {
    let form = new URLSearchParams();
    form.append("username", username);
    form.append("password", password);

    try {
        const response = await unAuthAxiosClient.post("/auth/login", form ,{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
      
          return response;
    } catch (error) {
        console.log(error);
        return "Không tìm thấy tài khoản hợp lệ"
    }
   
}

export const logoutApp = async () => {
    try {
        return await axiosClient.post("/auth/logout");
        
    } catch (error) {
        console.log(error);
    }
}

export const sendEmailToResetPassword = async (email) => {
  try {
    return await unAuthAxiosClient.post(`/account/reset-password/init?email=${email}`);
  } catch (error) {
    console.log(error);
  }
}

export const resetPassword = async (newPassword, resetKey) => {
  try {
    return await unAuthAxiosClient.post(`/account/reset-password/finish`, {
      newPassword: newPassword,
      resetKey: resetKey
    });
  } catch (error) {
    console.log(error);
  }
}