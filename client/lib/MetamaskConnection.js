let currentAccount;

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
        return accounts[0];
    }
}

export async function CheckIfWalletIsConnected(ethereum) {
    try {
        if (!ethereum) return alert("Metamask is either not installed or you haven't enabled it for this website.");

        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length) {
            return accounts[0];
        }
        else {
            console.log("No accounts found");
        }
    } catch (error) {
        console.log(error);
        throw new error("No ethereum object from Metamask");
    }
}

export async function ConnectWallet(ethereum, currentAcc) {
    if (!ethereum) return alert("Metamask is either not installed or you haven't enabled it for this website.");

    currentAccount = currentAcc;
    let account = ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged)
        .catch((err) => {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.');
            } else {
                console.error(err);
            }
        });
    return account;
}

