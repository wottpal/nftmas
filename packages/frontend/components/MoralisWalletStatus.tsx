import { LockClosedIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { useMoralis } from 'react-moralis'
import 'twin.macro'

export const MoralisWalletStatus: FC = () => {
  const { authenticate, isAuthenticated, user, chainId, enableWeb3, logout } = useMoralis()

  if (!isAuthenticated) return <>
    <button
      onClick={async () => {
        await authenticate({})
        await enableWeb3()
      }}
      tw="px-3 py-2 text-sm bg-gray-100 text-gray-800 border-2 border-gray-100 font-bold outline-none inline-flex items-center">
      <LockClosedIcon tw="h-4 w-4 mr-1.5" />
      <span>Connect</span>
      <span tw="hidden lg:inline">&nbsp;Wallet</span>
    </button>
  </>

  const userName = user!.get('username')
  return <>
    <button
      onClick={async () => {
        await logout()
      }}
      tw="px-3 py-2 text-sm bg-transparent text-gray-100 border-2 border-blue-500 font-bold outline-none inline-flex items-center">
      <LockClosedIcon tw="h-4 w-4 mr-1.5" />
      <span>{userName} | {chainId}</span>
    </button>
  </>
}