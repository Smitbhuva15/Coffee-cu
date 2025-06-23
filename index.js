import {
    createWalletClient, custom, parseEther,
    defineChain,
    createPublicClient,
} from "https://esm.sh/viem";
import { contractAddress, abi } from "./constant-js.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const ethValueInput = document.getElementById("ethAmount");

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

const fundFun = async () => {
    if (window.ethereum !== "undefined") {

        // connect to MetaMask 
        walletClient = createWalletClient({
            transport: custom(window.ethereum)
        })
        const [connectedAccount] = await walletClient.requestAddresses()
        const currentChain = await getCurrentChain(walletClient);
        const ethValue = ethValueInput.value;

        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })

        // call the fund function of the contract
     try {
    const { request } = await publicClient.simulateContract({
        address: contractAddress,
        abi: abi,
        functionName: "fund",
        account: connectedAccount,
        chain: currentChain,
        value: parseEther(ethValue),
    });
    const hash = await walletClient.writeContract(request);
    console.log("Transaction Hash:", hash);
} catch (error) {
    console.error("Transaction Failed:", error.message || error);
    fundButton.innerHTML = "Transaction Failed";
}



    }
    else {
        fundButton.innerHTML = "Please install MetaMask!";
    }
}

async function getCurrentChain(client) {
    const chainId = await client.getChainId()
    const currentChain = defineChain({
        id: chainId,
        name: "Custom Chain",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: {
            default: {
                http: ["http://localhost:8545"],
            },
        },
    })
    return currentChain
}


connectButton.onclick = coonectFun;

fundButton.onclick = fundFun