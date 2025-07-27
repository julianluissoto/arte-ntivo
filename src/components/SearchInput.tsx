
// src/components/SearchInput.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <h3  className="text-xl font-bold font-headline mb-6 text-center text-primary">Que queres personalizar?</h3>
      <Input
        type="search"
        placeholder="Buscar productos..."
        className="w-full pr-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-primary"
        aria-label="Buscar"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
}
