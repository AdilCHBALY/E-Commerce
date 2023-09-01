
# StoriFy

Full Stack Dashboard & CMS: Next.js 13 App Router, React, Tailwind, Prisma, MySQL , shadcn/ui

## Features

- Clerk authentification
- Using shadcn/ui Components
- Store CRUD
- Billboard CRUD
- Categories CRUD
- Size CRUD
- Color CRUD
- Products CRUD
- Orders Visualization
- Checkout using Stripe
- Stripe Webhooks
- Image Upload Using Cloudinary
- Graphs using recharts 

### Prerequisites

**Node version 13.x**

### Cloning the repository

```shell
git clone https://github.com/AdilCHBALY/E-Commerce.git
```

### Install packages

```shell
npm i
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL=''
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Setup Prisma

```shell
npx prisma generate
npx prisma db push
```

### Start the app

```shell
npm run dev
```

## Demo

Connect with Google Account 

https://e-commerce-5u75jxpd1-adilchbaly.vercel.app

