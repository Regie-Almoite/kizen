import { useState, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Machine from "./pages/Machine";

export const AppContext = createContext();

function App() {
    const [loginStatus, setLoginStatus] = useState({
        user: { user_id: 2, role_id: 2 },
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
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </Router>
            </AppContext.Provider>
        </div>
    );
}

export default App;
