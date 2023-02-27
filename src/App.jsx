import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/home/Home";
import SplashScreen from "./components/splash-screen/SplashScreen";
import WritePost from "./pages/write-post/WritePost";
import Calculator from "./pages/calculator/Calculator";
import SendNotifications from "./pages/push-notifications/SendNotifications";
import RequireAuth from "./pages/auth/RequireAuth";
import ResetPassword from "./pages/auth/ResetPassword";
import ProjectDescription from "./components/project-description/ProjectDescription";
import UploadProfilePicture from "./pages/upload/Upload";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen setShowSplash={setShowSplash} />
      ) : (
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            >
              <Route
                index={true}
                element={
                  <RequireAuth>
                    <ProjectDescription />
                  </RequireAuth>
                }
              />
              <Route
                path="/send-notifications"
                element={
                  <RequireAuth>
                    <SendNotifications />
                  </RequireAuth>
                }
              />
              <Route
                path="/upload"
                element={
                  <RequireAuth>
                    <UploadProfilePicture />
                  </RequireAuth>
                }
              />
              <Route
                path="/write-post"
                element={
                  <RequireAuth>
                    <WritePost />
                  </RequireAuth>
                }
              />
              <Route
                path="/calculate"
                element={
                  <RequireAuth>
                    <Calculator />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
