const Block = require('./Block.js');

class Chain {

    createGenesisBlock() {
        const block = new Block(0, Date.now(), "this is a genesis block", "0");
        return block;
    }

    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    getLatestBlock() {
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock) {
        newBlock.prevHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calcHash();
        this.chain.push(newBlock);
    }

    isValidChain() {
      const genesis = this.createGenesisBlock();
      const first = this.chain[0];

      if(
        genesis.index !== first.index ||
        genesis.hash !== first.hash ||
        genesis.data !== first.data
      ){
        return false;
      }

      for(let i = 1 ; i < this.chain.length ; i++){
        let currentBlock = this.chain[i];
        let prevBlock = this.chain[i-1];

        if((currentBlock.prevHash !== prevBlock.hash) || (currentBlock.hash !== currentBlock.calcHash())){
          console.log("chain is invalid from block no" + i);
          return false;
        }
      }
     
      return true;
    }
}

module.exports = Chain;
