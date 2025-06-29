import { Token, Transaction } from './types';

export const mockTokens: Token[] = [
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    logo: '⟠',
    price: 2847.32,
    balance: 2.5847,
    change24h: 3.24
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    logo: '💎',
    price: 1.00,
    balance: 1250.00,
    change24h: 0.01
  },
  {
    id: 'uni',
    symbol: 'UNI',
    name: 'Uniswap',
    logo: '🦄',
    price: 8.45,
    balance: 125.75,
    change24h: -2.15
  },
  {
    id: 'link',
    symbol: 'LINK',
    name: 'Chainlink',
    logo: '🔗',
    price: 15.89,
    balance: 45.20,
    change24h: 5.67
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'swap',
    fromToken: mockTokens[0], // ETH
    toToken: mockTokens[1], // USDC
    amount: 0.5,
    hash: '0x1234...5678',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    status: 'completed'
  },
  {
    id: '2',
    type: 'receive',
    toToken: mockTokens[2], // UNI
    amount: 25.5,
    hash: '0x5678...9abc',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: 'completed'
  },
  {
    id: '3',
    type: 'send',
    fromToken: mockTokens[3], // LINK
    amount: 10.0,
    hash: '0x9abc...def0',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: 'completed'
  }
];

export const generateMockAddress = (): string => {
  const chars = '0123456789abcdef';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
};

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const formatCurrency = (amount: number, decimals = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(amount);
};

export const formatTokenAmount = (amount: number, decimals = 4): string => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
};