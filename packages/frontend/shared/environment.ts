
export const env = {
  isProduction: process.env.NEXT_PUBLIC_PRODUCTION_MODE === 'true',
  url: process.env.NEXT_PUBLIC_URL!,

  supportedChainHex: process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_HEX!.toLowerCase(),
  supportedChainDec: parseInt(process.env.NEXT_PUBLIC_SUPPORTED_CHAIN_HEX!, 16),

  moralis: {
    serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER_URL!,
    appId: process.env.NEXT_PUBLIC_MORALIS_APP_ID!,
  },

  nftStorageApiKey: process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY!,
}

