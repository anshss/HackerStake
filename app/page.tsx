"use client";
import { useEffect, useState } from "react";
import { DynamicWidget } from "../lib/dynamic";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {
    fetchCreditScore,
    createAttestation,
    generateBorrowLimit,
    fetchBorrowedAmount,
    repayLoan,
    borrowLoan,
} from "../utils";
import axios from "axios";

export default function Home() {
    const [isBorrowClicked, setIsBorrowClicked] = useState(true);
    const [walletAddress, setWalletAddress] = useState(false);
    const [creditScore, setCreditScore] = useState("");
    const [githubAccContributions, setGithubAccContributions] = useState(0);

    const { user, isAuthenticated, primaryWallet } = useDynamicContext();

    useEffect(() => {
        // console.log("hehe", primaryWallet);
    }, [primaryWallet]);

    useEffect(() => {
        let x: any = user?.verifiedCredentials[0].address;
        // console.log("user", user);
        setWalletAddress(x);
    }, [user]);

    function FirstPage() {
        const [githubUsername, setGithubUsername] = useState("");
        const [githubChartImg, setGithubChartImg] = useState("");
        const [isScoreLoading, setIsScoreLoading] = useState(false);
        const [formInput, setFormInput] = useState({
            panCard: "",
        });

        useEffect(() => {
            let x: any = user?.verifiedCredentials[2].oauthUsername;
            setGithubUsername(x);
        }, [isAuthenticated, user]);

        useEffect(() => {
            if (githubUsername !== "") {
                fetchGitHub();
            }
        }, [githubUsername]);

        async function fetchGitHub() {
            try {
                let x = await axios.get(
                    `https://github-contributions-api.deno.dev/${githubUsername}.json`
                );
                let y = await axios.get(
                    `https://github-contributions-api.deno.dev/${githubUsername}.svg`
                );
                setGithubAccContributions(x.data.totalContributions);
                setGithubChartImg(y.data);
            } catch (error) {
                console.log(error);
            }
        }

        async function getCreditScore() {
            setIsScoreLoading(true);
            const data: any = await fetchCreditScore(formInput.panCard);
            setCreditScore(data);
            await createAttestation(creditScore, walletAddress);
            setIsScoreLoading(false);
        }

        async function clickedBorrow() {
            setIsBorrowClicked(true);
        }

        return (
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Borrow your staking{" "}
                        <span className="text-green-500">funds</span>, happy
                        hacking!
                    </h1>
                    <div>
                        {walletAddress ? (
                            <div className="flex flex-col gap-3 mb-8">
                                <DynamicWidget />
                                <p>Address: {walletAddress}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 mb-8">
                                <p className="font-bold">Connect your wallet</p>
                                <DynamicWidget />
                            </div>
                        )}
                    </div>
                    {isAuthenticated ? (
                        <div className="flex flex-col gap-4">
                            {creditScore === "" ? (
                                <div className="flex flex-row gap-3 mb-6 items-center">
                                    <input
                                        className="text-gray-500 placeholder-gray-500 bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter Pan Card"
                                        onChange={(e) =>
                                            setFormInput({
                                                ...formInput,
                                                panCard: e.target.value,
                                            })
                                        }
                                    />

                                    <button
                                        className="bg-gray-900 text-white rounded-md px-4 py-2 border border-transparent hover:border-white"
                                        onClick={getCreditScore}
                                    >
                                        Fetch Score
                                    </button>
                                </div>
                            ) : (
                                <p>Credit Score: {creditScore}</p>
                            )}
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col items-start gap-3 mb-6">
                                    <p>Github: {githubUsername}</p>
                                    <p>
                                        Contributions: {githubAccContributions}
                                    </p>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: githubChartImg,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <button
                                    className="bg-green-500 text-black rounded-md px-4 py-2 border border-transparent hover:bg-green-800 transition ease-in duration-200"
                                    onClick={clickedBorrow}
                                >
                                    Go to Dashboard
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <iframe
                                src="https://giphy.com/embed/o9BmBAEtyvMXzfZuGn"
                                width="480"
                                height="480"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    function SecondPage() {
        const [borrowLimit, setBorrowLimit] = useState(20);
        const [borrowedAmount, setBorrowedAmount] = useState(0);
        const [isLoadingDetails, setIsLoadingDetails] = useState(false);
        const [formInput, setFormInput] = useState({
            borrowAmount: "",
            repayAmount: "",
        });

        useEffect(() => {
            fetchDetails();
        }, []);

        async function fetchDetails() {
            setIsLoadingDetails(true);
            const borrowL: any = await generateBorrowLimit(
                creditScore,
                githubAccContributions
            );
            const borrowA: any = await fetchBorrowedAmount(user);
            setBorrowLimit(borrowL);
            setBorrowedAmount(borrowA);
            setIsLoadingDetails(false);
        }

        async function borrowLoanCall() {
            await borrowLoan(formInput.borrowAmount);
        }

        async function repayLoanCall() {
            await repayLoan(formInput.repayAmount);
        }

        return (
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Borrow your staking{" "}
                        <span className="text-green-500">funds</span>, happy
                        hacking!
                    </h1>
                    <div>
                        {walletAddress ? (
                            <div className="flex flex-col gap-3 mb-8">
                                <DynamicWidget />
                                <p>Address: {walletAddress}</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 mb-8">
                                <p className="font-bold">Connect your wallet</p>
                                <DynamicWidget />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-4 mb-8">
                        {isLoadingDetails ? (
                            <p>Loading..</p>
                        ) : (
                            <p>Borrow Limit: {borrowLimit} USDT</p>
                        )}
                        {isLoadingDetails ? (
                            <p>Loading..</p>
                        ) : (
                            <p>Borrowed Amount: {borrowedAmount} USDT</p>
                        )}
                    </div>

                    <div className="flex flex-row gap-3 mb-6 items-center">
                        <input
                            className="text-gray-500 placeholder-gray-500 bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter USDT Amount"
                            onChange={(e) =>
                                setFormInput({
                                    ...formInput,
                                    borrowAmount: e.target.value,
                                })
                            }
                        />

                        <button
                            className="w-[6rem] bg-green-500 text-black rounded-md px-4 py-2 border border-transparent hover:border-white"
                            // onClick={() => borrowLoan(primaryWallet)}
                            onClick={borrowLoanCall}
                        >
                            Borrow
                        </button>
                    </div>
                    <div className="flex flex-row gap-3 mb-6 items-center">
                        <input
                            className="text-gray-500 placeholder-gray-500 bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter USDT Amount"
                            onChange={(e) =>
                                setFormInput({
                                    ...formInput,
                                    repayAmount: e.target.value,
                                })
                            }
                        />

                        <button
                            className="w-[6rem] bg-green-500 text-black rounded-md px-4 py-2 border border-transparent hover:border-white"
                            onClick={repayLoanCall}
                        >
                            Repay
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return <div>{isBorrowClicked ? <SecondPage /> : <FirstPage />}</div>;
}
