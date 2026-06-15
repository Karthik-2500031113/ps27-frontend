import {
    FaHome,
    FaPlusCircle,
    FaSearch,
    FaChartBar,
    FaUsers,
    FaSignOutAlt
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Navbar() {

    const role =
        localStorage.getItem("role");

    const logout = () => {

        localStorage.clear();

        window.location.href =
            "/login";
    };

    return (

        <div className="sidebar">

            <h2 className="logo">

                ServiceHub

            </h2>

            <Link
                className="sidebar-link"
                to="/"
            >

                <FaHome />
                {" "}
                Dashboard

            </Link>

            <Link
                className="sidebar-link"
                to="/analytics"
            >

                <FaChartBar />
                {" "}
                Analytics

            </Link>

            {
                role !== "ADMIN"

                &&

                <Link
                    className="sidebar-link"
                    to="/create"
                >

                    <FaPlusCircle />
                    {" "}
                    Create Request

                </Link>
            }

            {
                role === "ADMIN"

                &&

                <Link
                    className="sidebar-link"
                    to="/users"
                >

                    <FaUsers />
                    {" "}
                    Manage Users

                </Link>
            }

            <Link
                className="sidebar-link"
                to="/search"
            >

                <FaSearch />
                {" "}
                Semantic Search

            </Link>

            <div
                style={{
                    marginTop: "auto"
                }}
            >

                <button

                    className="
                    btn-custom
                    w-100"

                    onClick={logout}
                >

                    <FaSignOutAlt />
                    {" "}
                    Logout

                </button>

            </div>

        </div>
    );
}

export default Navbar;