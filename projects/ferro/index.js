// const retry = require('async-retry');
// const util = require('util')

const sdk = require('@defillama/sdk');
const { getBlock } = require('../helper/getBlock');
const ferroSwapAbi = require('./abis/ferro-swap.json');

// const BigNumber = require('bignumber.js');
// const { GraphQLClient, gql } = require('graphql-request');

// const GET_SWAP_POOLS_RESERVES = gql`
//   query swapPoolsReserves {
//     swaps {
//       lpToken
//       balances
//       tokens(orderBy: decimals, orderDirection: desc) {
//         decimals
//       }
//     }
//   }
// `;

// async function fetch() {
//   var endpoint ='https://graph.cronoslabs.com/subgraphs/name/ferro/swap';
//   var graphQLClient = new GraphQLClient(endpoint)

//   const swapPoolResponse = await retry(async () => await graphQLClient.request(GET_SWAP_POOLS_RESERVES));

//   const totalTVL = swapPoolResponse.swaps.reduce((poolTVL, currPool) => {
//     const balances = currPool.balances;
//     const tokens = currPool.tokens;
//     const currPoolTVL = tokens.reduce(
//       (tokenBalance, currToken, index) => {
//         const reserves = new BigNumber(balances[index]).div((new BigNumber(10)).pow(currToken.decimals));
//         tokenBalance = tokenBalance.plus(reserves);
//         return tokenBalance;
//       },
//       new BigNumber(0),
//     );
//     poolTVL = currPoolTVL.plus(poolTVL);
//     return poolTVL;
//   }, new BigNumber(0));

//   return totalTVL.toNumber();
// }

const FERRO_SWAP_ADDRESS = '0xe8d13664a42B338F009812Fa5A75199A865dA5cD';
const CHAIN = 'cronos';

async function tvl(timestamp, ethBlock, chainBlocks) {
  const block = await getBlock(timestamp, CHAIN, chainBlocks, true)

  const token = (await sdk.api.abi.call({
    target: FERRO_SWAP_ADDRESS,
    abi: ferroSwapAbi.getToken,
    CHAIN,
    block,
    params: [0],
  })).output;
  console.log({ token });

  const finalBalances = {}
  return finalBalances;
}

module.exports = {
  // fetch,

  timetravel: true,
  misrepresentedTokens: false,
  methodology: 'sum of ferro stablecoin pool contracts balance',
  start: 2542015,
  cronos: {
    tvl,
  }
}
