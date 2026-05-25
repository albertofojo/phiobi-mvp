import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Database } from '@/types/database'
import { Building2, BarChart3 } from 'lucide-react'

export const metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Explora los activos del mercado en PHIOBI",
}

type Asset = Database['public']['Tables']['assets']['Row']

export default async function MarketExplorerPage() {
  const supabase = await createClient()

  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .order('symbol', { ascending: true })

  if (error) {
    console.error('Error fetching assets:', error)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col gap-2 border-b border-gray-800 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-gray-400" />
            Market Explorer
          </h1>
          <p className="text-sm text-gray-400">
            Directorio de activos del mercado español.
          </p>
        </header>

        {!assets || assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-gray-800 rounded-lg bg-gray-900/20">
            <Building2 className="w-12 h-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-300">No hay activos registrados</h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm text-center">
              El mercado está vacío. Invita a la comunidad a poblar el directorio o contacta con administración para añadir empresas.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-800 rounded-md bg-[#0f0f0f]">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 uppercase bg-[#141414] border-b border-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Empresa</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Mercado</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-800/30 transition-colors group">
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 group-hover:border-gray-500 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full text-gray-300 group-hover:text-white transition-colors">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full text-gray-500">
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full text-gray-400">
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full font-mono text-gray-300">
                        {asset.last_price !== null ? (
                          <span className="flex items-center justify-end gap-1.5">
                            {Number(asset.last_price).toFixed(2)} €
                          </span>
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
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
  )
}
