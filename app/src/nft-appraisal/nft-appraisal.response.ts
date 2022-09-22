export interface Collection {
  id: string;
  name: string;
  image_url: string;
}

export interface Trait {
  id: string;
  type: string;
  value: string;
  display_type: string;
  max_value?: any;
  count: number;
  is_meta: boolean;
  is_null: boolean;
  image_url: string;
  rarity: number;
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
  currency_id: string;
  market_name: string;
  quantity: number;
  log_index?: number;
  tx_hash: string;
  to_address: string;
  from_address: string;
  type: string;
}

export interface AssetAppraisal {
  collection: Collection;
  id: string;
  token_id: string;
  address: string;
  media_url: string;
  name: string;
  traits: Trait[];
  appraisal: Appraisal;
  last_sale: LastSale;
  ask?: any;
  owner: string;
  last_sale_appraisal_relative_delta: number;
}

export interface NFTAppraisalResponse {
  status: boolean;
  message: string;
  data: AssetAppraisal[];
}
