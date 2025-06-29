'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Wallet, ArrowUpDown, PieChart, Shield } from 'lucide-react';

export const FeatureInfo = () => {
  const features = [
    {
      icon: <Wallet className="w-5 h-5" />,
      title: 'Wallet Connection',
      description: 'Experience realistic wallet connection flows without real wallet integration',
      status: 'Interactive'
    },
    {
      icon: <ArrowUpDown className="w-5 h-5" />,
      title: 'Token Swapping',
      description: 'Practice token swap interfaces with live price calculations and slippage controls',
      status: 'Live Simulation'
    },
    {
      icon: <PieChart className="w-5 h-5" />,
      title: 'Portfolio Dashboard',
      description: 'View token balances, transaction history, and portfolio performance',
      status: 'Real-time Data'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Safe Learning',
      description: 'All interactions are simulated - no real crypto or wallet connections',
      status: 'Educational'
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          About This Playground
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          This is a safe, interactive environment for exploring Web3 user interfaces. 
          All wallet connections, token swaps, and transactions are simulated using mock data.
        </p>
        
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="p-4 rounded-lg border bg-card">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{feature.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {feature.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                Educational Purpose
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                This playground is designed for learning and prototyping. It demonstrates common 
                crypto UX patterns without any real blockchain interactions or financial risk.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};