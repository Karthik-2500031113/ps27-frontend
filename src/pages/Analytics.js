import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { useEffect, useState } from "react";
import axios from "axios";

function Analytics() {

    const [analytics, setAnalytics] =
        useState(null);

    const role =
        localStorage.getItem("role");

    useEffect(() => {

        const email =
            localStorage.getItem("email");

        const url =
            role === "ADMIN"
                ? "http://localhost:8000/analytics"
                : "http://localhost:8000/user-analytics";

        axios.get(
            url,
            role === "ADMIN"
                ? {}
                : {
                    params: {
                        email
                    }
                }
        )
        .then((res) => {

            setAnalytics(res.data);

        })
        .catch((err) => {

            console.log(err);

        });

    }, [role]);

    if (!analytics) {

        return <h2>Loading...</h2>;
    }

    const categoryData = [

        {
            name: "Network",
            value: analytics.networkCount
        },

        {
            name: "Hardware",
            value: analytics.hardwareCount
        },

        {
            name: "Software",
            value: analytics.softwareCount
        }
    ];

    const statusData = [

        {
            name: "Active",
            value: analytics.activeRequests
        },

        {
            name: "Resolved",
            value: analytics.resolvedRequests
        }
    ];

    const COLORS = [
        "#3b82f6",
        "#10b981",
        "#f59e0b"
    ];

    return (

        <div>

            <h1 className="mb-4">
                📊 Analytics Dashboard
            </h1>

            {/* ADMIN DASHBOARD */}

            {role === "ADMIN" ? (

                <>
                    <div className="row mb-4">

                        <div className="col-md-3">

                            <div className="card-custom">

                                <div className="stat-title">
                                    Total Users
                                </div>

                                <div className="stat-number">
                                    {analytics.totalUsers}
                                </div>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="card-custom">

                                <div className="stat-title">
                                    Total Requests
                                </div>

                                <div className="stat-number">
                                    {analytics.totalRequests}
                                </div>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="card-custom">

                                <div className="stat-title">
                                    Active Requests
                                </div>

                                <div className="stat-number">
                                    {analytics.activeRequests}
                                </div>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="card-custom">

                                <div className="stat-title">
                                    Resolved Requests
                                </div>

                                <div className="stat-number">
                                    {analytics.resolvedRequests}
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="row mb-4">

                        <div className="col-md-6">

                            <div className="card-custom">

                                <div className="stat-title">
                                    Disabled Users
                                </div>

                                <div className="stat-number">
                                    {analytics.disabledUsers}
                                </div>

                            </div>

                        </div>

                        <div className="col-md-6">

                            <div className="card-custom">

                                <div className="stat-title">
                                    High Priority Requests
                                </div>

                                <div className="stat-number">
                                    {analytics.highPriority}
                                </div>

                            </div>

                        </div>

                    </div>
                </>

            ) : (

                <>
                    <div className="row mb-4">

                        <div className="col-md-3">

                            <div className="card-custom">

                                <div className="stat-title">
                                    Total Requests
                                </div>

                                <div className="stat-number">
                                    {analytics.totalRequests}
                                </div>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="card-custom">

                                <div className="stat-title">
                                    Active Requests
                                </div>

                                <div className="stat-number">
                                    {analytics.activeRequests}
                                </div>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="card-custom">

                                <div className="stat-title">
                                    Resolved Requests
                                </div>

                                <div className="stat-number">
                                    {analytics.resolvedRequests}
                                </div>

                            </div>

                        </div>

                        <div className="col-md-3">

                            <div className="card-custom">

                                <div className="stat-title">
                                    High Priority Requests
                                </div>

                                <div className="stat-number">
                                    {analytics.highPriority}
                                </div>

                            </div>

                        </div>

                    </div>
                </>

            )}

            {/* CATEGORY CHART */}

            <div className="card-custom">

                <h3>
                    📈 Requests by Category
                </h3>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <BarChart data={categoryData}>

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="value"
                            fill="#8b5cf6"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            {/* PIE CHART */}

            <div className="card-custom mt-4">

                <h3>
                    🥧 Category Distribution
                </h3>

                <ResponsiveContainer
                    width="100%"
                    height={400}
                >

                    <PieChart>

                        <Pie
                            data={categoryData}
                            dataKey="value"
                            outerRadius={140}
                            label
                        >

                            {categoryData.map(
                                (entry, index) => (

                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />

                                )
                            )}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

            {/* STATUS CHART */}

            <div className="card-custom mt-4">

                <h3>
                    📋 Request Status
                </h3>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <BarChart data={statusData}>

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="value"
                            fill="#10b981"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default Analytics;