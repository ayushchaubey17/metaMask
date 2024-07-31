// index.js

document.getElementById('connectButton').addEventListener('click', async () => {
    const account = await requestAccount();
    if (account) {
        document.getElementById('getBalanceButton').disabled = false;
        document.getElementById('sendTransactionButton').disabled = false;
        document.getElementById('account').innerText = `Connected account: ${account}`;
    }
});

document.getElementById('getBalanceButton').addEventListener('click', async () => {
    const account = document.getElementById('account').innerText.replace('Connected account: ', '');
    if (account) {
        await getBalance(account);
    }
});

document.getElementById('sendTransactionButton').addEventListener('click', async () => {
    await sendTransaction();
});

async function requestAccount() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            window.provider = provider;
            window.signer = signer;
            return accounts[0];
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        console.log('MetaMask is not installed');
    }
}

async function getBalance(address) {
    if (window.provider) {
        const balance = await window.provider.getBalance(address);
        console.log('Balance:', ethers.utils.formatEther(balance));
    }
}

async function sendTransaction() {
    if (window.signer) {
        try {
            const tx = await window.signer.sendTransaction({
                to: '0xrecipientAddressHere', // Replace with recipient address
                value: ethers.utils.parseEther('0.01') // Amount to send in Ether
            });
            console.log('Transaction hash:', tx.hash);
        } catch (error) {
            console.error('Transaction failed:', error);
        }
    }
}
