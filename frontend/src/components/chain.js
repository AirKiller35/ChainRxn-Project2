import React, { useState, useEffect } from "react";
import axios from "axios";

const Chain = () => {
  // State to store the blockchain data
  const [blockchain, setBlockchain] = useState([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blockchain from backend when component mounts
  useEffect(() => {
    const fetchBlockchain = async () => {
      try {
        // TODO: Make a GET request to the backend endpoint /getChain
        // and store the result in blockchain state
        const response = await axios.get('http://localhost:3005/getChain');
        setBlockchain(response.data);
      } catch (err) {
        // TODO: Set error message if request fails
        console.error("ERROR: failed to fetch blockchain: ", err);
        setError("Failed to fetch blockchain")
      } finally {
        // TODO: Set loading to false after request completes
        setLoading(false);
      }
    };

    fetchBlockchain();
  }, []);

  // Loading screen
  if (loading) {
    return <div className="text-center text-blue-600">Loading blockchain...</div>;
  }

  // Error message
  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Blockchain</h1>

      {/* Display the blockchain vertically */}
      <div className="flex flex-col items-center space-y-6">
        {blockchain.map((block, index) => (
          <div key={index} className="flex flex-col items-center">
            {/* Individual Block Display */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-80">
              <p>
                <strong>Index:</strong> {block.index}
              </p>
              <p>
                {/* TODO: Format and show timestamp using new Date(block.timestamp).toLocaleString() */}
                <strong>Timestamp:</strong> { new Date(parseInt(block.timestamp)).toLocaleString() }
              </p>
              <p>
                <strong>Previous Hash:</strong>{" "}
                {/* TODO: Display previous block’s hash with line wrapping */}
                <span className="break-all text-gray-600">{ block.prevHash }</span>
              </p>
              <p>
                <strong>Hash:</strong>{" "}
                {/* TODO: Display current block’s hash with line wrapping */}
                <span className="break-all text-gray-600">{ block.hash }</span>
              </p>
              <p>
                <strong>Data:</strong> { block.data }
              </p>
            </div>

            {/* Show arrow between blocks */}
            {index < blockchain.length - 1 && (
              <div className="flex flex-col items-center">
                <div className="h-12 w-1 bg-blue-500 my-2"></div>
                <div className="text-gray-500 text-xl">↓</div>
                <div className="h-12 w-1 bg-blue-500 my-2"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chain;
