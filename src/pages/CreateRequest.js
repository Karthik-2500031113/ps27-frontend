import { useState } from "react";
import axios from "axios";

function CreateRequest() {

    const [title, setTitle] =
        useState("");

    const [description,
        setDescription] =
        useState("");

    const [categoryId,
        setCategoryId] =
        useState(1);

    const [priorityId,
        setPriorityId] =
        useState(1);

    // ---------------- AI AUTO CATEGORY ---------------- //

    const autoCategorize = async (text) => {

        if (!text.trim()) return;

        try {

            const response =
                await axios.post(

                    "http://localhost:8000/categorize",

                    {
                        text
                    }
                );

            const category =
                response.data.category;

            if (category === "Network") {

                setCategoryId(1);
            }

            else if (
                category === "Hardware"
            ) {

                setCategoryId(2);
            }

            else if (
                category === "Software"
            ) {

                setCategoryId(3);
            }

        }

        catch (err) {

            console.log(
                "Categorization failed"
            );
        }
    };

    // ---------------- SUBMIT ---------------- //

    const handleSubmit =
    async (e) => {

        e.preventDefault();

        try {

            // GET CURRENT USER

            const usersResponse =
                await axios.get(
                    "http://localhost:8000/users"
                );

            const users =
                usersResponse.data;

            const currentEmail =
                localStorage.getItem(
                    "email"
                );

            const currentUser =
                users.find(

                    (u) =>
                        u.email ===
                        currentEmail
                );

            // CREATE REQUEST

            const requestResponse =
                await axios.post(

                    "http://localhost:8000/requests",

                    {
                        title,
                        description,

                        user: {
                            userId:
                            currentUser.userId
                        },

                        category: {
                            categoryId
                        },

                        priority: {
                            priorityId
                        }
                    }
                );

            const createdRequest =
                requestResponse.data;

            // GENERATE EMBEDDING

            await axios.post(

                "http://localhost:8000/generate_embedding",

                {
                    requestId:
                    createdRequest.requestId,

                    text:
                    title +
                    " " +
                    description
                }
            );

            // STORE LOG

            await axios.post(

                "http://localhost:5000/api/logs",

                {
                    requestId:
                    createdRequest.requestId,

                    action:
                    "CREATED",

                    user:
                    currentUser.name
                }
            );

            alert(
                "Request Created Successfully"
            );

            setTitle("");
            setDescription("");
            setCategoryId(1);
            setPriorityId(1);

        }

        catch (error) {

            console.log(error);

            alert(
                "Failed to create request"
            );
        }
    };

    return (

        <div>

            <h1 className="mb-4">
                Create Request
            </h1>

            <div className="card-custom">

                <div
                    style={{
                        marginBottom: "15px",
                        color: "#8b5cf6",
                        fontWeight: "600"
                    }}
                >

                    🤖 AI Category Prediction Active

                </div>

                <form
                    onSubmit={handleSubmit}
                >

                    {/* TITLE */}

                    <input

                        className="input-custom"

                        type="text"

                        placeholder="Request Title"

                        value={title}

                        onChange={(e) => {

                            setTitle(
                                e.target.value
                            );

                            autoCategorize(
                                e.target.value
                            );
                        }}

                        required
                    />

                    {/* DESCRIPTION */}

                    <textarea

                        className="input-custom"

                        placeholder="Description"

                        rows="4"

                        value={description}

                        onChange={(e) => {

                            setDescription(
                                e.target.value
                            );

                            autoCategorize(
                                e.target.value
                            );
                        }}

                        required
                    />

                    {/* CATEGORY */}

                    <select

                        className="input-custom"

                        value={categoryId}

                        onChange={(e) =>
                            setCategoryId(
                                Number(
                                    e.target.value
                                )
                            )
                        }
                    >

                        <option value={1}>
                            Network
                        </option>

                        <option value={2}>
                            Hardware
                        </option>

                        <option value={3}>
                            Software
                        </option>

                    </select>

                    {/* PRIORITY */}

                    <select

                        className="input-custom"

                        value={priorityId}

                        onChange={(e) =>
                            setPriorityId(
                                Number(
                                    e.target.value
                                )
                            )
                        }
                    >

                        <option value={1}>
                            Low
                        </option>

                        <option value={2}>
                            Medium
                        </option>

                        <option value={3}>
                            High
                        </option>

                    </select>

                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="btn-custom"
                    >

                        🚀 Create Request

                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateRequest;