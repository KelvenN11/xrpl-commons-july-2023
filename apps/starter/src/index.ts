import { sendPayment } from "./transactions/payments"
import { getClient } from "./xrpl-client"
import {Wallet_1, Wallet_2} from "./wallet"
import { CreateNftOffer, AcceptNftOffer, mintNfts } from "./transactions/nfts"
import { NFTokenCreateOfferFlags } from "xrpl"
import { validateNFTokenAcceptOffer } from "xrpl/dist/npm/models/transactions/NFTokenAcceptOffer"

const client = getClient()

const main = async () => {
  await client.connect()

  // await sendPayment({
  //   Destination: Wallet_2.address,
  //   Amount: "1000000",
  // }, {wallet: Wallet_1})
  // console.log("It works!")

  // await mintNfts({
  //   URI: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDJwYWoxbjVub3lwNzR3d2JiYmQ4MmswcHhuajFyODBhaDVxbnoxbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vL8jVjKkqbVh2qdFj0/giphy.gif",
  //   NFTokenTaxon: 0,
  // }, {wallet: Wallet_1})

  // await CreateNftOffer({
  //   Flags: NFTokenCreateOfferFlags.tfSellNFToken,
  //   NFTokenID: "00080000345330BBE05078DA3042B5BB2A82233C142EDD548D2FA91F00E4DB84",
  //   Amount: "1000000", // remember this is drops

  // }, {wallet: Wallet_1})

  await AcceptNftOffer({
    NFTokenSellOffer: "6D7446250BD2E0F97E83E8472BA4516EDF26F92962D0A53283B1EDB78CFED863",
  }, {wallet: Wallet_2}) // wallet here is the buyer
  await client.disconnect()
}

main()
