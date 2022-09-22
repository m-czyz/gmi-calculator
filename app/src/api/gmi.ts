export interface GmiDto {
  address: string;
  ens?: any;
  gmi: number;
  gmi_rank: number;
  gmi_percentile?: any;
  gmi_title: string;
  unrealized_gain: string;
  realized_gain: string;
  total_gain?: any;
  unrealized_gain_percent: number;
  realized_gain_percent: number;
  total_gain_percent: number;
  volume: string;
  start_at: number;
  num_txs: number;
  num_assets_owned: number;
  num_blue_chips_owned: number;
  num_collections_owned: number;
  last_updated?: any;
}

export interface GmiResponse {
  status: boolean;
  message: string;
  data: GmiDto;
}

/*
   "address": "0x4c8ff4e357c6626749559184c7877bdbc4d6815e",
    "ens": null,
    "gmi": 449.25326216404665,
    "gmi_rank": 260458,
    "gmi_percentile": null,
    "gmi_title": "2",
    "unrealized_gain": "-569185249363999981568",
    "realized_gain": "-1263899999000000000",
    "total_gain": null,
    "unrealized_gain_percent": -50.78,
    "realized_gain_percent": -19.13,
    "total_gain_percent": -50.59,
    "volume": "1127555790000000000000",
    "start_at": 1643604722,
    "num_txs": 61,
    "num_assets_owned": 51,
    "num_blue_chips_owned": 11,
    "num_collections_owned": 6,
    "last_updated": null
 */
