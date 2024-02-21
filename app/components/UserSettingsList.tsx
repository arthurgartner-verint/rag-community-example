import AnimatedButton from "./AnimatedButton";
import { Form } from "@remix-run/react";

const UserSettingsList: React.FC = () => {

    return <div className="shadow-lg min-w-[500px] bg-white p-5">
        <div>
            <div className="flex justify-between mb-3">
                <div>
                    <div className="text-[1.5rem] font-semibold">
                        User Options
                    </div>
                    <div className="text-[.9rem] font-semibold text-neutral-400">
                        Configure options here
                    </div>
                </div>
            </div>
        </div>
        <Form method="post" action="/api/update-settings">
            <div className="space-y-3">
                <div>
                    <label htmlFor="communityUrl" className="block text-sm font-medium text-gray-700">Community URL</label>
                    <input type="text" id="communityUrl" name="communityUrl" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm" placeholder="Enter the Community URL here." />
                </div>
                <div>
                    <label htmlFor="communityAPIKey" className="block text-sm font-medium text-gray-700">Community API Key</label>
                    <input type="password" id="communityAPIKey" name="communityAPIKey" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm" placeholder="Enter your Community API key here." />
                </div>

                <div>
                    <label htmlFor="OpenAPIKey" className="block text-sm font-medium text-gray-700">OpenAI API Key</label>
                    <input type="password" id="OpenAPIKey" name="OpenAPIKey" className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm" placeholder="Enter your OpenAI API key here." />
                </div>
                <div className="w-full text-end">
                    <AnimatedButton text="Update" disabled={false} />
                </div>

            </div>
        </Form>
    </div>
}
export default UserSettingsList;