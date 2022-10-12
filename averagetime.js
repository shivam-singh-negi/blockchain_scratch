const BlockChain=require('./blockchain')
const blockchain=new BlockChain()

let prevTimeStamp,nextTimeStamp,nextBlock,timeDiff,averageTime;
const times=[];
blockchain.addBlock({data:'new data'});
for(let i=0;i<1000;i++){
    prevTimeStamp=blockchain.chain[blockchain.chain.length-1].timestamp;
    blockchain.addBlock({data:`block ${i}`});
    nextBlock=blockchain.chain[blockchain.chain.length-1];
    nextTimeStamp=nextBlock.timestamp;
    timeDiff=nextTimeStamp-prevTimeStamp;
    times.push(timeDiff);
    averageTime=times.reduce((total,num)=>total+num)/times.length;

    console.log(`Time to mine the given blocks:${timedDiff}ms,Difficulty:${nextBlock.difficulty},Average time:${averageTime}ms`);

}