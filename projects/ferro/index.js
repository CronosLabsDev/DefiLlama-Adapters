const retry = require('async-retry');
const BigNumber = require('bignumber.js');
const { GraphQLClient, gql } = require('graphql-request');

const GET_SWAP_POOLS_RESERVES = gql`
  query swapPoolsReserves {
    swaps {
      lpToken
      balances
      tokens(orderBy: decimals, orderDirection: desc) {
        decimals
      }
    }
  }
`;

async function fetch() {
  var endpoint ='https://graph.cronoslabs.com/subgraphs/name/ferro/swap';
  var graphQLClient = new GraphQLClient(endpoint)

  const swapPoolResponse = await retry(async () => await graphQLClient.request(GET_SWAP_POOLS_RESERVES));

  const totalTVL = swapPoolResponse.swaps.reduce((poolTVL, currPool) => {
    const balances = currPool.balances;
    const tokens = currPool.tokens;
    const currPoolTVL = tokens.reduce(
      (tokenBalance, currToken, index) => {
        const reserves = new BigNumber(balances[index]).div((new BigNumber(10)).pow(currToken.decimals));
        tokenBalance = tokenBalance.plus(reserves);
        return tokenBalance;
      },
      new BigNumber(0),
    );
    poolTVL = currPoolTVL.plus(poolTVL);
    return poolTVL;
  }, new BigNumber(0));

  return totalTVL.toNumber();
}

module.exports = {
  fetch,
}
