import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Market Explorer | PHIOBI',
  description: 'Explora el mercado de valores español con datos de primer nivel.',
}

export default async function MarketExplorerPage() {
  const supabase = await createClient()

  const { data: assets, error } = await supabase
    .from('assets')
    .select('symbol, name, sector, market, last_price')
    .eq('is_active', true)
    .order('symbol', { ascending: true })

  if (error) {
    console.error('Error fetching assets:', error)
    // Para simplificar, si hay error mostraremos el empty state
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">Market Explorer</h1>
          <p className="text-sm text-gray-400">
            Descubre y analiza las principales empresas del mercado.
          </p>
        </header>

        {(!assets || assets.length === 0) ? (
          <div className="border border-gray-800 rounded-lg p-12 text-center bg-[#111111]">
            <h3 className="text-lg font-medium text-white mb-2">El mercado está vacío</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Aún no hay activos registrados en nuestra base de datos. Vuelve pronto para explorar nuevas oportunidades de inversión.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-800 rounded-lg bg-[#0F0F0F]">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-[#1A1A1A] text-gray-400 border-b border-gray-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Empresa</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium">Mercado</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {assets.map((asset) => (
                  <tr
                    key={asset.symbol}
                    className="hover:bg-[#1A1A1A] transition-colors group"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 h-full w-full"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-200 border border-gray-700 group-hover:border-gray-500 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 h-full w-full truncate font-medium text-white"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 h-full w-full text-gray-400"
                      >
                        {asset.sector || '-'}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 h-full w-full text-gray-400"
                      >
                        {asset.market || '-'}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 h-full w-full font-mono font-medium text-gray-200"
                      >
                        {asset.last_price ? `${Number(asset.last_price).toFixed(2)} €` : '-'}
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
