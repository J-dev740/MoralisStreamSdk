const Moralis=require('moralis').default
const { EvmChain }=require("@moralisweb3/common-evm-utils");
const express=require('express')
const app=express()
app.use(express.json())
const Abi= [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "contactInfo",
          "type": "uint256"
        }
      ],
      "name": "storeContact",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "contactNo",
          "type": "uint256"
        }
      ],
      "name": "Store",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "i_owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]


app.get('/createStream',async(req,res)=>{
        const stream = {
    //   chains: [EvmChain.ETHEREUM, EvmChain.POLYGON], // list of blockchains to monitor
    chains:[EvmChain.SEPOLIA],  
    description: "jithu's wallet", // your description
      tag: "jithu", // give it a tag
      webhookUrl: "https://a484-103-160-194-170.ngrok-free.app/user", // webhook url to receive events,

    //   includeNativeTxs: true,
      includeContractLogs:true,
      abi:Abi,
      topic0:["storeContact(string,uint256)"],
    //   advancedOptions:[
    // {   'topic0':'storeContact(string,uint256)',
    //     'filter':{
    //         'eq':['to','0x8051ccdceb36fd061d5f3962886b6878f23fd670']
    //     }
    // }
    //   ],
    };
    console.log('adding stream')
    const newStream = await Moralis.Streams.add(stream);
    const { id } = newStream.toJSON(); // { id: 'YOUR_STREAM_ID', ...newStream }
    
    // Now we attach bobs address to the stream 
    const address = "0xb77fA9E3E251F434573972429EDfbaBD755A9d09";
    //address can also be an array of values also
    
    await Moralis.Streams.addAddress({ address, id });

    return res.status(200).json(newStream)
})


Moralis.start({
    apiKey: "A6CVKVbj1p09xu0aelPmTsMQWNtF33P2AYLYwvqMY4jUQGNJY0jROu6s3zlxJ4CS",
  }).then(()=>{
    app.listen(5000,()=>{
        console.log('started listening on port 5000')
    })
  })
