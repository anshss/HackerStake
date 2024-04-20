"use client";
import { useEffect, useState } from "react";
import { DynamicWidget } from "../lib/dynamic";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import axios from 'axios';  

export default function Home() {
    const [creditScore, setCreditScore] = useState("");
    const [githubUsername, setGithubUsername] = useState("");
    const [githubAccContributions, setGithubAccContributions] = useState(0);
    const [githubChartImg, setGithubChartImg] = useState("");

    const { user, isAuthenticated } = useDynamicContext();
    const walletAddress = user?.verifiedCredentials[0].address;

    useEffect(() => {
        if (isAuthenticated && user) {
            let x : any = user?.verifiedCredentials[2].oauthUsername;
            setGithubUsername(x);
        }
        
    }, [isAuthenticated])

    useEffect(() => {
        fetchGitHub()
    }, [githubUsername])

    async function fetchGitHub() {
        let x = await axios.get(`https://github-contributions-api.deno.dev/${githubUsername}.json`);
        let y = await axios.get(`https://github-contributions-api.deno.dev/${githubUsername}.svg`);
        setGithubAccContributions(x.data.totalContributions)
        setGithubChartImg(y.data)
        // console.log(githubAccImg)
        // console.log(x.data.totalContributions)
    }

    async function getCreditScore() {
        setCreditScore("768")
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-center mb-[1.5rem]">Borrow your staking <span className="text-[#58df87]">funds</span>, happy hacking!</h1>
                <div className="flex flex-col gap-3 mb-[2rem]">
                    <p className="font-bold">Connect your wallet</p>
                    <DynamicWidget />
                    {walletAddress && <p>Address: {walletAddress}</p>}
                </div>
                { isAuthenticated ? 
                    <div className="flex flex-col gap-4">
                        { creditScore === "" ?
                            <div className="flex flex-row gap-3 mb-[1.5rem] items-center">
                                <input className="text-gray-500 placeholder-gray-500 bg-gray-100 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Enter Pan Card"
                                />
                                
                                    <button
                                        className="bg-[#1B1D22] text-white rounded-md px-4 py-2 border border-transparent hover:border-white"
                                        onClick={getCreditScore}
                                    >
                                        Fetch Score
                                    </button>
                            </div>
                            :
                            <p className="">Credit Score: {creditScore}</p>
                        }
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col items-start gap-3 mb-[1.5rem">
                                <p>Github: {githubUsername}</p>
                                <p>Contributions: {githubAccContributions}</p>
                                <div dangerouslySetInnerHTML={{ __html: githubChartImg }} />
                            </div>
                        </div> 
                        <div className="flex flex-col items-center">
                            <button
                                className="bg-[#58df87] text-black rounded-md px-4 py-2 border border-transparent hover:bg-[#1e4828]"
                                onClick={getCreditScore}
                            >
                                Borrow
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        <iframe src="https://giphy.com/embed/o9BmBAEtyvMXzfZuGn" width="480" height="480" allowFullScreen></iframe>
                    </div> 
                }
            </div>
        </div>
    );
}
