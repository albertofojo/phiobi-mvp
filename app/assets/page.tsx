import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Activity } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Explorer | PHIOBI",
};

export default async function AssetsPage() {
  const supabase = await createClient();

  const { data: assets, error } = await supabase
    .from("assets")
    .select("*")
    .order("symbol");

  if (error) {
    console.error("Error fetching assets:", error);
    return (
      <div className="flex h-full min-h-[50vh] items-center justify-center p-4">
        <p className="text-red-500">Error loading market data.</p>
      </div>
    );
  }

  const isEmpty = !assets || assets.length === 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Market Explorer</h1>
            <p className="mt-1 text-sm text-gray-400">
              Browse Spanish stock market assets (IBEX 35, Mercado Continuo, BME Growth).
            </p>
          </div>
        </div>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/50 py-24 text-center">
            <Activity className="h-10 w-10 text-neutral-600 mb-4" />
            <h3 className="text-lg font-medium text-white">No assets found</h3>
            <p className="mt-2 text-sm text-neutral-400 max-w-sm">
              The market is currently empty. Populate the database to start tracking and analyzing assets.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-neutral-800 bg-[#0A0A0A]">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-900/80 text-xs uppercase text-neutral-400 border-b border-neutral-800">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">Ticker</th>
                  <th scope="col" className="px-4 py-3 font-medium">Company</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th scope="col" className="px-4 py-3 font-medium hidden md:table-cell">Market</th>
                  <th scope="col" className="px-4 py-3 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-neutral-900/50 transition-colors group">
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full">
                        <span className="inline-flex items-center rounded-md bg-neutral-800 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-neutral-700">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full text-white font-medium group-hover:text-green-400 transition-colors">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full text-neutral-400">
                        {asset.sector || "-"}
                      </Link>
                    </td>
                    <td className="p-0 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full text-neutral-400">
                        {asset.market || "-"}
                      </Link>
                    </td>
                    <td className="p-0 text-right">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3 h-full w-full font-mono text-white">
                        {asset.last_price != null ? (
                          <span>{Number(asset.last_price).toFixed(2)} &euro;</span>
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
        )}
      </div>
    </div>
  );
}
