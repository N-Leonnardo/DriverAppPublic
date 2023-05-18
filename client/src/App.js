import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import NewTrip from "./views/NewTrip";
import { Suspense, useEffect } from "react";
import "./styles.css";
import MyTrip from "./views/MyTrip";

export const url = "http://localhost:8089/api";

function App() {
  useEffect(() => {
    document.title = "MyDriverLN";
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newtrip" element={<NewTrip />} />
        <Route path="/mytrip/:trip_id" element={<MyTrip />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
