export interface Collection {
  id: string;
  name: string;
  image_url: string;
}

export interface Change {
  wei_1d: number;
  wei_7d: number;
  wei_30d: number;
  usd_1d: number;
  usd_7d: number;
  usd_30d: number;
}

export interface Appraisal {
  timestamp: string;
  wei: string;
  usd: number;
  mape: string;
  change: Change;
}

export interface LastSale {
  asset_id: string;
  timestamp: number;
  collection_id: string;
  wei: string;
  usd: number;
  market_name?: any;
  currency_id: string;
  quantity: number;
  log_index: number;
  tx_hash: string;
  to_address: string;
  from_address: string;
  type: string;
}

export interface Trait {
  type: string;
  value: string;
}

export interface Asset {
  id: string;
  token_id: string;
  address: string;
  media_url: string;
  name: string;
  collection: Collection;
  appraisal: Appraisal;
  last_sale: LastSale;
  ask?: any;
  last_sale_appraisal_relative_delta: number;
  traits: Trait[];
}

export interface WalletItemsDto {
  assets: Asset[];
}

export interface WalletItemsResponse {
  status: boolean;
  message: string;
  data: WalletItemsDto;
}
