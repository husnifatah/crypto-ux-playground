'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, WalletState, Token, Transaction } from '@/lib/types';
import { mockTokens, mockTransactions, generateMockAddress } from '@/lib/mock-data';

type AppAction =
  | { type: 'CONNECT_WALLET_START' }
  | { type: 'CONNECT_WALLET_SUCCESS'; payload: string }
  | { type: 'DISCONNECT_WALLET' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TOKEN_BALANCE'; payload: { tokenId: string; newBalance: number } };

const initialState: AppState = {
  wallet: {
    isConnected: false,
    address: null,
    connecting: false
  },
  tokens: mockTokens,
  transactions: mockTransactions,
  theme: 'dark'
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'CONNECT_WALLET_START':
      return {
        ...state,
        wallet: { ...state.wallet, connecting: true }
      };
    
    case 'CONNECT_WALLET_SUCCESS':
      return {
        ...state,
        wallet: {
          isConnected: true,
          address: action.payload,
          connecting: false
        }
      };
    
    case 'DISCONNECT_WALLET':
      return {
        ...state,
        wallet: {
          isConnected: false,
          address: null,
          connecting: false
        }
      };
    
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    
    case 'UPDATE_TOKEN_BALANCE':
      return {
        ...state,
        tokens: state.tokens.map(token =>
          token.id === action.payload.tokenId
            ? { ...token, balance: action.payload.newBalance }
            : token
        )
      };
    
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Custom hooks for common actions
export const useWallet = () => {
  const { state, dispatch } = useApp();

  const connectWallet = async () => {
    dispatch({ type: 'CONNECT_WALLET_START' });
    
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAddress = generateMockAddress();
    dispatch({ type: 'CONNECT_WALLET_SUCCESS', payload: mockAddress });
  };

  const disconnectWallet = () => {
    dispatch({ type: 'DISCONNECT_WALLET' });
  };

  return {
    wallet: state.wallet,
    connectWallet,
    disconnectWallet
  };
};

export const useTheme = () => {
  const { state, dispatch } = useApp();

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return {
    theme: state.theme,
    toggleTheme
  };
};