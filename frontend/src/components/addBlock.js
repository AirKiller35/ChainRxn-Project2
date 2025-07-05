import { useState } from "react";
import axios from "axios";

const AddBlock = () => {
  // State to store user input for block data
  const [blockData, setBlockData] = useState("");

  // State to store messages (success/failure)
  const [blockMsg, setBlockMsg] = useState("");

  // Loading state to show spinner or disable button
  const [loading, setLoading] = useState(false);

  // Update blockData when input field changes
  const handleDataInput = (e) => {
    // TODO: Set blockData state to the current input value
    setBlockData(e.target.value);
  };

  // Function to send block data to backend and add block
  const handleAddBlock = async () => {
    // If input is empty, show warning message
    // TODO: If blockData is empty, setBlockMsg to a warning and return early
    if(!blockData.trim()){
      setBlockMsg("ERROR: please enter some data to add a new block");
      return;
    }
    // TODO: Set loading state to true and clear any old messages
    setLoading(true);
    setBlockMsg("");
    try {
      // TODO:
      // - Make a POST request to backend at /addBlock
      // - Send blockData in the request body as { data: blockData }
      // - Await the response
      const response = await axios.post("http://localhost:3005/addBlock", {data: blockData});

      const { block } = response.data;

      // TODO:
      // - Get the block hash from response
      // - Truncate it to first 7 characters and append "..."
      // - Format a message like: "Block added successfully! Block Hash: ..."
      const truncatedHash = block.hash.slice(0,7) + "...";
      const msg = `Block added successfully!\nBlock Hash: ${truncatedHash}`;
      setBlockMsg(msg);
      // - Set this message in blockMsg state
    } catch (error) {
      // TODO: Set an error message in blockMsg if request fails
      console.error("Error adding block: ", error);
      setBlockMsg("ERROR: failed to add the block! try again after some time")
    } finally {
      // TODO: Set loading state to false
      setLoading(false)
    }
  };

  return (
    <div className="mb-10 mt-5 bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Add New Block
        </h1>

        {/* Input for block data */}
        <input
          type="text"
          placeholder="Enter text data for the block"
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={blockData}
          onChange={handleDataInput} // TODO: Call input handler
        />

        {/* Button to add block */}
        <button
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
          onClick={handleAddBlock} // TODO: Call add block handler
          disabled={loading}
        >
          {loading ? "Mining new Block..." : "Add Block"}
        </button>

        {/* Message box for success/failure output */}
        {blockMsg && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-300 rounded-lg text-center shadow-md w-full max-w-full break-words overflow-auto">
            <p className="text-sm font-semibold text-gray-700 whitespace-pre-wrap break-words">
              {blockMsg}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBlock;
