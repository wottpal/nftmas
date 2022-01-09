import { GiftIcon } from '@heroicons/react/solid'
import { BigNumber } from 'ethers'
import useContractAddresses from 'hooks/useContractAddresses'
import useMoralisSigner from 'hooks/useMoralisSigner'
import useSupportedChain from 'hooks/useSupportedChain'
import Image from 'next/image'
import { useRouter } from 'next/router'
import example1Img from 'public/nft-examples/example-1.png'
import example2Img from 'public/nft-examples/example-2.png'
import example3Img from 'public/nft-examples/example-3.png'
import example4Img from 'public/nft-examples/example-4.png'
import example5Img from 'public/nft-examples/example-5.png'
import React, { FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMoralis } from 'react-moralis'
import { env } from 'shared/environment'
import { waitTime } from 'shared/promise-utils'
import * as nftCreator from 'shared/services/nft-creator'
import tw from 'twin.macro'
import { MintedEvent } from 'types/typechain/NFTMas'
import { GiftNftTabConfetti } from './GiftNftTabConfetti'
import { MoralisAuthButton } from './MoralisAuthButton'
import { SwitchChainButton } from './SwitchChainButton'
import { TwitterEightBitButtonAndPreview } from './TwitterEightBitButton'

export type GeneratedNft = {
  mintedEvent: MintedEvent
  base64: string
}

export type GiftNFTFormData = {
  to: string
}

export interface GiftNftTabProps { }
export const GiftNftTab: FC<GiftNftTabProps> = () => {
  const { account, isWeb3Enabled, isAuthenticated, } = useMoralis()
  const { isSupportedChain } = useSupportedChain()
  const { signer } = useMoralisSigner()
  const { addresses } = useContractAddresses()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loadingState, setLoadingState] = useState<string>()
  const [errorState, setErrorState] = useState<string>()
  const form = useForm<GiftNFTFormData>({ mode: 'onChange' })
  const { isValid } = form.formState

  const router = useRouter()

  // Receiver field
  const toField = form.register('to', {
    required: 'Field is required',
    pattern: {
      value: /^0x[a-fA-F0-9]{40}$/,
      message: 'Please enter a valid address',
    }
  })
  useEffect(() => {
    let { to }: any = router.query
    if (!env.isProduction && !to) to = '0xfbFDab35e38c496993E858A2Ae3e8b304F58A80a'
    form.reset({ to })
  }, [router.query])

  // Toggle through example images based on timer
  const [activeExample, setActiveExample] = useState<number>(0)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveExample((state) => (state + 1) % 5)
    }, 500)
    return () => clearInterval(slideInterval)
  }, [])

  /**
   * 1. Fetches available layers
   * 2. Generates a cryptographically-proof randomized NFT-image with HTMLCanvas
   * 3. Uploads metadata & image via NFT.storage and mints via the NFTMas-contract
   * @param e If `e.altKey === true` a DRY-run in dev-environment is performed without actually minting
   */
  const [generatedNft, setGeneratedNft] = useState<GeneratedNft>()
  const generateAndMintNft = async (e: MouseEvent<HTMLButtonElement>) => {
    const isDryRun = e.altKey && !env.isProduction
    const to = form.getValues('to')?.toLowerCase()
    if (!signer || !to) {
      setErrorState('Error while creating NFT. Refresh and try again.')
    }

    setErrorState(undefined)
    setGeneratedNft(undefined)

    let base64: string
    try {
      setLoadingState('Generate randomized gift 🎨')
      const nftLayers = await nftCreator.randomizeNftLayerItems()
      base64 = await nftCreator.drawNftLayers(canvasRef, nftLayers)
      await waitTime(500)
    } catch (e) {
      setErrorState('Error while creating NFT. Try again.')
      setLoadingState(undefined)
      return
    }

    // DEBUG: to instantly download the genereated image
    // window.location.href = base64.replace(/^data:image\/[^;]/, 'data:application/octet-stream')

    let mintedEvent: MintedEvent
    try {
      setLoadingState('Mint it 🎁')
      mintedEvent = isDryRun
        ? (await waitTime(2000) && {
          args: { to, from: account, tokenId: BigNumber.from(42), tokenUri: 'bafyreih7blkkbmlniq4q5koyec45cpozoq3tk6nxxkcffglwdk2rosooiy' }
        }) as MintedEvent
        : await nftCreator.mintNft(form.getValues('to'), base64, addresses['NFTMas'], signer!)
    } catch (e: any) {
      if (e?.code === 4001) {
        setErrorState('Error: User denied transaction signature.')
      } else if (e?.code === -32603 && !!e?.data?.message) {
        setErrorState(e?.data?.message)
      } else {
        setErrorState('Unkown error while minting NFT. Try again.')
      }
      setLoadingState(undefined)
      return
    }

    const generatedNft = {
      mintedEvent,
      base64,
    }
    console.log({ generatedNft })
    setGeneratedNft(generatedNft)
    setLoadingState(undefined)
  }


  const tweetText = `I just gifted #NFTMas no. ${generatedNft?.mintedEvent?.args?.tokenId} 🎁 🥳\nGift me a free one as well at nftmas.xyz/?to=${account} via @avalancheavax by @dennis_zoma`
  const tweetTextPreview = `I just gifted #NFTMas no. ${generatedNft?.mintedEvent?.args?.tokenId} 🎁 🥳<br />Gift me a free one as well at nftmas.xyz/?to=${account?.substring(0, 5)}…`
  return <>
    <div tw="flex flex-col items-center">

      <div css={[
        tw`relative box-content overflow-hidden border-4 border-christwhite bg-christgray mb-8 select-none`,
        `width: ${nftCreator.NFTMAS_WIDTH}px; height: ${nftCreator.NFTMAS_HEIGHT}px;`
      ]}>
        {/* NFT example images + '?' toggling automatically until a custom NFT is generated */}
        {!generatedNft && <>
          <Image src={[example1Img, example2Img, example3Img, example4Img, example5Img][activeExample]!} layout="fill" priority={activeExample === 1} />
          <div tw="absolute z-10 inset-0 bg-christblack bg-opacity-60 flex justify-center items-center">
            <span css={[
              tw`font-bold text-8xl text-christwhite text-shadow[0 0 25px rgba(255,255,255,.6)]`,
            ]}>?</span>
          </div>
        </>}

        {/* Canvas to generate NFT */}
        <canvas tw="" ref={canvasRef} width={nftCreator.NFTMAS_WIDTH} height={nftCreator.NFTMAS_HEIGHT} />
      </div>

      {errorState && <div tw="text-red-500 text-sm font-bold mb-4">{errorState}</div>}

      {/* Twitter call after generation */}
      {generatedNft && <>
        <TwitterEightBitButtonAndPreview tweetText={tweetText} tweetTextPreview={tweetTextPreview} />
        <button tw="text-sm underline text-christdarkgray hover:(text-christblack)"
          onClick={() => { setGeneratedNft(undefined) }}>
          … or gift another NFT
        </button>
      </>}

      {!loadingState && !generatedNft &&
        <div tw="relative flex flex-col items-stretch w-[24.5rem] max-w-full">

          {/* Receiver Address Input */}
          <input type="text" placeholder="Receiver Address (0x…)"
            tw="mb-3 px-0 py-2.5 border-4 border-christgray text-sm text-center focus:(outline-none ring-0 border-christdarkgray)"
            {...toField} />

          {(!isAuthenticated || !isWeb3Enabled) && <MoralisAuthButton />}

          {isAuthenticated && isWeb3Enabled && !isSupportedChain && <SwitchChainButton />}

          {isAuthenticated && isWeb3Enabled && isSupportedChain &&
            <button type="button" onClick={generateAndMintNft}
              disabled={!isValid || !!loadingState}
              tw="self-center px-5 py-3 bg-christred text-white font-bold border-2 border-gray-100 outline-none inline-flex items-center justify-center hover:(translate-y-[-1px]) disabled:(text-gray-100 bg-opacity-75 cursor-not-allowed) focus:(ring-2 ring-christred)">
              <GiftIcon tw="h-4 w-4 mr-2" />
              <span>Gift NFT</span>
            </button>}

        </div>}

      {/* Generation & Minting Loading State */}
      {loadingState &&
        <div tw="my-3 relative animate-bounce text-christblack font-bold bg-christyello rounded-full px-4 py-1.5">
          {loadingState}
        </div>}

      {/* Confetti after generation */}
      {generatedNft && <GiftNftTabConfetti />}
    </div>
  </>
}