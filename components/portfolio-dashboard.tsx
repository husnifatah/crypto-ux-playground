'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, RotateCcw } from 'lucide-react';
import { useApp } from '@/contexts/app-context';
import { formatCurrency, formatTokenAmount, formatAddress } from '@/lib/mock-data';

export const PortfolioDashboard = () => {
  const { state } = useApp();

  const totalValue = state.tokens.reduce((sum, token) => sum + (token.balance * token.price), 0);
  const totalChange24h = state.tokens.reduce((sum, token) => sum + (token.balance * token.price * token.change24h / 100), 0);
  const totalChangePercent = (totalChange24h / totalValue) * 100;

  const TokenRow = ({ token }: { token: any }) => (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{token.logo}</span>
        <div>
          <div className="font-medium">{token.symbol}</div>
          <div className="text-sm text-muted-foreground">{token.name}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-medium">{formatTokenAmount(token.balance)} {token.symbol}</div>
        <div className="text-sm text-muted-foreground">{formatCurrency(token.balance * token.price)}</div>
      </div>
      <div className="text-right">
        <div className="font-medium">{formatCurrency(token.price)}</div>
        <div className={`text-sm flex items-center gap-1 ${token.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {token.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(token.change24h).toFixed(2)}%
        </div>
      </div>
    </div>
  );

  const TransactionRow = ({ transaction }: { transaction: any }) => {
    const getIcon = () => {
      switch (transaction.type) {
        case 'swap': return <RotateCcw className="w-4 h-4" />;
        case 'send': return <ArrowUpRight className="w-4 h-4" />;
        case 'receive': return <ArrowDownLeft className="w-4 h-4" />;
      }
    };

    const getStatusColor = () => {
      switch (transaction.status) {
        case 'completed': return 'bg-green-500/10 text-green-500';
        case 'pending': return 'bg-yellow-500/10 text-yellow-500';
        case 'failed': return 'bg-red-500/10 text-red-500';
      }
    };

    return (
      <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-muted/50">
            {getIcon()}
          </div>
          <div>
            <div className="font-medium capitalize">{transaction.type}</div>
            <div className="text-sm text-muted-foreground">
              {formatAddress(transaction.hash)}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium">
            {transaction.type === 'swap' 
              ? `${formatTokenAmount(transaction.amount)} ${transaction.fromToken?.symbol} → ${transaction.toToken?.symbol}`
              : `${formatTokenAmount(transaction.amount)} ${(transaction.fromToken || transaction.toToken)?.symbol}`
            }
          </div>
          <div className="text-sm text-muted-foreground">
            {transaction.timestamp.toLocaleString()}
          </div>
        </div>
        <Badge className={getStatusColor()}>
          {transaction.status}
        </Badge>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold">{formatCurrency(totalValue)}</div>
            <div className={`flex items-center gap-2 text-sm ${totalChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalChangePercent >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span>{formatCurrency(Math.abs(totalChange24h))} ({Math.abs(totalChangePercent).toFixed(2)}%)</span>
              <span className="text-muted-foreground">24h</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tokens" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tokens" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {state.tokens.map((token) => (
                <TokenRow key={token.id} token={token} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {state.transactions.map((transaction) => (
                <TransactionRow key={transaction.id} transaction={transaction} />
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};