"use server";

import { Client } from "square";
import { randomUUID } from "crypto";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

const { paymentsApi } = new Client({
  accessToken: "EAAAEHHRUeQlPQ7oagwti7wZnvu2t40i-WOJ7LwLGkoQ_eMF4xEPaLVsBBwPtNun",
  environment: "sandbox",
});

export async function submitPayment(sourceId) {
  try {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        currency: "USD",
        amount: 100,
      },
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}