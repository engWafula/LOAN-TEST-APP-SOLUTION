import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface HeaderProps {
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function Header({ onRefresh, isLoading = false }: HeaderProps) {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Loan Management System</h1>
          <p className="text-sm text-muted-foreground">
            View and manage loans and their payment status
          </p>
        </div>
        {onRefresh && (
          <Button 
            onClick={onRefresh} 
            size="lg" 
            variant="outline"
            disabled={isLoading}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        )}
      </div>
    </header>
  );
}
