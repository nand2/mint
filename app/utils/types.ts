import type { RouteLocationRaw } from 'vue-router'

// =====================================================================
// APP-LOGIC
// =====================================================================
export type BreadcrumbItem = string|{
  to: RouteLocationRaw
  text: string
}
export type Breadcrumbs = BreadcrumbItem[]

// =====================================================================
// DATA
// =====================================================================
export interface Artist {
  address: `0x${string}`
  ens?: string|null
  avatar?: string|null
  description?: string|null
  url?: string|null
  email?: string|null
  twitter?: string|null
  github?: string|null
  collections: `0x${string}`[]
  profileUpdatedAtBlock: bigint,
  collectionsFetchedUntilBlock: bigint,
}

export interface Collection {
  address: `0x${string}`
  owner: `0x${string}`
  image: string
  name: string
  symbol: string
  description: string
  initBlock: bigint
  latestTokenId: bigint
  tokens: { [key: string]: Token }
}

export interface Token {
  collection: `0x${string}`
  tokenId: bigint
  name: string
  description: string
  artifact: string
  untilBlock: bigint
}
