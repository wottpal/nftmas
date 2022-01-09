import { Disclosure } from '@headlessui/react'
import { CubeTransparentIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { MoralisWalletStatus } from 'components/MoralisWalletStatus'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, Fragment } from 'react'
import tw from 'twin.macro'
import { Wrapper } from './Wrapper'


export const Navbar: FC = () => {
  const router = useRouter()
  let navigation: any = [
    { name: 'Greeter', href: '/demo/greeter' },
    { name: 'NFTMas', href: '/demo/nftmas' },
    // { name: 'Moralis Test', href: '/demo/moralis-test' },
    // { name: 'Create Set', href: '/demo/create-set' },
    // { name: 'All Sets', href: '/demo/all-sets' },
    // { name: 'My Sets', href: '/demo/my-sets' },
  ]
  navigation = navigation.map((item: any) => ({
    ...item,
    isActive: router.pathname.startsWith(item.href)
  }))

  return <>
    <Disclosure as="nav" tw="bg-gray-900">
      {({ open }) => (
        <>
          <Wrapper noVerticalPadding>
            <div tw="flex justify-between h-16">
              <div tw="flex flex-grow ml-2">
                {/* Mobile Menu Button */}
                <div tw="-ml-2 mr-3 flex items-center md:hidden">
                  <Disclosure.Button tw="inline-flex items-center justify-center p-2 -mb-0.5 text-gray-200 border-2 border-transparent hover:(text-white border-gray-600) focus:outline-none">
                    <span tw="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon tw="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon tw="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Logo */}
                <Link href="/" passHref>
                  <a tw="flex-shrink-0 flex items-center mr-3">
                    <CubeTransparentIcon tw="text-gray-100 mr-2 -mb-0.5 h-6 w-6 hidden md:(inline)" />
                    <h1 tw="font-display text-gray-100 text-xl font-semibold tracking-tight">
                      xyz.finance
                    </h1>
                  </a>
                </Link>

                {/* Navigation Items */}
                <div tw="hidden md:(flex flex-grow justify-center items-center space-x-4)">
                  {navigation.map((item: any) => (
                    <Link href={item.href} key={item.name} passHref>
                      <a
                        css={[
                          tw`px-3 py-2 text-sm border-2 border-transparent font-semibold outline-none`,
                          item.isActive
                            ? tw`text-gray-100 border-gray-100`
                            : tw`text-gray-400 hover:text-gray-100 `,
                        ]}
                        aria-current={item.isActive ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Actions */}
              <div tw="flex items-center">
                <div tw="flex-shrink-0">
                  <MoralisWalletStatus />
                </div>
              </div>
            </div>
          </Wrapper>

          <Disclosure.Panel tw="md:hidden">
            <div tw="pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item: any) => (
                <Disclosure.Button
                  key={item.name}
                  as={Fragment}
                >
                  <Link href={item.href} passHref>
                    <a
                      href={item.href}
                      css={[
                        tw`block px-3 py-2 text-base font-medium`,
                        item.isActive
                          ? tw`bg-gray-700 text-white`
                          : tw`text-gray-400 hover:(text-gray-100)`,
                      ]}
                      aria-current={item.isActive ? 'page' : undefined}>
                      {item.name}
                    </a>
                  </Link>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  </>
}