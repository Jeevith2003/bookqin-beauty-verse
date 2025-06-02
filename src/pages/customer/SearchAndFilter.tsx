
import React from 'react';
import CustomerLayout from '@/components/layout/CustomerLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, MapPin, Star } from 'lucide-react';

const SearchAndFilter: React.FC = () => {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search services, salons..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-bookqin-secondary"
            />
          </div>
          <button className="p-3 bg-bookqin-secondary text-white rounded-xl">
            <Filter className="h-5 w-5" />
          </button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-center py-8">Start searching to see results</p>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
};

export default SearchAndFilter;
