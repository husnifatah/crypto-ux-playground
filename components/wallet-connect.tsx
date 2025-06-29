'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Wallet, Loader2, Copy, Check } from 'lucide-react';
import { useWallet } from '@/contexts/app-context';
import { formatAddress } from '@/lib/mock-data';
import { useState } from 'react';

const WalletConnectModal = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const walletOptions = [
    { name: 'MetaMask', icon: '🦊', popular: true },
    { name: 'WalletConnect', icon: '🔗', popular: true },
    { name: 'Coinbase Wallet', icon: '🟦', popular: false },
    { name: 'Rainbow', icon: '🌈', popular: false }
  ];

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Connect Wallet
        </DialogTitle>
      </DialogHeader>
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Choose your preferred wallet to connect to the app
        </p>
        {walletOptions.map((wallet) => (
          <WalletOption key={wallet.name} {...wallet} />
        ))}
        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground text-center">
            This is a simulation. No real wallet connection will be made.
          </p>
        </div>
      </div>
    </DialogContent>
  );
};

const WalletOption = ({ name, icon, popular }: { name: string; icon: string; popular: boolean }) => {
  const { connectWallet, wallet } = useWallet();

  return (
    <Button
      variant="outline"
      className="w-full justify-start h-auto p-4 hover:bg-accent/50 transition-colors"
      onClick={connectWallet}
      disabled={wallet.connecting}
    >
      <div className="flex items-center gap-3 w-full">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className="font-medium">{name}</span>
            {popular && (
              <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
                Popular
              </span>
            )}
          </div>
        </div>
        {wallet.connecting && <Loader2 className="w-4 h-4 animate-spin" />}
      </div>
    </Button>
  );
};

export const WalletConnect = () => {
  const { wallet, disconnectWallet } = useWallet();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (wallet.isConnected && wallet.address) {
    return (
      <div className="flex items-center gap-2">
        <Card className="px-3 py-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-mono">{formatAddress(wallet.address)}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={copyAddress}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </Button>
          </div>
        </Card>
        <Button variant="outline" size="sm" onClick={disconnectWallet}>
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <WalletConnectModal />
    </Dialog>
  );
};