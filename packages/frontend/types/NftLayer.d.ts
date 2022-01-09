export interface NftLayer {
  name: string
  items: NftLayerItem[]
}

export interface NftLayerItem {
  layerName: string
  file: string
  name: string
  rarity: number
  probabilityNormalized?: number
  probabilityStart?: number
  probabilityEnd?: number
}