export const calculate35TurboCostUSD: (numOfTokens: number) => number = (numOfTokens) => {
    const ratePer1k = .003
    const costPerToken = ratePer1k / 1000;
    return numOfTokens * costPerToken;
}