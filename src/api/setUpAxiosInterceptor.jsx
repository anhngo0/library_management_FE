// import axios from 'axios';

// const setupAxiosInterceptors = () => {
//   axios.interceptors.request.use(
//     async (config) => {
//       const token = localStorage.getItem('ACCESS_TOKEN');
//       const expiration = localStorage.getItem('ACCESS_TOKEN_EXPIRATION');

//       if (token && expiration) {
//         const isTokenExpired = new Date().getTime() > expiration;

//         if (isTokenExpired) {
//           const refreshToken = localStorage.getItem('REFRESH_TOKEN');
//           if (refreshToken) {
//             try {
//               const response = await axios.post('/api/v1/auth/refresh-token', {
//                 headers: {
//                   'Authorization': `Bearer ${refreshToken}`
//                 }
//               });

//               localStorage.setItem('ACCESS_TOKEN', response.data.access_token);
//               localStorage.setItem('ACCESS_TOKEN_EXPIRATION', new Date().getTime() + 120000); // 2 minutes
//               localStorage.setItem('REFRESH_TOKEN', response.data.refresh_token);

//               config.headers.Authorization = `Bearer ${response.data.access_token}`;
//             } catch (err) {
//               console.error('Failed to refresh token', err);
//               localStorage.removeItem('ACCESS_TOKEN');
//               localStorage.removeItem('REFRESH_TOKEN');
//               localStorage.removeItem('ACCESS_TOKEN_EXPIRATION');
//               window.location.href = '/login';
//               return Promise.reject(err);
//             }
//           } else {
//             localStorage.removeItem('ACCESS_TOKEN');
//             localStorage.removeItem('REFRESH_TOKEN');
//             localStorage.removeItem('ACCESS_TOKEN_EXPIRATION');
//             window.location.href = '/login';
//             return Promise.reject(new Error('Refresh token missing'));
//           }
//         } else {
//           config.headers.Authorization = `Bearer ${token}`;
//         }
//       }

//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   axios.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
// };

// export default setupAxiosInterceptors;
