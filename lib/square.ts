import { Client, Environment } from 'square';

const client = new Client({
  environment: Environment.Production,
  accessToken: process.env.SANDBOX_ACCESS_TOKEN,
});

export const catalogApi = client.catalogApi;
export const paymentsApi = client.paymentsApi;