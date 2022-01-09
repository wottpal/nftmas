import fs from 'fs'
import hre, { config, ethers } from 'hardhat'
import path from 'path'

async function main() {
  const NFTMasFactory = await ethers.getContractFactory('NFTMas')
  const NFTMas = await NFTMasFactory.deploy()
  await NFTMas.deployed()
  console.log('NFTMas deployed to:', NFTMas.address)

  saveFrontendAddressFiles({
    'NFTMas': NFTMas.address
  })
}

function saveFrontendAddressFiles(contracts: any) {
  // Create adresses/ directory
  const addressesDir = path.join(config.paths.artifacts, `contracts/addresses`)
  fs.mkdirSync(addressesDir, { recursive: true })
  // Lowercase all addresses
  for (let contractKey of Object.keys(contracts)) {
    contracts[contractKey] = contracts[contractKey].toLowerCase()
  }
  // Create {chainId}.ts
  const addressesFilePath = path.join(addressesDir, `${hre.network.config.chainId}.ts`)
  const addressesFileContents = `export const ContractAddresses_${hre.network.config.chainId} = ${JSON.stringify(contracts, null, 2)}`
  fs.writeFileSync(addressesFilePath, addressesFileContents)
  // Create index.ts
  const chainIds = fs.readdirSync(addressesDir)
    .filter(name => name?.endsWith('.ts') && name !== 'index.ts')
    .map(name => name?.replace('.ts', ''))
  let indexFileContents = chainIds.reduce((acc, val) => acc + `import { ContractAddresses_${val} } from './${val}'\n`, '')
  indexFileContents += `export const ContractAddresses = {`
  indexFileContents += `${chainIds.reduce((acc, val) => acc + `'${val}': ContractAddresses_${val}\n`, '')}}`
  const indexFilePath = path.join(addressesDir, 'index.ts')
  fs.writeFileSync(indexFilePath, indexFileContents)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
