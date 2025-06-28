# ☕ Coffee-Cu: A Blockchain-Powered Tipping Web App 

### Coffee-Cu is a full-stack decentralized web application that allows users to support creators or developers by sending them small Amount of ETH  — just like "buying a coffee."

- Built with  Solidity, Foundry, JavaScript and MetaMask integration, this app enables users to connect their wallets, send ETH payments, check contract balances, and withdraw funds — all on the Ethereum blockchain.

## 🦊 Connect with MetaMask and Send Request

```
        walletClient = createWalletClient({
            transport: custom(window.ethereum),
        });

        walletClient.requestAddresses();

```

## 💸 Pay to Buy Coffee

```
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
 ``` 

 ## 📊 View Contract Balance

 ```
 if (window.ethereum !== "undefined") {
        publicClient = createPublicClient({
            transport: custom(window.ethereum)
        })
        const balance = await publicClient.getBalance({
            address: contractAddress,

        })
        console.log("Balance:", formatEther(balance));

    }
    else {
        balanceButton.innerHTML = "Please install MetaMask!";
    }
```

## 🔐 Withdraw All Funds (Owner Only)

``` 
  walletClient = createWalletClient({
        transport: custom(window.ethereum)
    })

    const [connectedAccount] = await walletClient.requestAddresses()

    const currentChain = await getCurrentChain(walletClient);


    publicClient = createPublicClient({
        transport: custom(window.ethereum)
    });

    const { request } = await publicClient.simulateContract({
        address: contractAddress,
        abi: abi,
        functionName: "withdraw",
        account: connectedAccount,
        chain: currentChain,

    })

    const hash = await walletClient.writeContract(request);
    console.log("withdraw Transaction Hash:", hash);
``` 

