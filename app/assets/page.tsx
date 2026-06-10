import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { TrendingUp, FolderOpen } from "lucide-react";

export const metadata = {
  title: "Market Explorer | PHIOBI",
};

export default async function AssetsPage() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase
    .from("assets")
    .select("*")
    .order("symbol", { ascending: true });

  if (error) {
    console.error("Error fetching assets:", error);
  }

  const hasAssets = assets && assets.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-neutral-800 pb-4">
          <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-neutral-400" />
            Market Explorer
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Browse and discover active market assets.
          </p>
        </header>

        {!hasAssets ? (
          <div className="flex flex-col items-center justify-center p-16 border border-dashed border-neutral-800 rounded-lg bg-neutral-900/50">
            <FolderOpen className="w-12 h-12 text-neutral-600 mb-4" />
            <h2 className="text-lg font-medium text-neutral-300">No assets found</h2>
            <p className="text-sm text-neutral-500 mt-2 text-center max-w-sm">
              The market is currently empty. Populate the database to start tracking assets.
            </p>
          </div>
        ) : (
          <div className="border border-neutral-800 rounded-md overflow-hidden bg-neutral-900/20">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-900/80 border-b border-neutral-800 text-neutral-400">
                <tr>
                  <th className="font-medium p-0">
                    <div className="px-4 py-3">Ticker</div>
                  </th>
                  <th className="font-medium p-0">
                    <div className="px-4 py-3">Company</div>
                  </th>
                  <th className="font-medium p-0 hidden sm:table-cell">
                    <div className="px-4 py-3">Sector</div>
                  </th>
                  <th className="font-medium p-0 hidden md:table-cell">
                    <div className="px-4 py-3">Market</div>
                  </th>
                  <th className="font-medium p-0 text-right">
                    <div className="px-4 py-3">Price</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/50">
                {assets.map((asset) => (
                  <tr
                    key={asset.id}
                    className="group hover:bg-neutral-800/50 transition-colors"
                  >
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3"
                      >
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-neutral-300 group-hover:text-white transition-colors"
                      >
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-neutral-500"
                      >
                        {asset.sector || "—"}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 text-neutral-500"
                      >
                        {asset.market || "—"}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link
                        href={`/assets/${asset.symbol}`}
                        className="block px-4 py-3 font-mono text-neutral-300"
                      >
                        {asset.last_price !== null
                          ? asset.last_price.toFixed(2)
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
