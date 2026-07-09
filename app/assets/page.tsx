import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/database';
import { Building2, SearchX } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora y descubre activos en el mercado español.',
};

type Asset = Database['public']['Tables']['assets']['Row'];

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol');

  if (error) {
    console.error('Error fetching assets:', error);
    // In a real scenario, you might want to show a more robust error UI or throw it to an error boundary
  }

  const assetList: Asset[] = assets || [];

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-neutral-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Market Explorer</h1>
          <p className="text-neutral-400 text-sm">Directorio de activos del mercado español.</p>
        </header>

        {assetList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 border border-neutral-800/50 rounded-lg bg-neutral-900/20">
            <SearchX className="w-12 h-12 text-neutral-600 mb-4" />
            <h2 className="text-lg font-medium text-neutral-300 mb-2">No hay activos disponibles</h2>
            <p className="text-neutral-500 text-sm text-center max-w-md">
              El mercado está vacío. Invita a la comunidad a poblar la base de datos con los primeros activos.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-neutral-800/60 rounded-md bg-neutral-900/30">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-900/80 text-neutral-400 border-b border-neutral-800 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-4 py-3 font-medium">Ticker</th>
                  <th className="px-4 py-3 font-medium">Empresa</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Mercado</th>
                  <th className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {assetList.map((asset) => (
                  <tr key={asset.id} className="hover:bg-neutral-800/30 transition-colors group">
                    <td className="px-4 py-0">
                      <Link href={`/assets/${asset.symbol}`} className="block py-3 font-mono">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700/50 group-hover:bg-neutral-700/50 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="px-4 py-0">
                      <Link href={`/assets/${asset.symbol}`} className="block py-3 text-neutral-200 group-hover:text-white flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-neutral-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {asset.name}
                      </Link>
                    </td>
                    <td className="px-4 py-0 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block py-3 text-neutral-400">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="px-4 py-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block py-3 text-neutral-500">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="px-4 py-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block py-3 font-mono text-neutral-300">
                        {asset.last_price != null ? `${asset.last_price.toFixed(2)}€` : '-'}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
