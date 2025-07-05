const Block = require('./Block.js');

// Chain represents the blockchain itself – a list of linked blocks
class Chain {

    // Create the first block in the chain (the Genesis Block)
    createGenesisBlock() {
        // TODO: Return a new Block instance with:
        // - index = 0
        // - timestamp = current time (Date.now())
        // - data = "This is a genesis block"
        // - prevHash = "0"
        const block = new Block(0, 1620000000000, "this is a genesis block", "0");
        return block;
    }

    constructor() {
        // Initialize the chain with just the genesis block
        this.chain = [this.createGenesisBlock()];
    }

    // Get the most recently added block in the chain
    getLatestBlock() {
        // TODO: Return the last block in the chain array
        return this.chain[this.chain.length()-1];
    }

    // Add a new block to the chain
    addBlock(newBlock) {
        // TODO:
        // 1. Set the new block's prevHash to the hash of the latest block
        // 2. Recalculate the new block's hash (in case the prevHash changed)
        // 3. Push the new block into the chain

        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calcHash();
        this.chain.push(newBlock);
    }

    // Check if the current blockchain is valid
    isValidChain() {
        // TODO:
        // 1. Check if the first block is the same as a freshly created genesis block
        //    - Use JSON.stringify to compare both blocks
        // 2. Iterate through the chain (starting from index 1) and for each block:
        //    - Check if current block's prevHash matches previous block's hash
        //    - Check if current block's hash is still valid using calcHash()

        // Return true if all checks pass, false otherwise
        if(JSON.stringify(this.chain[0]) === JSON.stringify(this.createGenesisBlock())){
            for(let i = 1 ; i < this.chain.length() ; i++){
                let currentBlock = this.chain[i];
                let prevBlock = this.chain[i-1];
                if((currentBlock.prevHash !== prevBlock.hash) || (currentBlock.hash !== currentBlock.calcHash())){
                    console.log("chain is invalid from block no" + i+1);
                    break;
                }
            }
        }
    }
}

module.exports = Chain;
