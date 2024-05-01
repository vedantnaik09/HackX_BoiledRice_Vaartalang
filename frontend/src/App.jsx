import React, { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom"; // Import from 'react-router-dom' instead of 'react'
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/authContext";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import LearnLang from "./pages/learnLang";
import ChatsPage from "./pages/ChatsPage";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Landing />} />
          <Route path="/learn" element={<LearnLang />} />
          <Route path="/chat" element={<ChatsPage />} />
          <Route
            path="/login"
            element={
              <AuthProvider>
                <Login />
              </AuthProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
