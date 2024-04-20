"use client";
import { useEffect, useState } from "react";
import { DynamicWidget } from "../lib/dynamic";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import axios from 'axios';  

export default function Home() {
    const [card, setCard] = useState(false);
    const [githubAcc, setGithubAcc] = useState(false);
    const [githubAccContri, setGithubAccContri] = useState();
    const [githubAccImg, setGithubAccImg] = useState("");

    const { user, isAuthenticated } = useDynamicContext();
    const walletAddress = user?.verifiedCredentials[0].address;

    useEffect(() => {
        if (isAuthenticated && user) {
            let x : any = user?.verifiedCredentials[2].oauthUsername;
            setGithubAcc(x);
        }
        fetchGitHub()
    }, [isAuthenticated])

    async function fetchGitHub() {
        let x = await axios.get(`https://github-contributions-api.deno.dev/${githubAcc}.json`);
        let y = await axios.get(`https://github-contributions-api.deno.dev/${githubAcc}.svg`);
        setGithubAccContri(x.data.totalContributions)
        setGithubAccImg(y.data)
        console.log(githubAccImg)
        console.log(x.data.totalContributions)
    }

    async function getCreditScore() {}

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col gap-4">
            <h1 className="flex flex-col items-start gap-2 text-2xl font-bold text-center">Borrow your staking funds, happy hacking!</h1>
                <div>
                    <p>Connect your wallet</p>
                    <DynamicWidget />
                    <p>{walletAddress && <span>Address: {walletAddress}</span>}</p>
                </div>
                <div className="flex flex-col items-start gap-2">
                    <p>Enter Pan Card</p>
                    <input className="text-gray-500 placeholder-gray-400 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-#1B1D22" />

                    <button
                        className="bg-[#1B1D22] text-white rounded-md px-4 py-2 border border-transparent hover:border-white"
                        onClick={getCreditScore}
                    >
                        Fetch Score
                    </button>
                </div>
                <div>
                {/* <button
                        className="bg-[#1B1D22] text-white rounded-md px-4 py-2 border border-transparent hover:border-white"
                        onClick={fetchGitHub}
                    >
                        Fetch GitHub
                    </button> */}
                    { isAuthenticated && <div>
                        <p>Github: {githubAcc}</p>
                        <p>Contributions: {githubAccContri}</p>
                        <div dangerouslySetInnerHTML={{ __html: githubAccImg }} />
                    </div>}
                </div>
            </div>
        </main>
    );
}
