const sha256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, prevHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calcHash();
    }

    // TODO: Implement a method that calculates the SHA256 hash of the block's contents
    // Hint:
    // - Use this.index, this.timestamp, this.prevHash, and JSON.stringify(this.data)
    // - Concatenate them into a single string and apply sha256 hashing
    // - Convert the result to string using .toString()
    calcHash() {
        const toBeHashed = JSON.stringify([this.index, this.timestamp, this.prevHash]);
        return sha256(toBeHashed).toString();
    }
}

module.exports = Block;
