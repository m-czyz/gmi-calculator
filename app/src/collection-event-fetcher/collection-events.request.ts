export interface CollectionEvent {
  asset_id: string;
  timestamp: number;
  collection_id: string;
  wei: string;
  usd?: number;
  currency_id: string;
  market_name: string;
  quantity: string;
  log_index: number;
  tx_hash: string;
  to_address: string;
  from_address: string;
  type: string;
  from_ens: string;
  to_ens: string;
  contract_address: string;
  token_id: string;
}

export interface CollectionEventsDto {
  events: CollectionEvent[];
  count: number;
}

export interface CollectionEventsRequest {
  status: boolean;
  message: string;
  data: CollectionEventsDto;
}
