//using react-router-dom@6 --> instead of Switch we have Routes

import React from "react";
//PrivateRoute is for wrap it on the dashboard page (make it accessible just for users) and AuthWrapper is for when we go from login page to the dashboard page (if we don't use it we'll stick in the login page)
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Routes>
          {/* to limited access to the dashboard it should be wrapped in the PrivateRoute */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </AuthWrapper>
  );
}

export default App;
