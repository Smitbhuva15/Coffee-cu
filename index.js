import { createWalletClient, custom } from "https://esm.sh/viem";

const connectButton = document.getElementById("connectButton");

let walletClient;

async function coonectFun() {
    if (window.ethereum !== "undefined") {

        walletClient = createWalletClient({
            transport: custom(window.ethereum),
        });

        await walletClient.requestAddresses();
        connectButton.innerHTML = "connected";


    } else {
        connectButton.innerHTML = "Please install MetaMask!";
    }
}

connectButton.onclick = coonectFun;