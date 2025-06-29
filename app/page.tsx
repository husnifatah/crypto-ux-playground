'use client';

import React from 'react';
import { Header } from '@/components/header';
import { TokenSwap } from '@/components/token-swap';
import { PortfolioDashboard } from '@/components/portfolio-dashboard';
import { FeatureInfo } from '@/components/feature-info';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '@/contexts/app-context';

export default function Home() {
  const { state } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Explore Web3 UX Patterns
            </h2>
            <p className="text-muted-foreground">
              A safe playground for learning crypto interface design and user flows
            </p>
          </div>

          <Tabs defaultValue="swap" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="swap">Token Swap</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="info">About</TabsTrigger>
            </TabsList>
            
            <TabsContent value="swap" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                  <TokenSwap />
                </div>
                <div className="lg:col-span-2">
                  {state.wallet.isConnected ? (
                    <PortfolioDashboard />
                  ) : (
                    <div className="flex items-center justify-center h-64 text-center">
                      <div>
                        <div className="text-6xl mb-4">🔗</div>
                        <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
                        <p className="text-muted-foreground">
                          Connect a wallet to view your portfolio and transaction history
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="portfolio">
              {state.wallet.isConnected ? (
                <PortfolioDashboard />
              ) : (
                <div className="flex items-center justify-center h-64 text-center">
                  <div>
                    <div className="text-6xl mb-4">👛</div>
                    <h3 className="text-xl font-semibold mb-2">Wallet Required</h3>
                    <p className="text-muted-foreground">
                      Please connect a wallet to view your portfolio
                    </p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="info">
              <FeatureInfo />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}