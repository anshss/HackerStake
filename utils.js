
import signProtocol from '@ethsign/sp-sdk';


export async function fetchCreditScore(user) {
    return 808
}

export async function createAttestation(creditScore, walletAddress) {
    const res = await client.createAttestation({
        schemaId: "0x34",
        data: {
          creditScore,
          walletAddress
        },
      });
}
// const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
//     const res = await axios.request({
//       url,
//       headers: {
//         "Content-Type": "application/json; charset=UTF-8"
//       },
//       ...options
//     });
//     // throw API errors
//     if (res.status !== 200) {
//       throw new Error(JSON.stringify(res));
//     }
//     // return original response
//     return res.data;

// export async function makeAttestation(creditScore, walletAddress) {
//     const res = await client.makeAttestation({
//         schemaId: "0x34",
//         data: {
//           contractDetails,
//           signer
//         },
//         indexingValue: signer.toLowerCase()
//       });
// }

export async function generateBorrowLimit(creditScore, githubAccContributions) {
    async function getCreditScore() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(creditScore);
            }, 1000); 
        });
    }

    
    async function getGitHubContributions() {
        return new Promise(resolve => {
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

    return borrowLimit; 
}



export async function fetchBorrowedAmount(user) {}

export async function borrowLoan(borrowAmount) {}

export async function repayLoan(repayAmount) {}