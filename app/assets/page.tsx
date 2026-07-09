import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Activity } from "lucide-react";

export const metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Explore Spanish stock market assets (IBEX 35, Mercado Continuo, BME Growth).",
};

export default async function AssetsPage() {
  const supabase = await createClient();
  const { data: assets } = await supabase.from("assets").select("*").order("symbol");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Market Explorer</h1>
            <p className="text-sm text-neutral-500 mt-1">
              Spanish stock market assets (IBEX 35, Mercado Continuo, BME Growth).
            </p>
          </div>
        </header>

        {!assets || assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center border border-neutral-800 bg-neutral-900/50 rounded-lg py-20 px-4 text-center">
            <Activity className="w-10 h-10 text-neutral-600 mb-4" />
            <h2 className="text-lg font-medium text-white mb-2">No assets found</h2>
            <p className="text-sm text-neutral-400 max-w-md">
              The market database is currently empty. Please populate the market with assets to start exploring.
            </p>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-lg overflow-hidden bg-[#0A0A0A]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-neutral-900 border-b border-neutral-800 text-neutral-400">
                  <tr>
                    <th className="font-medium px-4 py-3">Ticker</th>
                    <th className="font-medium px-4 py-3">Name</th>
                    <th className="font-medium px-4 py-3 hidden md:table-cell">Sector</th>
                    <th className="font-medium px-4 py-3">Market</th>
                    <th className="font-medium px-4 py-3 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/50">
                  {assets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-neutral-900/50 transition-colors group">
                      <td className="p-0">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 font-mono text-xs font-semibold text-neutral-300"
                        >
                          <span className="px-2 py-1 rounded bg-neutral-800 border border-neutral-700 text-white">
                            {asset.symbol}
                          </span>
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 text-neutral-300 truncate max-w-[150px] sm:max-w-xs"
                        >
                          {asset.name}
                        </Link>
                      </td>
                      <td className="p-0 hidden md:table-cell">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 text-neutral-500"
                        >
                          {asset.sector || "-"}
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 text-neutral-400"
                        >
                          {asset.market || "-"}
                        </Link>
                      </td>
                      <td className="p-0 text-right">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-4 py-3 font-mono text-neutral-200"
                        >
                          {asset.last_price !== null ? (
                            <span>{Number(asset.last_price).toFixed(2)}</span>
                          ) : (
                            <span className="text-neutral-600">-</span>
                          )}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
