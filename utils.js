import signProtocol from "@ethsign/sp-sdk";
import web3modal from "web3modal";
import { ethers } from "ethers";
import { contractAddress, contractAbi } from "./config";

let attestationId = 12;

export async function getSmartContract(providerOrSigner) {
    const modal = new web3modal();
    const connection = await modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
    );
    if (providerOrSigner == true) {
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
        );
        return contract;
    }
    return contract;
}

export async function fetchCreditScore(user) {
    return 808;
}

export async function createAttestation(creditScore, walletAddress) {
    try {
        const attestation = await signProtocol.createAttestation({
            schemaName: "CreditScore",
            data: {
                creditScore: creditScore,
                walletAddress: walletAddress,
            },
            subject: walletAddress,
            metadata: {
                issuer: "user",
                createdAt: new Date(),
            },
        });
        console.log("Attestation created successfully:", attestation);
        return attestation;
    } catch (error) {
        console.error("Error creating attestation:", error);
        throw error;
    }
}

export async function generateBorrowLimit(creditScore, githubAccContributions) {
    async function getCreditScore() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(creditScore);
            }, 1000);
        });
    }

    async function getGitHubContributions() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(githubAccContributions);
            }, 1000);
        });
    }

    const creditScoreResult = await getCreditScore();
    const githubContributionsResult = await getGitHubContributions();

    let borrowLimit = 0;

    if (creditScoreResult >= 700 && creditScoreResult < 800) {
        borrowLimit = 10;
    } else if (creditScoreResult >= 800 && creditScoreResult < 900) {
        borrowLimit = 20;
    } else if (creditScoreResult >= 900) {
        borrowLimit = 30;
    }

    return borrowLimit * githubContributionsResult;
}

export async function getUserAddress() {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    return accounts[0];
}


export async function fetchBorrowedAmount() {
    const contract = await getSmartContract();
    const user = await getUserAddress();
    const data = await contract.borrowedAmount(user.toString());
    const da = ethers.utils.formatEther(data);
    console.log("borrowed amount", da);
    return da;
}

export async function borrowLoan(borrowAmount) {
    const contract = await getSmartContract(true);
    const amount = ethers.utils.parseEther(borrowAmount);
    const tx = await contract.borrowAmount(amount, attestationId);
    await tx.wait;
    console.log("loan borrowed");
}

export async function repayLoan(repayAmount) {
    const contract = await getSmartContract(true);
    const amount = ethers.utils.parseEther(repayAmount);
    const tx = await contract.repayAmount(amount);
    await tx.wait;
    console.log("load repayed");
}
