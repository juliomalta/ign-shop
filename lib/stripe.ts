import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Ignite Shop',
    version: '0.1.0'
  }
})
// normalmente nomeado como STRIPE_API_KEY