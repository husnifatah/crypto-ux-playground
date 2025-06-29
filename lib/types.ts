export interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  balance: number;
  change24h: number;
}

export interface Transaction {
  id: string;
  type: 'swap' | 'send' | 'receive';
  fromToken?: Token;
  toToken?: Token;
  amount: number;
  hash: string;
  timestamp: Date;
  status: 'pending' | 'completed' | 'failed';
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  connecting: boolean;
}

export interface AppState {
  wallet: WalletState;
  tokens: Token[];
  transactions: Transaction[];
  theme: 'light' | 'dark';
}