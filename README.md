# AvaxPay

**Deeplink Payment Platform & Stripe for Avalanche Blockchain**

[![Demo Video](https://img.shields.io/badge/-Watch_Demo-red?style=for-the-badge&logo=youtube)]((https://youtu.be/SzBH74kJ_Pw))
[![Live Demo](https://img.shields.io/badge/-Live_Demo-blue?style=for-the-badge)](https://avaxpay.vercel.app)

---
## 📜 Deployed Contracts (Fuji Testnet)

| Contract | Address | Snowtrace |
|----------|---------|-----------|
| **AvaxPayProcessor** | `0x28a5dB9905a59376a40cA91c025B4F3A00Abd4FA` | [View](https://testnet.snowtrace.io/address/0x28a5dB9905a59376a40cA91c025B4F3A00Abd4FA) |
| **SubscriptionManager** | `0x7469CEC4eF717b2265963f663ABc049Ab15f4FeA` | [View](https://testnet.snowtrace.io/address/0x7469CEC4eF717b2265963f663ABc049Ab15f4FeA) |
| **Mock USDC** | `0xCAEBa7a92950c55fECCA2568DE953E172815b3a7` | [View](https://testnet.snowtrace.io/address/0xCAEBa7a92950c55fECCA2568DE953E172815b3a7) |
| **Mock USDT** | `0xECa66Dd77eD582e22C238a18d52D283460fFa8a0` | [View](https://testnet.snowtrace.io/address/0xECa66Dd77eD582e22C238a18d52D283460fFa8a0) |

---
## ⚙️ Configuration
Create `.env` file in AvaxPay-frontend:

Avalanche Network

NEXT_PUBLIC_CHAIN_ID=43113
NEXT_PUBLIC_NETWORK=testnet

RPC URLs

NEXT_PUBLIC_FUJI_RPC_URL=https://avax-fuji.g.alchemy.com/ your alchemy testnet url

App URL

NEXT_PUBLIC_APP_URL=http://localhost:3000

WalletConnect Project ID - Get from: https://cloud.walletconnect.com

NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=

Contract Addresses (from backend deployment)
NEXT_PUBLIC_AVAXPAY_PROCESSOR=0x28a5dB9905a59376a40cA91c025B4F3A00Abd4FA
NEXT_PUBLIC_SUBSCRIPTION_MANAGER=0x7469CEC4eF717b2265963f663ABc049Ab15f4FeA

Run- pnpm dev
