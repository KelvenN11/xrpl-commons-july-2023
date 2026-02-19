import { Wallet_1 } from "src/wallet"
import { TxnOptions } from "../models/txn-options"
import {getClient} from "../xrpl-client"
import {Payment, Wallet } from "xrpl"

const client = getClient()

type PaymentProps = Omit<Payment, "TransactionType" | "Account">

export const sendPayment = async (props: PaymentProps, {wallet}: TxnOptions) => {
    // Prepare

    const payment: Payment = {
        ...props,
        TransactionType: "Payment",
        Account: wallet.address
    }

    const prepared = await client.autofill(payment)
    // Sign
    const signed = wallet.sign(prepared)

    // Validate
    const response = await client.submitAndWait(signed.tx_blob)
    console.log(response)

    return response
}