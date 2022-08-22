import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Machine from "./pages/Machine";
import StatusHistory from "./pages/StatusHistory";

export const AppContext = createContext();

function App() {
    const [loginStatus, setLoginStatus] = useState({
        loggedIn: true,
        user: {
            user_id: 1,
            first_name: "Regienald",
            last_name: "Almoite",
            role_id: 1,
        },
    });
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
                        <Route
                            path="/machine/:machineId"
                            element={<Machine />}
                        />
                        <Route path="/history" element={<StatusHistory />} />
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
            </AppContext.Provider>
        </div>
    );
}

export default App;
