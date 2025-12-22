import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface HeaderProps {
  onAddPaymentClick: () => void;
}

export function Header({ onAddPaymentClick }: HeaderProps) {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Loan Management System</h1>
          <p className="text-sm text-muted-foreground">
            View and manage loans and their payment status
          </p>
        </div>
        <Button onClick={onAddPaymentClick} size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Add Payment
        </Button>
      </div>
    </header>
  );
}
