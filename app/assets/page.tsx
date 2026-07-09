import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { PackageOpen, TrendingUp } from 'lucide-react'

export const metadata = {
  title: "Market Explorer | PHIOBI",
}

export default async function MarketExplorerPage() {
  const supabase = await createClient()

  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('market', { ascending: true })
    .order('symbol', { ascending: true })

  if (error) {
    console.error("Error fetching assets:", error)
  }

  const hasAssets = assets && assets.length > 0

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 font-sans p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 border-b border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-400" />
            <h1 className="text-xl font-semibold tracking-tight text-gray-100">Market Explorer</h1>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Listado completo de activos financieros y tickers del mercado español.
          </p>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-gray-800 rounded-lg">
            <PackageOpen className="w-10 h-10 text-gray-600 mb-3" />
            <h3 className="text-base font-medium text-gray-300">Mercado vacío</h3>
            <p className="text-sm text-gray-500 text-center mt-1 max-w-sm">
              No hay activos disponibles en este momento. El mercado será poblado pronto con datos actualizados.
            </p>
          </div>
        ) : (
          <div className="border border-gray-800 rounded-lg overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 px-4 py-3 bg-gray-900/40 border-b border-gray-800 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-1">Ticker</div>
              <div className="col-span-1 md:col-span-2">Empresa</div>
              <div className="col-span-1 hidden md:block">Sector</div>
              <div className="col-span-1 hidden md:block">Mercado</div>
              <div className="col-span-1 text-right">Precio</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-800/50">
              {assets.map((asset) => (
                <Link
                  key={asset.id}
                  href={`/assets/${asset.symbol}`}
                  className="grid grid-cols-3 md:grid-cols-6 gap-4 px-4 py-3 items-center hover:bg-gray-800/30 transition-colors group"
                >
                  <div className="col-span-1 flex items-center">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 group-hover:border-gray-500 group-hover:text-white transition-colors">
                      {asset.symbol}
                    </span>
                  </div>

                  <div className="col-span-1 md:col-span-2 flex items-center text-sm font-medium text-gray-300 truncate group-hover:text-gray-100 transition-colors">
                    <span className="truncate" title={asset.name}>{asset.name}</span>
                  </div>

                  <div className="col-span-1 hidden md:flex items-center text-sm text-gray-400 truncate">
                    <span className="truncate" title={asset.sector || '—'}>{asset.sector || '—'}</span>
                  </div>

                  <div className="col-span-1 hidden md:flex items-center text-sm text-gray-400 truncate">
                    <span className="truncate">{asset.market || '—'}</span>
                  </div>

                  <div className="col-span-1 flex items-center justify-end text-sm font-mono text-gray-300 group-hover:text-white transition-colors">
                    {asset.last_price !== null && asset.last_price !== undefined ? (
                      <span>{Number(asset.last_price).toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}</span>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
