import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Search } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Market Explorer for PHIOBI, an investor-first forum.",
};

export default async function AssetsPage() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase
    .from("assets")
    .select("*")
    .eq("is_active", true)
    .order("symbol");

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Market Explorer</h1>
          <p className="text-gray-400">
            Browse and analyze companies from the Spanish market.
          </p>
        </div>

        {error ? (
          <div className="bg-red-950/50 border border-red-900 text-red-400 p-4 rounded-md">
            Failed to load market data. Please try again later.
          </div>
        ) : !assets || assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#111111] rounded-lg border border-gray-800">
            <Search className="w-12 h-12 text-gray-600 mb-4" />
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              The market is empty
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              There are currently no active assets in the database. Be the first to
              populate the market and start your investment thesis.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-800 rounded-lg bg-[#111111]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#1A1A1A] border-b border-gray-800 text-gray-400 font-medium">
                <tr>
                  <th className="px-6 py-4">Ticker</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4 hidden md:table-cell">Sector</th>
                  <th className="px-6 py-4">Market</th>
                  <th className="px-6 py-4 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="hover:bg-[#1A1A1A] transition-colors group"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700 group-hover:bg-gray-700 group-hover:text-white transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4 font-medium text-gray-200 group-hover:text-white transition-colors truncate max-w-[200px] sm:max-w-xs"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4 text-gray-400"
                      >
                        {asset.sector || "—"}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4 text-gray-400"
                      >
                        {asset.market || "—"}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4 font-mono text-gray-300"
                      >
                        {asset.last_price !== null
                          ? new Intl.NumberFormat("es-ES", {
                              style: "currency",
                              currency: "EUR",
                            }).format(asset.last_price)
                          : "—"}
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
