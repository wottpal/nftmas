# NFTMas

Gift your loved ones unique NFT presents at [nftmas.xyz](http://nftmas.xyz).

Contest submission for [Moralis + Avalanche Hackathon](https://moralis.io/avalanche-hackathon/).



## Setup
```bash
# Copy & fill environments
cp packages/frontend/.env.local.example packages/frontend/.env.local 
cp packages/hardhat/.env.example packages/frontend/.env

# Install Dependencies
yarn
```


## Development

```bash
# Start NextJS Frontend
yarn frontend:dev

# Start Hardhat Chain (different terminal)
yarn hardhat:chain

# Start both in parallel in same terminal#
yarn start

# Deploy NFTMas.sol contract to development chain (different terminal)
yarn hardhat:deploy
```