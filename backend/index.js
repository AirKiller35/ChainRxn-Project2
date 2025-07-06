const express = require('express');
const Block = require('./blockchain/Block.js');
const Chain = require('./blockchain/Chain.js');
const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 3005;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Initialize a new blockchain instance
let chain = new Chain();

// Root route: basic test endpoint
app.get('/', (req, res) => {
    // TODO: Respond with a simple message like "blockchain home page"
    res.send("blockchain home page");
});

// Route to add a new block to the chain
app.post('/addBlock', (req, res) => {
    const { data } = req.body;

    if(!data){
        return res.status(400).json({error: "'data' field is empty and is required" });
    }

    let latestBlock = chain.getLatestBlock();
    let newIndex = latestBlock.index + 1;
    let newTimestamp = Date.now().toString();
    let prevHash = latestBlock.hash;
    const newBlock = new Block(newIndex, newTimestamp, data, prevHash);
    chain.addBlock(newBlock);
    
    res.status(200).json({
        message: "Block successful added",
        block: newBlock
    });
});

app.get('/getChain', (req, res) => {
    res.status(200).json(chain.chain);
});

// Route to get the latest block in the chain
app.get('/getLatestBlock', (req, res) => {
    // TODO: Respond with the result of chain.getLatestBlock()
    try{
        res.status(200).json(chain.getLatestBlock());
    } catch (err) {
        console.error("ERROR: error in /getLatestBlock: ", err);
        res.status(500).json({error: "internal server error"});
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    // TODO: Log a message saying the blockchain API is running and on which port
    console.log(`Blockchain API is running on http://localhost:${port}`);
});
