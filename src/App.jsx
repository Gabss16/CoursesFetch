import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Users from "./pages/Courses";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users/:id?" element={<Courses />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "bg-gray-800 text-white",
          duration: 3000,
          style: {
            fontSize: "16px",
          },
        }}
      />
    </>
  );
}

export default App;
