import { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Market Explorer | PHIOBI",
};

export default async function AssetsPage() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase
    .from("assets")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching assets:", error);
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-100 font-sans p-6 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-medium tracking-tight">Market Explorer</h1>
        </header>

        {!assets || assets.length === 0 ? (
          <div className="border border-white/10 rounded-lg p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-gray-400" />
            </div>
            <h2 className="text-lg font-medium">No assets found</h2>
            <p className="text-sm text-gray-400 max-w-sm">
              The market is currently empty. Populate the database to start tracking Spanish stock market assets.
            </p>
          </div>
        ) : (
          <div className="border border-white/10 rounded-lg overflow-hidden bg-black/50">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-400 uppercase bg-white/5 border-b border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">Ticker</th>
                    <th scope="col" className="px-6 py-3 font-medium">Company</th>
                    <th scope="col" className="px-6 py-3 font-medium hidden sm:table-cell">Sector</th>
                    <th scope="col" className="px-6 py-3 font-medium">Market</th>
                    <th scope="col" className="px-6 py-3 font-medium text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {assets.map((asset) => (
                    <tr
                      key={asset.id}
                      className="group hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-0">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-6 py-4"
                        >
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-200 group-hover:bg-white/20 transition-colors">
                            {asset.symbol}
                          </span>
                        </Link>
                      </td>
                      <td className="p-0">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-6 py-4 font-medium text-gray-200 group-hover:text-white transition-colors truncate max-w-[150px] sm:max-w-[300px]"
                        >
                          {asset.name}
                        </Link>
                      </td>
                      <td className="p-0 hidden sm:table-cell">
                        <Link
                          href={`/assets/${asset.symbol}`}
                          className="block px-6 py-4 text-gray-400 truncate max-w-[200px]"
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
                          className="block px-6 py-4 font-mono text-gray-200"
                        >
                          {asset.last_price !== null ? (
                            <span>{Number(asset.last_price).toFixed(2)}€</span>
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
          </div>
        )}
      </div>
    </div>
  );
}
