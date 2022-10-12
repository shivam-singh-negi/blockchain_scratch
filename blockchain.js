const Block=require('./block');
const cryptoHash = require('./crypto-hash');
class BlockChain{
constructor(){
    this.chain=[Block.genesis()];}


addBlock({data}){  // to add one block to the current blockcahin
    const newBlock=Block.mineBlock({
        prevBlock:this.chain[this.chain.length-1],
        data,
    });
    this.chain.push(newBlock);
}




replaceChain(chain){// to select the longest chain

if(chain.length<=this.chain.length){console.error("This incoming chain in not longer"); return;}
if(!BlockChain.isvalidChain(chain)){
    console.error("The incoming chain is not valid");
    return;

}
this.chain=chain;

}






static isvalidChain(chain){ // to validate the current chain
    if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())) {return false;}
    for(let i=1;i<chain.length;i++){
        const{timestamp, prevHash, hash ,data,nonce,difficulty}=chain[i];
        const lastDifficulty=chain[i-1].difficulty;
        const realLastHash=chain[i-1].hash;
        if(prevHash!==realLastHash) return false; 
        const validatedHash=cryptoHash(timestamp,prevHash,nonce, difficulty,data);
        if(hash!==validatedHash) return false;
        if(Math.abs(lastDifficulty-difficulty)>1) return false;
    }
    return true;
}
}

const blockchain=new BlockChain();
blockchain.addBlock({data:"block1"});
blockchain.addBlock({data:"block2"});
blockchain.addBlock({data:"block3"});
blockchain.addBlock({data:"block5"});

// const result=BlockChain.isvalidChain(blockchain.chain);
// console.log(blockchain.chain);

// console.log(result);
module.exports=BlockChain;