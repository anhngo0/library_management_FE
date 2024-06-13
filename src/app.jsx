import { Routes, Route } from "react-router-dom";
import allRouter from "./routes/routes";
const App = () => {
  return (
    <div>
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
      </Routes>
    </div>
  );
};

export default App;