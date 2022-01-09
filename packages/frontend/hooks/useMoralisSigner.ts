import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

export default function useMoralisSigner() {
  const { enableWeb3, web3, isAuthenticated } = useMoralis()
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(null)
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)

  useEffect(() => {
    if (isAuthenticated) {
      enableWeb3()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (web3?.currentProvider) {
      setProvider(new ethers.providers.Web3Provider(web3.currentProvider as any))
    } else if (provider !== null) {
      setProvider(null)
    }
  }, [web3?.currentProvider])

  useEffect(() => {
    if (provider) {
      setSigner(provider.getSigner())
    } else if (signer !== null) {
      setSigner(null)
    }
  }, [provider])

  return { signer, provider }
}
