const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(timesptamp, lastHash, hash, data) {
        this.timesptamp = timesptamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
    }

    toString() {
        return `Block -
            Timestamp: ${this.timesptamp}
            Last Hash: ${this.lastHash.substring(0, 10)}
            Hash:      ${this.hash.substring(0, 10)}
            Data:      ${this.data}`
    }

    static genesis() {
        return new this('Genesis time', '-----', 'f1r57-h45h', [])
    }

    static mineBlock(lastBlock, data) {
        const timesptamp = Date.now()
        const lastHash = lastBlock.hash
        const hash = Block.hash(timesptamp, lastHash, data)

        return new this(timesptamp, lastHash, hash, data)
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString()
    }

    static blockHash(block) {
        const { timesptamp, lastHash, data} = block
        return Block.hash(timesptamp, lastHash, data)
    }
}

module.exports = Block