import { useState } from "react";
import axios from "axios";

function SemanticSearch() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {

        const response = await axios.post(
            "http://localhost:8000/semantic-search",
            {
                query
            }
        );

        setResults(response.data);
    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>Semantic Search</h2>

            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) =>
                    setQuery(e.target.value)
                }
                style={styles.input}
            />

            <button
                style={styles.button}
                onClick={handleSearch}
            >
                Search
            </button>

            <div style={{ marginTop: "20px" }}>

                {
                    results.map((item, index) => (

                        <div
                            key={index}
                            style={styles.card}
                        >

                            <h3>{item.text}</h3>

                            <p>
                                Similarity:
                                {" "}
                                {item.similarity.toFixed(2)}
                            </p>

                        </div>
                    ))
                }

            </div>
        </div>
    );
}

const styles = {

    input: {
        width: "300px",
        padding: "10px"
    },

    button: {
        marginLeft: "10px",
        padding: "10px 20px"
    },

    card: {
        border: "1px solid gray",
        padding: "10px",
        marginTop: "10px",
        borderRadius: "10px"
    }
};

export default SemanticSearch;