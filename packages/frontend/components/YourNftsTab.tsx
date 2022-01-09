import axios from 'axios'
import useContractAddresses from 'hooks/useContractAddresses'
import useSupportedChain from 'hooks/useSupportedChain'
import Image from 'next/image'
import { FC, Fragment, useEffect, useState } from 'react'
import { useMoralis, useNFTBalances } from 'react-moralis'
import 'twin.macro'
import { MoralisAuthButton } from './MoralisAuthButton'
import { SwitchChainButton } from './SwitchChainButton'
import { TwitterEightBitButtonAndPreview } from './TwitterEightBitButton'

export interface NFTMasNft {
  token_address: string
  token_id: number
  token_uri: string
  name: string
  symbol: string
  owner_of: string

  image?: string
  metadata?: {
    name: string
    description: string
    image: string
    attributes: any
  }
  fetched_manually?: boolean
}

export interface YourNftsTabProps { }
export const YourNftsTab: FC<YourNftsTabProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, isWeb3Enabled, account } = useMoralis()
  const { addresses } = useContractAddresses()
  const { isSupportedChain } = useSupportedChain()
  const { data, isLoading: isNftBalanceLoading } = useNFTBalances()
  const [nfts, setNfts] = useState<NFTMasNft[]>([])

  useEffect(() => {
    parseNftData()
  }, [data])

  const parseNftData = async () => {
    if (!data?.result?.length) return []
    setIsLoading(true)

    // Filter NFTMas-NFTs
    const parsedNfts = data.result
      .filter(nft => nft.token_address?.toLowerCase() === addresses['NFTMas'])
      .filter(nft => nft.name === 'NFTMas')
      .filter(nft => !!nft.token_id)
      .filter(nft => !!nft.token_uri)
      .map((nft) => ({
        ...nft,
        token_uri: nft.token_uri!.match(/(?:\/ipfs\/)(.*)(?:metadata.json)/)![1],
        token_id: parseInt(nft.token_id)
      })) as NFTMasNft[]
    parsedNfts.sort((a, b) => (a.token_id >= b.token_id) ? -1 : 1)

    // Fetch metadata for not yet fully indexed items
    for (let nft of parsedNfts) {
      if (!!nft.image && !!nft.metadata) continue
      try {
        const { data } = await axios.get(`https://ipfs.io/ipfs/${nft.token_uri}/metadata.json`)
        nft.metadata = data
        nft.image = data.image?.replace('ipfs://', 'https://gateway.ipfs.io/ipfs/')
        nft.fetched_manually = true
      } catch (e) { }
    }
    setNfts(parsedNfts)
    setIsLoading(false)
    console.log({ parsedNfts }, `${parsedNfts.filter(nft => nft.fetched_manually).length}/${parsedNfts.length} items fetched manually`)
  }

  if (!isAuthenticated || !isWeb3Enabled || !account) return <>
    <div tw="flex flex-col justify-center items-center py-10">
      <MoralisAuthButton />
    </div>
  </>

  if (!isSupportedChain) return <>
    <div tw="flex flex-col justify-center items-center py-10">
      <SwitchChainButton />
    </div>
  </>

  const isEmpty = !isLoading && !isNftBalanceLoading && !nfts?.length
  const tweetText = `It's #NFTMas 🎁 🥳\nPut a smile on my face by gifting me a free one at nftmas.xyz/?to=${account} via @avalancheavax by @dennis_zoma`
  const tweetTextPreview = `It's #NFTMas 🎁 🥳<br />Put a smile on my face by gifting me a free one at nftmas.xyz/?to=${account?.substring(0, 5)}…`
  return <>
    <div tw="bg-gray-300 text-sm text-center text-gray-600 italic px-3 py-5">
      It can take a moment before your NFTs show up.
    </div>

    {(isLoading || isNftBalanceLoading) && <div tw="flex justify-center my-10">
      <svg tw="animate-spin -ml-1 mr-3 h-12 w-12 text-christred" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle tw="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path tw="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>}

    {/* Twitter Call */}
    {isEmpty && <TwitterEightBitButtonAndPreview
      tweetText={tweetText} tweetTextPreview={tweetTextPreview}
      tw="mt-20 mb-14" />}

    {/* NFT Preview Grid */}
    <div tw="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
      {nfts.map((nft, idx) => {
        return <Fragment key={idx}>
          <div tw="aspect-ratio[1] object-fill relative overflow-hidden border-4 border-christwhite bg-christgray select-none" >
            <div tw="z-20 absolute right-1 bottom-1 text-xs px-1.5 py-0.5 bg-christblack text-christwhite font-bold tracking-wider">
              #{nft.token_id}
            </div>
            {nft.image && <Image src={nft.image} layout="fill" tw="z-10" />}
            <div tw="absolute inset-0 flex justify-center items-center font-bold text-8xl text-christdarkgray animate-pulse">?</div>
          </div>
        </Fragment>
      })}
    </div>
  </>
}