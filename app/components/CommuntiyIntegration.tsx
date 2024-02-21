import { Fetcher, useLoaderData } from "@remix-run/react"; import { FormEvent, useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import { loader } from "~/routes/_index";
import AnimatedButton from "./AnimatedButton";
import { checkFetchResponseOk } from "~/util/helperfunctions";


const CommunityIntegration: React.FC = () => {
    const { communityUrl, communityApiKeyExists } = useLoaderData<typeof loader>();
    const [siteStatus, setSiteStatus] = useState<boolean | null>(null);
    const [isCommunityKeyExists, setIsCommunityKeyExists] = useState<boolean | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [checkingSite, setCheckingSite] = useState(false)

    const handleUrlCheckClick = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCheckingSite(true);
        const isOk = await checkFetchResponseOk(inputValue);
        console.log(isOk);
        setSiteStatus(isOk);
        setCheckingSite(false);
    };


    return <div>
        <div>
            <div>
                <form onSubmit={handleUrlCheckClick}>
                    <div>
                        <div className={`inline-block h-[.7rem] w-[.7rem] ${siteStatus == null ? "bg-yellow-400" : siteStatus == true ? "bg-green-400" : "bg-red-400"} rounded-full`} />
                        <label htmlFor="communityUrl" className="block text-sm font-medium text-gray-700">Community URL</label>
                        <div className="flex space-x-2">
                            <input type="text" id="communityUrl" name="communityUrl" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Enter the Community URL here." />
                            <AnimatedButton handleClick={() => handleUrlCheckClick} disabled={checkingSite} text="Check" />
                        </div>

                    </div>

                </form>
                {/* // Community URL: <div className={`inline-block h-[.7rem] w-[.7rem] ${siteStatus == null ? "bg-yellow-400" : siteStatus == true ? "bg-green-400" : "bg-red-400"} rounded-full`} /> {communityUrl} */}
            </div>
        </div >
        {/* <div className="w-1/3 text-xl">
            API Key: <div className={`inline-block h-[.7rem] w-[.7rem] ${isCommunityKeyExists == null ? "bg-yellow-400" : siteStatus == true ? "bg-green-400" : "bg-red-400"} rounded-full`} /> Valid
        </div>
        <div className="w-1/3 text-xl">
            API Search Scope: <div className="inline-block h-[.7rem] w-[.7rem] bg-neutral-300 rounded-full" /> Valid
        </div> */}
    </div >

}

export default CommunityIntegration