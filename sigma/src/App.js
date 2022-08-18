import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";

export const AppContext = createContext();

function App() {
    const [loginStatus, setLoginStatus] = useState({});
    console.log(loginStatus);
    return (
        <div>
            <AppContext.Provider value={{ loginStatus, setLoginStatus }}>
                <Router>
                    <Routes>
                        {/* <Route path="/" element={<Login />} />

                        <Route
                            path="/adminDashboard"
                            element={<AdminDashboard />}
                        /> */}
                        <Route path="/" element={<Dashboard />} />

                        <Route path="/profile/:userId" element={<Profile />} />

                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
            </AppContext.Provider>
        </div>
    );
}

export default App;
