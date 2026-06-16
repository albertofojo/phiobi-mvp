import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/database';
import { Database as LucideDatabase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
};

type Asset = Database['public']['Tables']['assets']['Row'];

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol', { ascending: true });

  if (error) {
    console.error('Error fetching assets:', error);
  }

  const assetList: Asset[] = assets || [];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold text-white tracking-tight">Market Explorer</h1>
          <p className="text-sm text-gray-400 mt-1">
            Browse and discover assets in the Spanish stock market.
          </p>
        </header>

        {assetList.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border border-gray-800 rounded-lg bg-[#111111] text-center">
            <LucideDatabase className="w-8 h-8 text-gray-500 mb-4" />
            <h2 className="text-lg font-medium text-gray-300 mb-2">No assets found</h2>
            <p className="text-sm text-gray-500 max-w-md">
              The market is currently empty. Assets will appear here once they are populated in the database.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-800 rounded-lg">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-gray-400 uppercase bg-[#111] border-b border-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Name</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Market</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {assetList.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-[#161616] transition-colors group"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-200 border border-gray-700">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-300 group-hover:text-white transition-colors truncate max-w-[200px] sm:max-w-none">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-500">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 text-gray-400">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 font-mono text-gray-300">
                        {asset.last_price !== null && asset.last_price !== undefined
                          ? new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(asset.last_price)
                          : '-'}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
