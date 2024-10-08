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

//Making an order to send to POS
const { ordersApi } = new Client({
  accessToken: "EAAAEHHRUeQlPQ7oagwti7wZnvu2t40i-WOJ7LwLGkoQ_eMF4xEPaLVsBBwPtNun",
  environment: "sandbox",
})

export async function submitOrder(){
  try {
    const { result } = await ordersApi.createOrder({
      order: {
        locationId: 'L26Y90P0YB65A',
        lineItems: [
          {
            name: 'Gyro Sandwich',
            quantity: '1',
            itemType: 'ITEM',
            basePriceMoney: {
              amount: 995,
              currency: 'USD'
            }
          }
        ]
      },
      idempotencyKey: randomUUID()
    });
    
    return result.order.id
  } catch(error) {
    console.log(error);
  }
}

export async function submitPayment(sourceId) {
  try {
    // const orderId = await createOrderForChickenSub(locationId);
    const orderId = await submitOrder()

    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId,
      amountMoney: {
        currency: "USD",
        amount: 995,
      },
      orderId
    });
    
    return result;
  } catch (error) {
    console.log(error);
  }
}