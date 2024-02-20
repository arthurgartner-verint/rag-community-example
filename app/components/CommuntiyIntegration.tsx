import { Fetcher, useLoaderData } from "@remix-run/react"; import { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import { loader } from "~/routes/_index";


const CommunityIntegration: React.FC = () => {
    const { communityUrl } = useLoaderData<typeof loader>();

    const fetcher = useFetcher();

    useEffect(() => {
        fetcher.load('/api/status')
    }, [])

    return <div className="shadow-lg w-fit p-5 rounded-lg w-full">
        <div className="flex justify-between">
            <div className="text-[1.5rem] font-semibold">
                Community Integration
            </div>
        </div>

        <div className="flex flex-wrap">
            <div className="w-1/3 text-xl">
                Community URL: <div className={`inline-block h-[.7rem] w-[.7rem] bg-green-400 rounded-full`} /> {communityUrl}
            </div>
            <div className="w-1/3 text-xl">
                API Key: <div className="inline-block h-[.7rem] w-[.7rem] bg-neutral-300 rounded-full" /> Valid
            </div>
            <div className="w-1/3 text-xl">
                API Search Scope: <div className="inline-block h-[.7rem] w-[.7rem] bg-neutral-300 rounded-full" /> Valid
            </div>
        </div>
    </div>

}

export default CommunityIntegration