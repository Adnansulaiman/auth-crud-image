import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import AddNew from "./pages/AddNew";
import ProtectedRoute from "./utils/protectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-new"
          element={
            <ProtectedRoute>
              <AddNew />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
