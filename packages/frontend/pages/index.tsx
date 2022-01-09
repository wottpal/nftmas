import { Tab } from '@headlessui/react'
import { EightBitBox, EightBitBoxTabButton } from 'components/EightBitBox'
import { GiftNftTab } from 'components/GiftNftTab'
import { Wrapper } from 'components/layout/Wrapper'
import { YourNftsTab } from 'components/YourNftsTab'
import NextImage from 'next/image'
import logoImg from 'public/brand/nftmas-logo-on-avax.png'
import React from 'react'
import { useMoralis } from 'react-moralis'
import { env } from 'shared/environment'
import 'twin.macro'

export default function IndexPage() {
  const { isAuthenticated, logout, authenticate } = useMoralis()

  return <>
    <div tw="flex justify-center mt-20 mb-16">
      <NextImage src={logoImg} width='250' height='72' />
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

    {!env.isProduction && isAuthenticated &&
      <div tw="text-center mt-4"><button onClick={logout}>Logout</button></div>}
  </>
}

