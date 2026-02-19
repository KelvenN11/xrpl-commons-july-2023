import { Client, convertStringToHex, NFTokenMint, NFTokenMintFlags, Wallet } from "xrpl"
import { getClient } from "../xrpl-client"
import { TxnOptions } from "../models/txn-options"
import { NFTokenCreateOffer, NFTokenAcceptOffer} from "xrpl"

const client = getClient()

type MintNftProps = Omit<NFTokenMint, "TransactionType" | "Account" | "Flags">

export const mintNfts = async ({URI, NFTokenTaxon = 0, ...rest}: MintNftProps,
    {wallet}: TxnOptions) => {
    // Prepare
    const nftMintTxn: NFTokenMint = {
        ...rest,
        Flags: NFTokenMintFlags.tfTransferable,
        NFTokenTaxon,
        URI: convertStringToHex(URI ?? ""),
        Account: wallet.address,
        TransactionType: "NFTokenMint",
    }

    const prepared = await client.autofill(nftMintTxn)
    // Sign

    const signed = wallet.sign(prepared)

    // Wait
    const response = await client.submitAndWait(signed.tx_blob)
    console.log(response)

    return response
}

type CreateNftOfferProps = Omit<NFTokenCreateOffer, "TransactionType" | "Account">

export const CreateNftOffer = async (props: CreateNftOfferProps, {wallet}: TxnOptions) => {
    // Prepare
    const offerTxn: NFTokenCreateOffer = {
        ...props,
        Account: wallet.address,
        TransactionType: "NFTokenCreateOffer",
    }

    // combine autofill, sign, and submit
    const response = await client.submitAndWait(offerTxn, {
        autofill: true,
        wallet,
    })
}

type AcceptOfferProps = Omit<NFTokenAcceptOffer, "TransactionType" | "Account">

export const AcceptNftOffer = async (props: AcceptOfferProps, {wallet}: TxnOptions) => {

    const acceptTxn: NFTokenAcceptOffer = {
        ...props,
        Account: wallet.address,
        TransactionType: "NFTokenAcceptOffer",
    }

    const response = await client.submitAndWait(acceptTxn, {
        autofill: true,
        wallet,
    })

    console.log(response)
    return response
}