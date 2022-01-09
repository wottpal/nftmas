import { Tab } from '@headlessui/react'
import { EightBitBox, EightBitBoxTabButton } from 'components/EightBitBox'
import { GiftNftTab } from 'components/GiftNftTab'
import { Wrapper } from 'components/layout/Wrapper'
import { YourNftsTab } from 'components/YourNftsTab'
import NextImage from 'next/image'
import logoImg from 'public/brand/nftmas-logo-on-avax.png'
import React from 'react'
import { useMoralis } from 'react-moralis'
import 'twin.macro'

export default function IndexPage() {
  const { isAuthenticated, logout, authenticate } = useMoralis()

  return <>
    <div tw="flex flex-col items-center justify-center mt-16 mb-16">
      <NextImage src={logoImg} width='250' height='72' />
      <div tw="max-w-prose mt-4 text-center text-christwhite">
        Christmas is over but #NFTMas just begun. Gift unique NFT presents to your loved ones on Avalanche. For free.
      </div>
    </div>

    <Wrapper>
      <EightBitBox tw="p-8 pb-10 max-w-3xl mx-auto">
        {/* Tabs */}
        <Tab.Group defaultIndex={0}>
          <Tab.List>
            <div tw="flex justify-center space-x-6 -mt-14 mb-16" aria-label="Tabs">
              <Tab tw="outline-none">
                {({ selected }) => <EightBitBoxTabButton selected={selected}>Gift NFT</EightBitBoxTabButton>}
              </Tab>
              <Tab tw="outline-none">
                {({ selected }) => <EightBitBoxTabButton selected={selected}>Your NFTs</EightBitBoxTabButton>}
              </Tab>
            </div>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel tw="outline-none"><GiftNftTab /></Tab.Panel>
            <Tab.Panel tw="outline-none"><YourNftsTab /></Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </EightBitBox>
    </Wrapper>

    <div tw="flex justify-center">
      <div tw="max-w-prose mt-6 text-center text-christwhite">
        Built by <a target="_blank" href="https://twitter.com/dennis_zoma/" tw="underline">@dennis_zoma</a> as part of a Hackathon
        {isAuthenticated && <>
          &nbsp;• <button tw="underline" onClick={logout}>Disconnect Wallet</button>
        </>}
      </div>
    </div>


  </>
}

