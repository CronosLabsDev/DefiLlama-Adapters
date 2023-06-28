const { staking } = require("../helper/staking");

const MTD = "0x0224010ba2d567ffa014222ed960d1fa43b8c8e1";
const tokenDistributor = "0x4a91fe94870Ce48fC0bCb7c51d94677E61783401";

// MTD staking send the MTD token to the tokenDistributor contract

module.exports = {
  methodology: `TVL for MTD consists of the staking of MTD.`,
  ethereum: {
    tvl: () => ({}),
    staking: staking(tokenDistributor, MTD, "cronos"),
  },
};
