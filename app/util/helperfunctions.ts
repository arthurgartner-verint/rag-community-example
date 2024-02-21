export const calculate35TurboCostUSD: (numOfTokens: number) => number = (numOfTokens) => {
    const ratePer1k = .003
    const costPerToken = ratePer1k / 1000;
    return numOfTokens * costPerToken;
}

// export const extractKeywords(keywordArray: string[]) => string = () {
//     return [1];
// }


export async function checkFetchResponseOk(url: string): Promise<boolean> {
    try {
        const response = await fetch(url);
        return response.ok;
    } catch (error) {
        console.error("Fetch error:", error);
        return false;
    }
}
