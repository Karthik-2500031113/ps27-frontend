import "./App.css";

import Login from "./pages/Login";

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";

import CreateRequest
from "./pages/CreateRequest";

import SemanticSearch
from "./pages/SemanticSearch";

import Analytics
from "./pages/Analytics";

import ManageUsers from "./pages/ManageUsers";

function App() {

    const token =
        localStorage.getItem(
            "token"
        );

    if (!token) {

        return <Login />;
    }

    return (

        <BrowserRouter>

            <div className="main-layout">

                <Navbar />

                <div className="content">

                    <Routes>

                        {/* Dashboard */}

                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

                        {/* Create Request */}

                        <Route
                            path="/create"
                            element={
                                <CreateRequest />
                            }
                        />

                        {/* Semantic Search */}

                        <Route
                            path="/search"
                            element={
                                <SemanticSearch />
                            }
                        />

                        {/* Analytics */}

                        <Route
                            path="/analytics"
                            element={
                                <Analytics />
                            }
                        />

                        {/* Manage Users */}

                     <Route
    path="/users"
    element={<ManageUsers />}
/>

                        {/* Login */}

                        <Route
                            path="/login"
                            element={<Login />}
                        />

                    </Routes>

                </div>

            </div>

        </BrowserRouter>
    );
}

export default App;