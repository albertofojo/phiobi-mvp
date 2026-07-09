import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { TrendingUp, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Explore the Spanish stock market assets (IBEX 35, Mercado Continuo, BME Growth).",
};

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from("assets")
    .select("symbol, name, sector, market, last_price, is_active")
    .eq("is_active", true)
    .order("symbol");

  if (error) {
    console.error("Error fetching assets:", error);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-gray-400" />
              Market Explorer
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Spanish stock market assets and real-time insights.
            </p>
          </div>
        </header>

        {(!assets || assets.length === 0) ? (
          <div className="flex flex-col items-center justify-center p-12 bg-[#111] rounded-lg border border-gray-800/60">
            <AlertCircle className="w-10 h-10 text-gray-500 mb-4" />
            <h2 className="text-lg font-medium text-gray-300">No assets found</h2>
            <p className="text-sm text-gray-500 mt-2 text-center max-w-md">
              The market explorer is currently empty. Assets will appear here once the market database is populated.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-800/60 bg-[#111]">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-800/60 text-xs font-medium text-gray-400 uppercase tracking-wider">
                  <th className="px-4 py-3">Ticker</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Sector</th>
                  <th className="px-4 py-3 hidden md:table-cell">Market</th>
                  <th className="px-4 py-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {assets.map((asset) => (
                  <tr
                    key={asset.symbol}
                    className="group hover:bg-[#1A1A1A] transition-colors"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-300">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-sm font-medium text-gray-200 truncate max-w-[150px] sm:max-w-[250px]"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-sm text-gray-400"
                      >
                        {asset.sector || "—"}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-sm text-gray-400"
                      >
                        {asset.market || "—"}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-sm text-right font-mono"
                      >
                        {asset.last_price != null ? (
                          <span>€{Number(asset.last_price).toFixed(3)}</span>
                        ) : (
                          <span className="text-gray-600">—</span>
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
  );
}
