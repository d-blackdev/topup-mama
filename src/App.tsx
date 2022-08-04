import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { routes } from "./route/appRoute";
import PrivateRoute from "./route/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* For private route */}
        {routes.map(({ component: Component, path }, index) => (
          <Route
            path={path}
            key={index}
            element={
              <PrivateRoute>
                <Component />
              </PrivateRoute>
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
