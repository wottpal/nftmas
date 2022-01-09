import { ContractAddresses } from 'artifacts/contracts/addresses'
import { useEffect, useState } from 'react'
import { useMoralis } from 'react-moralis'

export default function useContractAddresses() {
  type StringDict = { [_: string]: string }
  const { chainId } = useMoralis()
  const [addresses, setAddresses] = useState<StringDict>({})
  const allAddresses = ContractAddresses

  useEffect(() => {
    if (!chainId) {
      setAddresses({})
    } else {
      const chainIdDecimal = parseInt(chainId, 16)
      setAddresses((ContractAddresses as any)[chainIdDecimal] || {})
    }
  }, [chainId])

  return { addresses, allAddresses }
}
