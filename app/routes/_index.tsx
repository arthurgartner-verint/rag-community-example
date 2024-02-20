import { MetaFunction, json, ActionFunction, } from "@remix-run/node";
import { Form, useLoaderData, useNavigation, useFetcher } from "@remix-run/react";
import VerintLogo from "~/assets/verint_logo.png"
import OpenAI from 'openai'
import { useActionData } from "react-router";
import { motion } from "framer-motion";
import { get_encoding, encoding_for_model } from "tiktoken"
import ExecutionHistory from "~/components/ExecutionHistory";
import { calculate35TurboCostUSD } from "~/util/helperfunctions";
import LoadingIcon from "~/components/LoadingIcon";
import CommunityIntegration from "~/components/CommuntiyIntegration";

export const meta: MetaFunction = () => {
  return [
    { title: "Verint Community RAG Demo" },
    { name: "description", content: "RAG Demo" },
  ];
};

export const loader = async () => {
  const communityUrl = process.env.COMMUNITY_URL;

  return json({ communityUrl })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const query = formData.get('communityQuery')?.toString().trim();
  const keywordExtract = formData.get('keywordExtract') === 'on';
  const gptModel = "gpt-3.5-turbo"
  let tokensUsed = 0;

  if (keywordExtract && query) {
    const openai = new OpenAI({
      apiKey: process.env.OPANAPI_API_KEY,
    })

    const enc = encoding_for_model(gptModel);

    tokensUsed += enc.encode(query).length;

    try {
      const response = await openai.chat.completions.create({
        model: gptModel,
        messages: [{ role: 'user', content: `Extract the most important keywords from this text: "${query}". Only return a csv list of the kwywords, no other text.` }],
        temperature: 0.5
      })

      const keywords = response.choices[0].message.content?.split(',').map((keyword) => keyword.trim());

      return json({ keywords, gptModel, tokensUsed });

    } catch (error) {
      console.error('OpenAI error: ', error);
      return json(['Error processing your request']);
    }
  }

  return null;
}

export default function Index() {
  const actionData = useActionData();
  const navigation = useNavigation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  const colors = ['bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-yellow-200', 'bg-purple-200']


  return (
    <div className="p-[50px] h-[100vh] flex flex-col">
      <div>
        <div>
          <img src={VerintLogo} className="h-[2rem]" />
        </div>
        <div className="font-semibold text-[2rem]">
          Community RAG Demo
        </div>
        <div className="text-neutral-600">
          Demonstration of RAG within the Verint Community environment
        </div>
      </div>
      <div>
        <CommunityIntegration />
      </div>
      <div className="shadow-lg w-fit p-5 rounded-lg w-full">
        <div className="my-2">
          <div className="flex justify-between">
            <div className="text-[1.5rem] font-semibold">
              Community Integration
            </div>
            <div>
              {navigation.state != 'idle' && <LoadingIcon />}
            </div>
          </div>
          <div>
            <div className="font-semibold text-xl">
              Community Scoped Query
            </div>
            <Form method="post">
              <div>
                <label htmlFor="communityQuery" className="block text-sm font-medium text-gray-700">Query</label>
                <input type="text" id="communityQuery" name="communityQuery" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm" required placeholder="Enter your Community related query here." />
              </div>
              <div className="flex items-center mt-3">
                <input id="keywordExtract" name="keywordExtract" type="checkbox" className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-2 focus:ring-blue-500" />
                <label htmlFor="keywordExtract" className="ml-2 block text-sm text-gray-700">Enable keyword extraction</label>
              </div>
              <button type="submit" className={`mt-4 flex justify-center py-2 px-4 border ${navigation.state != 'idle' ? "bg-neutral-500" : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"} border-transparent rounded-full shadow-sm text-sm font-medium text-white `} disabled={navigation.state != 'idle' ? true : false}>Submit</button>
            </Form>
          </div>
        </div>
        <div className="my-2">
          <div>
            <div className="font-semibold text-xl">
              Query Data
            </div>
            <div className="flex flex-wrap w-full">
              <div className="text-xl w-1/3">
                Status: Pending
              </div>
              <div className="text-xl w-1/3">
                GPT Model: {actionData?.gptModel}
              </div>
              <div className="text-xl w-1/3">
                Used Tokens: {actionData?.tokensUsed}
              </div>
              <div className="text-xl w-1/3">
                Token Cost: {actionData?.tokensUsed ? `$${calculate35TurboCostUSD(actionData?.tokensUsed).toFixed(10)}` : ""}
              </div>

            </div>
            <div className="mt-5">
              <div className="flex">
                <span className="text-xl">Keywords:</span>
                {actionData?.keywords && (

                  <motion.div variants={containerVariants}
                    initial="hidden"
                    animate="visible">
                    {actionData.keywords.map((keyword, index) => (
                      <motion.div key={index} variants={itemVariants} className={`inline-block ${colors[index % colors.length]} text-sm rounded-full px-4 py-1 mx-1`}>
                        {keyword}
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="w-full h-full flex pt-5">
        <div className="w-1/2 h-full"><ExecutionHistory /></div>
      </div>
    </div>
  );
}
