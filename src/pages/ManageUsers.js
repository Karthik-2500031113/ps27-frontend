import { useEffect, useState } from "react";
import axios from "axios";

function ManageUsers() {

    const [users, setUsers] =
        useState([]);

    const fetchUsers = () => {

        axios
            .get(
                "http://localhost:8081/users/with-request-count"
            )
            .then((res) => {

                setUsers(res.data);

            })
            .catch((err) => {

                console.log(err);

            });
    };

    useEffect(() => {

        fetchUsers();

    }, []);

    const toggleUser =
    async (id) => {

        try {

            await axios.put(
                `http://localhost:8081/users/${id}/toggle`
            );

            fetchUsers();

        } catch (error) {

            console.log(error);

            alert(
                "Failed to update user"
            );
        }
    };

    return (

        <div>

            <h1 className="mb-4">

                👥 Manage Users

            </h1>

            <div className="row">

                {
                    users.map((user) => (

                        <div
                            className="col-md-4 mb-4"
                            key={user.userId}
                        >

                            <div
                                className="card-custom"
                            >

                                <h3>

                                    👤 {user.name}

                                </h3>

                                <p>

                                    📧 {user.email}

                                </p>

                                <p>

                                    🛡 {user.role}

                                </p>

                                <p>

                                    📊 Requests: {" "}
                                    {user.requestCount}

                                </p>

                                <p>

                                    Status: {" "}

                                    {
                                        user.active
                                            ? "🟢 Active"
                                            : "🔴 Disabled"
                                    }

                                </p>

                                {
                                    user.role !== "ADMIN" && (

                                        <button

                                            className={
                                                user.active
                                                    ? "btn btn-danger"
                                                    : "btn btn-success"
                                            }

                                            onClick={() =>
                                                toggleUser(
                                                    user.userId
                                                )
                                            }
                                        >

                                            {
                                                user.active
                                                    ? "🔴 Disable User"
                                                    : "🟢 Enable User"
                                            }

                                        </button>
                                    )
                                }

                            </div>

                        </div>
                    ))
                }

            </div>

        </div>
    );
}

export default ManageUsers;