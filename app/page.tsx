"use client";
import { useEffect, useState } from "react";
import { DynamicWidget } from "../lib/dynamic";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { generateBorrowLimit, createAttestation } from "../utils";
import axios from 'axios';  

export default function Home() {
    const [creditScore, setCreditScore] = useState("");
    const [githubUsername, setGithubUsername] = useState("");
    const [githubAccContributions, setGithubAccContributions] = useState(0);
    const [githubChartImg, setGithubChartImg] = useState("");
    const [isBorrowClicked, setIsBorrowClicked] = useState(false);
    const [walletAddress, setWalletAddress] = useState(false);

    const { user, isAuthenticated } = useDynamicContext();
    // const walletAddress = user?.verifiedCredentials[0].address;

    useEffect(() => {
        let x: any = user?.verifiedCredentials[0].address;
        setWalletAddress(x);
    }, [user])

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
        setCreditScore("809");
        await createAttestation(creditScore, walletAddress);
    }

    async function clickedBorrow() {
        await generateBorrowLimit(creditScore, githubAccContributions);
        setIsBorrowClicked(true)

    }

    function FirstPage() {
        return(
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Borrow your staking <span className="text-green-500">funds</span>, happy hacking!
                </h1>
                <div>
                    {walletAddress ?
                        <div className="flex flex-col gap-3 mb-8">
                            <DynamicWidget />
                            <p>Address: {walletAddress}</p>
                        </div>
                        :
                        <div className="flex flex-col gap-3 mb-8">
                            <p className="font-bold">Connect your wallet</p>
                            <DynamicWidget />
                        </div>
                    }
                </div>
                {isAuthenticated ? (
                    <div className="flex flex-col gap-4">
                        {creditScore === "" ? (
                            <div className="flex flex-row gap-3 mb-6 items-center">
                                <input
                                    className="text-gray-500 placeholder-gray-500 bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter Pan Card"
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
                                <p>Contributions: {githubAccContributions}</p>
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
                                Borrow
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
        )
    }

    function SecondPage() {
        return (
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold text-center mb-6">
                        Borrow your staking <span className="text-green-500">funds</span>, happy hacking!
                    </h1>
                    <div className="flex flex-col gap-3 mb-8">
                        <p className="font-bold">Connect your wallet</p>
                        <DynamicWidget />
                        {walletAddress && <p>Address: {walletAddress}</p>}
                    </div>
                    <div className="flex flex-col gap-4">
                        <p>Amount: 1000</p>
                        <p>Interest: 10%</p>
                        <p>Duration: 30 days</p>
                        <p>Repayment: 1100</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            className="bg-green-500 text-black rounded-md px-4 py-2 border border-transparent hover:bg-green-800 transition ease-in duration-200"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            {isBorrowClicked ? <SecondPage /> : <FirstPage />}
        </div>
    );
}
