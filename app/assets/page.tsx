import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";

export const metadata = {
  title: "Market Explorer | PHIOBI",
  description: "Explore assets on the market",
};

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from("assets")
    .select("*")
    .order("symbol");

  if (error) {
    console.error("Error fetching assets:", error);
  }

  const hasAssets = assets && assets.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
              <Activity className="w-6 h-6 text-emerald-500" />
              Market Explorer
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Spanish stock market assets (IBEX 35, Mercado Continuo, BME Growth)
            </p>
          </div>
        </header>

        {!hasAssets ? (
          <div className="border border-gray-800 rounded-lg p-12 text-center bg-[#111111]">
            <Activity className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-300 mb-2">No assets found</h3>
            <p className="text-sm text-gray-500">
              The market is currently empty. Assets will appear here once populated in the database.
            </p>
          </div>
        ) : (
          <div className="border border-gray-800 rounded-lg overflow-hidden bg-[#111111]">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#1A1A1A] text-gray-400 uppercase text-xs tracking-wider border-b border-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium">Asset</th>
                  <th scope="col" className="px-6 py-4 font-medium hidden md:table-cell">Sector</th>
                  <th scope="col" className="px-6 py-4 font-medium">Market</th>
                  <th scope="col" className="px-6 py-4 font-medium text-right">Price</th>
                  <th scope="col" className="px-6 py-4">
                    <span className="sr-only">Details</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="group hover:bg-[#1A1A1A] transition-colors"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4 h-full w-full"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center rounded-md bg-gray-800/80 px-2 py-1 text-xs font-mono font-medium text-gray-300 ring-1 ring-inset ring-gray-700/50">
                            {asset.symbol}
                          </span>
                          <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                            {asset.name}
                          </span>
                        </div>
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4 h-full w-full text-gray-400"
                      >
                        {asset.sector || "—"}
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4 h-full w-full text-gray-400"
                      >
                        {asset.market || "—"}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4 h-full w-full"
                      >
                        <span className="font-mono font-medium text-gray-200">
                          {asset.last_price !== null
                            ? `€${asset.last_price.toFixed(2)}`
                            : "—"}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-6 py-4 h-full w-full text-gray-500 group-hover:text-emerald-500 transition-colors"
                      >
                        <ArrowRight className="w-4 h-4 ml-auto" />
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
