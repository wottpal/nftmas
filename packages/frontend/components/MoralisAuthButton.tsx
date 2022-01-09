import { LockClosedIcon } from '@heroicons/react/solid'
import { FC } from 'react'
import { useMoralis } from 'react-moralis'
import { env } from 'shared/environment'
import 'twin.macro'

export const MoralisAuthButton: FC = () => {
  const { authenticate, isAuthenticated, user, chainId, enableWeb3, logout } = useMoralis()
  const login = async () => {
    await authenticate({ chainId: env.supportedChainDec })
    await enableWeb3()
  }

  return <>
    <button type="button" onClick={login}
      tw="self-center inline-flex items-center px-5 py-3 bg-christblack text-christwhite border-2 border-gray-100 font-bold outline-none hover:(translate-y-[-1px]) focus:(ring-2 ring-christblack)">
      <LockClosedIcon tw="h-4 w-4 mr-2" />
      <span>Connect Wallet</span>
    </button>
    <div tw="self-center mt-2.5 text-xs text-christdarkgray">
      You may need to unlock your wallet first
    </div>
  </>
}