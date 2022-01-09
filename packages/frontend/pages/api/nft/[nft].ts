import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import { NftLayer } from 'types/NftLayer'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { nft: slug } = req.query

  switch (slug) {
    case 'get-layer-data':
      return await handleGetLayerData(req, res)
    default:
      return res.status(404).end()
  }
}


export const handleGetLayerData = async (req: NextApiRequest, res: NextApiResponse) => {
  const nftLayersDirName = 'nft-layers'
  const nftLayersDir = path.resolve('./public', nftLayersDirName)

  const layerNameOrder = ['Shadow', 'Box', 'Ribbon', 'Contours', 'Special']
  const allLayers: NftLayer[] = layerNameOrder.map((name) => ({
    name,
    items: []
  }))

  for (let layer of allLayers) {
    // Iterate over all files and create layer-item-objects
    const layerDir = path.resolve(nftLayersDir, layer.name)
    const itemFilenames = fs.readdirSync(layerDir)
    let raritySum = 0
    for (let filename of itemFilenames) {
      try {
        const name = filename.split('.')[0]
        const rarity = parseInt(filename.split('.')[1])
        if (!name || !rarity) continue
        raritySum += rarity
        layer.items.push({
          layerName: layer.name,
          file: filename,
          name,
          rarity,
        })
      } catch (e) {
        console.error('Error while creating NftLayerItem', e)
        continue
      }
    }
    // Normalize rarity/probability for each
    let latestProbability = 0
    for (let i = 0; i < layer.items.length; i++) {
      const item = layer.items[i]
      item.probabilityNormalized = item.rarity / raritySum
      item.probabilityStart = latestProbability
      latestProbability += item.probabilityNormalized
      const isLast = i == (layer.items.length - 1)
      item.probabilityEnd = isLast ? 1.0 : latestProbability
    }
  }

  return res.status(200).json({
    allLayers
  })
}

