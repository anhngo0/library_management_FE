import { Route, Routes} from 'react-router-dom';
import allRouter from "./routes/routes";
import Login from './pages/login/Login';
import ForgotPassword from './pages/login/ForgotPassword';
import management_router from './routes/managementRoutes';
import ProtectedRoute from './routes/ProtectedRoute';
import ResetPassword from './pages/login/ResetPassword';
// import { useEffect } from 'react';
// import setupAxiosInterceptors from './api/setUpAxiosInterceptor';
const App = () => {

  // useEffect(() => {
  //   setupAxiosInterceptors();
  // }, []);

  return (
    <>
        <Routes>
          {allRouter.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              >
              </Route>
            )
          })}
          
          {/* Login route */}
          <Route path="/login/forgot_password" element={<ForgotPassword />} />
          <Route path="/reset-password/confirm" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          

          {/* Protected routes */}
          <Route path="/*" element={<ProtectedRoute />}>
            {management_router.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                >
                </Route>
              )
            })}
          </Route>

         {/* Catch-all route to redirect to login if no match is found */}
          {/* <Route path="*" element={<Navigate to="/login" />} />    */}
        </Routes>

    </>
  );
};

export default App;