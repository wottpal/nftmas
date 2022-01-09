import { ethers } from 'ethers'
import { NFTStorage } from 'nft.storage'
import { RefObject } from 'react'
import { env } from 'shared/environment'
import { dataUrlToFile } from 'shared/file-utils'
import { loadImg } from 'shared/promise-utils'
import { getRandomFloat } from 'shared/random-utils'
import { NftLayer, NftLayerItem } from 'types/NftLayer'
import { NFTMas__factory } from 'types/typechain'
import { MintedEvent } from 'types/typechain/NFTMas'


export const NFTMAS_WIDTH = 256
export const NFTMAS_HEIGHT = 256


/**
 * Fetches all available NFT-layers from local API and composes a randomized set.
 */
export const randomizeNftLayerItems = async (): Promise<NftLayerItem[]> => {
  const res = await fetch('/api/nft/get-layer-data')
  const { allLayers }: { allLayers: NftLayer[] } = await res.json()
  // console.log({ allLayers })

  // Generate random composition
  const nftLayerItems: NftLayerItem[] = []
  for (let layer of allLayers) {
    const rand = getRandomFloat()
    for (let item of layer.items) {
      if (rand >= item.probabilityStart! && rand < item.probabilityEnd!) {
        nftLayerItems.push(item)
        break
      }
    }
  }
  return nftLayerItems
}


/**
 * Draws given layer-set on a given canvas. Exports and returns the canvas as an base64-image.
 */
export const drawNftLayers = async (canvasRef: RefObject<HTMLCanvasElement>, layers: NftLayerItem[]): Promise<string> => {
  const canvas = canvasRef?.current
  const ctx = canvas?.getContext('2d')
  if (!canvas || !ctx) {
    throw new Error('No Canvas')
  }

  // ctx.fillStyle = '#fff'
  ctx.clearRect(0, 0, NFTMAS_WIDTH, NFTMAS_HEIGHT)

  for (let layer of layers) {
    const img = await loadImg(`${env.url}/nft-layers/${layer.layerName}/${layer.file}`)
    ctx.drawImage(img, 0, 0, canvas!.width, canvas!.height)
  }

  const base64 = canvas.toDataURL('image/png', 1)
  return base64
}


/**
 * Mints the base64-image to a given receiver and returns the `MintedEvent` from the NFTMas-contract.
 */
export const mintNft = async (to: string, base64Nft: string, contract: string, signer: ethers.providers.JsonRpcSigner): Promise<MintedEvent> => {
  if (!signer) throw new Error('No Signer')
  const nftStorage = new NFTStorage({ token: env.nftStorageApiKey })
  const metadata = await nftStorage.store({
    name: 'NFTMas Gift',
    description: '...',
    image: dataUrlToFile(
      base64Nft,
      'gift.png'
    )!,
    attributes: [
      {
        'trait_type': 'Base',
        'value': 'Starfish'
      },
      {
        'trait_type': 'Eyes',
        'value': 'Big'
      },
    ],
  })
  const nftmas = await NFTMas__factory.connect(contract, signer)
  const tx = await nftmas.mintGift(to, metadata.ipnft)
  const result = await tx.wait()

  const mintedEvent = (result.events || []).filter(e => e.event === 'Minted')[0]
  return mintedEvent as MintedEvent
}
