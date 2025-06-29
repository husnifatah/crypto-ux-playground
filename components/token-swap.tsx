'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpDown, Settings, Info, Loader2 } from 'lucide-react';
import { useApp } from '@/contexts/app-context';
import { Token } from '@/lib/types';
import { formatTokenAmount, formatCurrency } from '@/lib/mock-data';

export const TokenSwap = () => {
  const { state, dispatch } = useApp();
  const [fromToken, setFromToken] = useState<Token>(state.tokens[0]);
  const [toToken, setToToken] = useState<Token>(state.tokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [swapping, setSwapping] = useState(false);

  // Simulate price calculation
  useEffect(() => {
    if (fromAmount && !isNaN(Number(fromAmount))) {
      const calculatedAmount = (Number(fromAmount) * fromToken.price) / toToken.price;
      setToAmount(calculatedAmount.toFixed(6));
    } else {
      setToAmount('');
    }
  }, [fromAmount, fromToken, toToken]);

  const handleSwap = async () => {
    if (!fromAmount || !toAmount) return;

    setSwapping(true);
    
    // Simulate swap delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Add transaction to history
    const newTransaction = {
      id: Date.now().toString(),
      type: 'swap' as const,
      fromToken,
      toToken,
      amount: Number(fromAmount),
      hash: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 8)}`,
      timestamp: new Date(),
      status: 'completed' as const
    };

    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });

    // Update balances
    dispatch({
      type: 'UPDATE_TOKEN_BALANCE',
      payload: { tokenId: fromToken.id, newBalance: fromToken.balance - Number(fromAmount) }
    });
    dispatch({
      type: 'UPDATE_TOKEN_BALANCE',
      payload: { tokenId: toToken.id, newBalance: toToken.balance + Number(toAmount) }
    });

    setFromAmount('');
    setToAmount('');
    setSwapping(false);
  };

  const handleTokenSwitch = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const TokenSelector = ({ 
    token, 
    onTokenChange, 
    label 
  }: { 
    token: Token; 
    onTokenChange: (token: Token) => void; 
    label: string;
  }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <Select value={token.id} onValueChange={(tokenId) => {
        const selectedToken = state.tokens.find(t => t.id === tokenId);
        if (selectedToken) onTokenChange(selectedToken);
      }}>
        <SelectTrigger className="h-12">
          <SelectValue>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{token.logo}</span>
              <div>
                <div className="font-medium">{token.symbol}</div>
                <div className="text-xs text-muted-foreground">{token.name}</div>
              </div>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {state.tokens.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              <div className="flex items-center gap-3">
                <span className="text-xl">{t.logo}</span>
                <div>
                  <div className="font-medium">{t.symbol}</div>
                  <div className="text-xs text-muted-foreground">
                    Balance: {formatTokenAmount(t.balance)}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Swap Tokens</span>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <TokenSelector
              token={fromToken}
              onTokenChange={setFromToken}
              label="From"
            />
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="h-12 text-lg"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Balance: {formatTokenAmount(fromToken.balance)}</span>
              <span>{formatCurrency(Number(fromAmount || 0) * fromToken.price)}</span>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full p-2 h-8 w-8"
              onClick={handleTokenSwitch}
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <TokenSelector
              token={toToken}
              onTokenChange={setToToken}
              label="To"
            />
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="h-12 text-lg bg-muted/50"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Balance: {formatTokenAmount(toToken.balance)}</span>
              <span>{formatCurrency(Number(toAmount || 0) * toToken.price)}</span>
            </div>
          </div>
        </div>

        {fromAmount && toAmount && (
          <Card className="p-3 bg-muted/50">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exchange Rate</span>
                <span>1 {fromToken.symbol} = {((toToken.price / fromToken.price) * Number(toAmount) / Number(fromAmount)).toFixed(6)} {toToken.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Slippage Tolerance</span>
                <span>{slippage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network Fee</span>
                <span>~$2.50</span>
              </div>
            </div>
          </Card>
        )}

        <Button 
          className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={handleSwap}
          disabled={!fromAmount || !toAmount || swapping || !state.wallet.isConnected}
        >
          {swapping ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Swapping...
            </>
          ) : !state.wallet.isConnected ? (
            'Connect Wallet to Swap'
          ) : (
            'Swap Tokens'
          )}
        </Button>

        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-blue-500/10 p-3 rounded-lg">
          <Info className="w-4 h-4 text-blue-500" />
          <span>This is a simulation. No real tokens will be swapped.</span>
        </div>
      </CardContent>
    </Card>
  );
};