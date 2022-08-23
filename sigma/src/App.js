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
export const HistoryContext = createContext();

function App() {
    const [loginStatus, setLoginStatus] = useState({});

    return (
        <div className="max-h-screen overflow-hidden">
            <AppContext.Provider
                value={{
                    loginStatus,
                    setLoginStatus,
                }}
            >
                <Router>
                    <Routes>
                        <Route path="/" element={<Login />} />

                        <Route
                            path="/adminDashboard"
                            element={<AdminDashboard />}
                        />
                        <Route path="/dashboard" element={<Dashboard />} />

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
