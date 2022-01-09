import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'
import { env } from 'shared/environment'

export default function useSupportedChain() {
  const { chainId } = useMoralis()
  const [isSupportedChain, setIsSupportedChain] = useState<boolean>()

  useEffect(() => {
    setIsSupportedChain(
      chainId
        ? chainId.toLowerCase() === env.supportedChainHex.toLowerCase()
        : false
    )
  }, [chainId])

  return { isSupportedChain }
}
