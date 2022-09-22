declare namespace namespace {
  export interface Change {
    wei_1d: number;
    wei_7d: number;
    wei_30d: number;
    usd_1d: number;
    usd_7d: number;
    usd_30d: number;
  }

  export interface Floor {
    wei: string;
    usd: number;
    change: Change;
  }

  export interface Change2 {
    wei_1d: number;
    wei_7d: number;
    wei_30d: number;
    usd_1d: number;
    usd_7d: number;
    usd_30d: number;
  }

  export interface MarketCap {
    wei: string;
    usd: number;
    change: Change2;
  }

  export interface Change3 {
    wei_1d: number;
    wei_7d: number;
    wei_30d: number;
    usd_1d: number;
    usd_7d: number;
    usd_30d: number;
  }

  export interface Volume {
    wei_1d: string;
    wei_7d: string;
    wei_30d: string;
    wei_all_time: string;
    usd_1d: number;
    usd_7d: number;
    usd_30d: number;
    usd_all_time: number;
    change: Change3;
  }

  export interface Change4 {
    wei_1d: number;
    wei_7d: number;
    wei_30d: number;
    usd_1d: number;
    usd_7d: number;
    usd_30d: number;
  }

  export interface Average {
    wei_1d: string;
    wei_7d: string;
    wei_30d: string;
    wei_all_time: string;
    usd_1d: number;
    usd_7d: number;
    usd_30d: number;
    usd_all_time: number;
    change: Change4;
  }

  export interface Change5 {
    num_1d: number;
    num_7d: number;
    num_30d: number;
  }

  export interface NumSales {
    num_1d: number;
    num_7d: number;
    num_30d: number;
    change: Change5;
  }

  export interface Change6 {
    wei_1d: number;
    wei_7d: number;
    wei_30d: number;
    usd_1d: number;
    usd_7d: number;
    usd_30d: number;
  }

  export interface AvgAppraisal {
    wei: string;
    usd: number;
    change: Change6;
  }

  export interface Collection {
    id: string;
    slug: string;
    name: string;
    contract_address: string;
    description: string;
    image_url: string;
    original_image_url: string;
    banner_image_url: string;
    external_link: string;
    discord_url: string;
    twitter_username: string;
    is_appraised: boolean;
    collection_gains_1d: number;
    collection_gains_7d: number;
    collection_gains_30d: number;
    collection_gains_all_time: number;
    collection_volume_wei_1d: string;
    collection_volume_wei_7d: string;
    collection_volume_wei_30d: string;
    collection_volume_wei_all_time: string;
    collection_assets_owned: number;
    collection_portfolio_wei: string;
    collection_assets_preview?: any;
    floor: Floor;
    market_cap: MarketCap;
    volume: Volume;
    average: Average;
    num_sales: NumSales;
    mape: number;
    num_assets: number;
    num_owners: number;
    avg_appraisal: AvgAppraisal;
    percent_listed_near_floor?: number;
  }

  export interface Data {
    collections: Collection[];
  }

  export interface WalletCollections {
    status: boolean;
    message: string;
    data: Data;
  }
}
