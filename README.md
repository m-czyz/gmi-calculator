# Upshot BE Take-Home Task

## The Task

Build a scalable, realtime backend service that serves a simplified Upshot GMI app. The service should aggregate NFT event data and NFT appraisals and produce a score, that's updated in realtime. The service should accept an Ethereum wallet address and return both the wallet’s GMI score and all factors of the score including:

* the number of assets they currently own
* their total sale volume
* their total return
* their relative rank, compared to other wallets

The frontend to the app would look something like this:

![image info](./gmi-webpage.png)

which can be found at:
https://upshot.xyz/gmi/

address_or_ens: '0x4C8FF4E357C6626749559184C7877bDbC4D6815E',
'x-api-key': 'UP-39ef673e560bde0b20e95358'

## What is GMI?

“Gonna Make It” is a term used on crypto twitter to mark those entities destined for success. 
This is also the name for Upshot’s NFT expertise rating scheme; the better NFT trades one makes and the more NFTs one owns, the higher their GMI score.

For this simplified Upshot GMI app, GMI may be calculated as:

```
1000 * (number_wallets  - rank( number_nfts_owned(w) * total_gains(w) + volume(w); w)) / number_wallets
```

where:

`rank(f(w); w)` means the rank of wallet `w` 
according to the function `f(w)` compared to all other wallets. 
e.g. `rank(volume(0x1); 0x1) == 2` means that wallet `0x1` is ranked 2nd by volume across all wallets.

`number_wallets` is the total number of wallets available to consider and is dynamic

`number_nfts_owned(w)` is the number of NFTs currently owned by wallet `w`

`total_gains(w)` are the total gains incurred by wallet `w` by trading NFTs. This equals `100 * (sell_eth(w) + portfolio_value(w) - volume(w)) / volume(w)`, where:

`sell_eth(w)` is the gross amount of eth accrued by wallet `w` from selling nfts

`portfolio_value(w)` is the sum appraised value of all nfts currently owned by wallet `w`

`volume(w)` is the total amount of eth wallet `w` used to purchase nfts up until now

## Tools

You could use any NFT events API, including Upshot’s, to source NFT event data.

Upshot’s API:
https://docs.upshot.xyz/docs

Reservoir (an alternative data source):
https://docs.reservoir.tools/reference/overview

Alchemy:
https://docs.alchemy.com/reference/nft-api-endpoints

## Notes

1. Don’t bother creating a frontend.
2. You cannot use any endpoint from Upshot that already includes any wallet’s GMI. You should, however, use Upshot’s API to source NFT appraisal data.
3. For simplicity, you may ignore transactions that have not occurred in `eth`.
4. You must include a README file in your response that includes a description and justification for all assumptions and design decision made, weaknesses of your approach, and ways you would improve it given more time and resources.
5. You’ll be graded on accuracy of your results and the assumptions and design decisions you made.
