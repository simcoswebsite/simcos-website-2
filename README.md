# Full Stack E-Commerce Store (Trillion Troves) 

For DEMO, use [Stripe Testing Cards](https://stripe.com/docs/testing)

## MAKE SURE YOU HAVE [ADMIN](https://github.com/IgorTheFixer/admin-dashboard-commerce) SETUP FIRST!

Key Features:

- Shadcn UI
- Admin Dashboard serves as both CMS, Admin and API!
- Ability to control mulitple vendors / stores through this single CMS. (For example you can have a "Shoe store" and a "Laptop store" and a "Suit store", and this CMS will generate API routes for all of those individually.)
- Ability to create, update and delete categories.
- Ability to create, update and delete products.
- Ability to able to upload multiple images for products, and change them.
- Ability to create, update and delete filters such as "Color" and "Size", and then match them in the "Product" creation form.
- Ability to Search through all categories, products, sizes, colors, billboards with included pagination.
- Ability to control which products are "featured" so they show on the homepage.
- Ability to see your orders, sales, etc.
- Ability to see graphs of your revenue etc.
- Clerk Authentication
- Order creation
- Stripe checkout
- Stripe webhooks
- MySQL + Prisma + PlanetScale

### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
git clone https://github.com/IgorTheFixer/trillion-troves.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_API_URL=
```


### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
