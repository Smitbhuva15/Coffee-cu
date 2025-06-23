import { createWalletClient, custom ,createPublicClient} from "https://esm.sh/viem";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");

let walletClient;
let publicClient;

async function coonectFun() {
    if (window.ethereum !== "undefined") {

       // connect to MetaMask
       walletClient = createWalletClient({
            transport: custom(window.ethereum),
        });

        await walletClient.requestAddresses();
        connectButton.innerHTML = "connected";


    } else {
        connectButton.innerHTML = "Please install MetaMask!";
    }
}

const fundFun=()=>{
    if(window.ethereum !== "undefined") {

        // connect to MetaMask 
        walletClient=createWalletClient({
            transport: custom(window.ethereum)
        })
        walletClient.requestAddresses()

       publicClient=createPublicClient({
            transport: custom(window.ethereum)
       })

       publicClient.simulateContract({
           
       })


    }
    else{
        fundButton.innerHTML = "Please install MetaMask!";
    }
}

connectButton.onclick = coonectFun;

fundButton.onclick=fundFun