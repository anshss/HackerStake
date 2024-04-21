
// const signProtocol = require('sign-protocol-sdk');


export async function fetchCreditScore(user) {
    return 808
}

export async function createAttestation(creditScore, walletAddress) {
    
        try {
          const attestation = await signProtocol.createAttestation({
            schemaName: "CreditScore",
            data: {
              creditScore: creditScore,
              walletAddress: walletAddress
            },
            subject: walletAddress,
            metadata: {
              issuer: "user",
              createdAt: new Date()
            }
          });
          console.log('Attestation created successfully:', attestation);
          return attestation;
        } catch (error) {
          console.error('Error creating attestation:', error);
          throw error;
    }
   }


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

    return borrowLimit * (githubContributionsResult );
}



export async function fetchBorrowedAmount(user) {}

export async function borrowLoan(borrowAmount) {}

export async function repayLoan(repayAmount) {}