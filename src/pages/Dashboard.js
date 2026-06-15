import { useEffect, useState }
from "react";

import axios from "axios";

function Dashboard() {

    const [requests, setRequests] =
        useState([]);

    const [theme,
    setTheme] =
    useState("theme-blue");

    const role =
        localStorage.getItem("role");

    // ---------------- FETCH REQUESTS ---------------- //

    const fetchRequests = () => {

        axios.get(

            "http://localhost:8000/requests",

            {
                params: {

                    role:
                    localStorage.getItem(
                        "role"
                    ),

                    email:
                    localStorage.getItem(
                        "email"
                    )
                }
            }
        )
        .then((res) => {

            setRequests(res.data);
        });
    };

    useEffect(() => {

        fetchRequests();

    }, []);

    // ---------------- COUNTS ---------------- //

    const totalRequests =
        requests.length;

    const activeRequests =
        requests.filter(
            (req) =>
                req.status !== "RESOLVED"
        ).length;

    const resolvedRequests =
        requests.filter(
            (req) =>
                req.status === "RESOLVED"
        ).length;

    // ---------------- RESOLVE ---------------- //

    const resolveRequest =
    async (id) => {

        try {

            await axios.put(
                `http://localhost:8000/requests/${id}/resolve`
            );

            fetchRequests();

        }

        catch (error) {

            console.log(error);
        }
    };

    // ---------------- DELETE ---------------- //

    const deleteRequest =
    async (id) => {

        try {

            await axios.delete(
                `http://localhost:8000/requests/${id}`
            );

            fetchRequests();

        }

        catch (error) {

            console.log(error);
        }
    };

    // ---------------- LOGOUT ---------------- //

    const logout = () => {

        localStorage.clear();

        window.location.href = "/";
    };

   return (

    <div
        className={theme}
    >

            {/* ---------------- TOP BAR ---------------- */}

            <div
                className="
                d-flex
                justify-content-between
                align-items-center
                mb-4"
            >

                <div
    className="
    d-flex
    align-items-center"
>

    <div
        style={{

            width: "55px",

            height: "55px",

            borderRadius: "16px",

            background:
            "linear-gradient(135deg,#2563eb,#38bdf8)",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            color: "white",

            fontWeight: "800",

            fontSize: "22px",

            marginRight: "16px",

            boxShadow:
            "0 8px 20px rgba(37,99,235,0.25)"
        }}
    >

        SH

    </div>

    <div>

        <h1
            style={{

                marginBottom: "2px",

                fontWeight: "800"
            }}
        >

            ServiceHub

        </h1>

        <p
            style={{

                color: "#64748b",

                marginBottom: "0"
            }}
        >

            Smart Service Request
            Management Platform

        </p>

    </div>

</div>

                <div>

                    <span
                        className="
                        me-3"
                    >

                        Role:
                        {" "}

                        <strong>
                            {role}
                        </strong>

                    </span>

                    

                </div>
                
            </div>

            {/* ---------------- STATS ---------------- */}

            <div className="row mb-4">

                <div className="col-md-4">

                    <div className="card-custom">

                        <div className="stat-title">
                            Total Requests
                        </div>

                        <div className="stat-number">
                            {totalRequests}
                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card-custom">

                        <div className="stat-title">
                            Active Requests
                        </div>

                        <div className="stat-number">
                            {activeRequests}
                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card-custom">

                        <div className="stat-title">
                            Resolved Requests
                        </div>

                        <div className="stat-number">
                            {resolvedRequests}
                        </div>

                    </div>

                </div>

            </div>

            {/* ---------------- REQUESTS ---------------- */}

            <div className="row">

                {
                   [...requests]

.sort((a, b) => {

    const priorityOrder = {

        HIGH: 3,
        MEDIUM: 2,
        LOW: 1
    };

    return (

        priorityOrder[
            b.priority
            ?.priorityName
            ?.toUpperCase()
        ]

        -

        priorityOrder[
            a.priority
            ?.priorityName
            ?.toUpperCase()
        ]
    );
})

.map((req) => (
                        <div
                            className="col-md-4"
                            key={req.requestId}
                        >

                            <div className="card-custom">

                                <h4>
                                    {req.title}
                                </h4>

                                <p>
                                    {req.description}
                                </p>

                                <p>

                                    <strong>
                                        Category:
                                    </strong>

                                    {" "}

                                    {
                                        req.category
                                        ?.categoryName
                                    }

                                </p>

                                <p>

                                    <strong>
                                        Priority:
                                    </strong>

                                    {" "}

                                    {
                                        req.priority
                                        ?.priorityName
                                    }

                                </p>

                                <p>

                                    <strong>
                                        User:
                                    </strong>

                                    {" "}

                                    {
                                        req.user
                                        ?.name
                                    }

                                </p>

                                {/* STATUS */}

                                <div className="mb-3">

                                    <span
                                        className={

                                            req.status ===
                                            "RESOLVED"

                                            ?

                                            "status-badge badge-resolved"

                                            :

                                            "status-badge badge-progress"
                                        }
                                    >

                                        {
                                            req.status
                                        }

                                    </span>

                                </div>

                                {/* ADMIN BUTTONS */}

                                {
                                    role === "ADMIN"

                                    &&

                                    <div>

                                        {
                                            req.status !==
                                            "RESOLVED"

                                            &&

                                            <button

                                                className="
                                                btn-custom
                                                me-2"

                                                onClick={() =>
                                                    resolveRequest(
                                                        req.requestId
                                                    )
                                                }
                                            >

                                                Resolve

                                            </button>
                                        }

                                        <button

                                            className="
                                            btn btn-danger"

                                            onClick={() =>
                                                deleteRequest(
                                                    req.requestId
                                                )
                                            }
                                        >

                                            Delete

                                        </button>

                                    </div>
                                }

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default Dashboard;