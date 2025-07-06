import React, { useState, useEffect } from "react";
import axios from "axios";

const GetLatestBlock = () => {
  // State to hold the latest block's data
  const [latestBlock, setLatestBlock] = useState(null);

  // State for error handling
  const [error, setError] = useState(null);

  // State to indicate loading status
  const [loading, setLoading] = useState(true);

  // Fetch the latest block from the backend when the component mounts
  useEffect(() => {
    const fetchLatestBlock = async () => {
      try {
        // TODO: Make a GET request to http://localhost:3005/getLatestBlock
        // and store the result in the latestBlock state
        const response = await axios.get("http://localhost:3005/getLatestBlock");
        setLatestBlock(response.data);
      } catch (err) {
        // TODO: If request fails, set an appropriate error message
        console.error("ERROR: failed to the latest block: ", err);
        setError("failed to get the latest block");
      } finally {
        // TODO: Whether success or failure, stop the loading spinner
        setLoading(false);
      }
    };

    fetchLatestBlock();
  }, []);

  // Display a loading message while data is being fetched
  if (loading) {
    return <div className="text-center text-blue-600 text-lg">Loading...</div>;
  }

  // Display error message if something went wrong
  if (error) {
    return <div className="text-center text-red-600 text-lg">{error}</div>;
  }

  return (
    <div className="latest-block bg-gray-100 min-h-screen flex flex-col items-center px-2 py-4 sm:px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
        Latest Block
      </h1>

      {/* If latestBlock exists, display it */}
      {latestBlock ? (
        <div className="block-card w-full max-w-screen-sm bg-white border border-gray-300 rounded-lg shadow-lg p-4 overflow-hidden">
          
          {/* Block Index */}
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-700">
              <span className="text-blue-600">Block Index:</span> {latestBlock.index}
            </p>
          </div>

          {/* Timestamp */}
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-700">
              <span className="text-blue-600">Block Timestamp:</span>{new Date(parseInt(latestBlock.timestamp)).toLocaleString()}
              {/* TODO: Convert latestBlock.timestamp to a readable string */}
            </p>
          </div>

          {/* Previous Hash */}
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-700">
              <span className="text-blue-600">Previous Hash:</span>
            </p>
            {/* TODO: Show previous hash */}
            <p className="text-xs font-mono text-gray-600 break-all">{latestBlock.prevHash}</p>
          </div>

          {/* Current Hash */}
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-700">
              <span className="text-blue-600">Hash:</span>
            </p>
            {/* TODO: Show current hash */}
            <p className="text-xs font-mono text-gray-600 break-all">{latestBlock.hash}</p>
          </div>

          {/* Block Data */}
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-700">
              <span className="text-blue-600">Data:</span>
            </p>
            {/* TODO: Show data inside a styled container */}
            <p className="text-xs text-gray-800 bg-blue-100 p-2 rounded-md break-all">
              {latestBlock.data}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 text-sm">No block data available.</p>
      )}
    </div>
  );
};

export default GetLatestBlock;
