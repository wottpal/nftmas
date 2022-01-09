import { SwitchHorizontalIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { env } from 'shared/environment'
import 'twin.macro'
import { AddEthereumChainParameter } from 'types/MetaMask'


export const SwitchChainButton: FC = () => {
  // Set chain-params depending on environment
  let chainParams: AddEthereumChainParameter
  if (env.supportedChainHex === '0xa869') chainParams = {
    chainName: 'Avalanche Fuji Testnet',
    chainId: '0xa869',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://testnet.snowtrace.io/'],
  }
  if (env.supportedChainHex === '0xa86a') chainParams = {
    chainName: 'Avalanche Mainnet',
    chainId: '0xa86a',
    nativeCurrency: {
      name: 'Avalanche',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io/'],
  }

  const switchNetworkAvax = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: env.supportedChainHex }],
      })
    } catch (e: any) {
      if (e?.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [chainParams],
          })
        } catch (e) { }
      }
    }
  }

  return <>
    <button type="button" onClick={switchNetworkAvax}
      tw="self-center px-5 py-3 bg-christblack text-christwhite border-2 border-gray-100 font-bold outline-none inline-flex items-center hover:(translate-y-[-1px]) focus:(ring-2 ring-christblack)">
      <SwitchHorizontalIcon tw="h-4 w-4 mr-2" />
      <span>Switch to Avalanche</span>
    </button>
  </>
}