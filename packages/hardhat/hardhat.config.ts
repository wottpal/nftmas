import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import * as dotenv from 'dotenv'
import { task } from 'hardhat/config'
import { HardhatUserConfig } from 'hardhat/types'
import path from 'path'
dotenv.config()


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (_args, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(await account.address)
  }
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: [{
        privateKey: '2ce6eb23c854c683544cf1f50fc2a5fac595b42ad5d95c9f47fdbc88dc247053',
        balance: '10000000000000000000000'
      }],
      // forking: {
      //   enabled: true,
      //   url: 'https://polygon-mainnet.g.alchemy.com/v2/cfBVbcBvf-Flf2VybuoYEOVj9IJj08IJ',
      //   blockNumber: 21946738,
      // },
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: [`${process.env.FUJI_PRIVATE_KEY}`]
    },
    avax: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: [`${process.env.AVAX_PRIVATE_KEY}`]
    }
  },
  paths: {
    artifacts: path.resolve('../frontend/artifacts'),
  },
  typechain: {
    outDir: path.resolve('../frontend/types/typechain'),
    target: "ethers-v5",
    // target: "web3-v1",
  },
}

export default config
