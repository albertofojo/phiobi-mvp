import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { FolderOpen } from "lucide-react";

export const metadata = {
  title: "Market Explorer | PHIOBI",
};

export default async function AssetsPage() {
  const supabase = await createClient();
  const { data: assets, error } = await supabase.from("assets").select("*").order("symbol");

  if (error) {
    console.error("Error fetching assets:", error);
  }

  const hasAssets = assets && assets.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-medium mb-6 text-white">Market Explorer</h1>

        <div className="overflow-x-auto border border-gray-800 rounded-md">
          {hasAssets ? (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-400 bg-gray-900 border-b border-gray-800 uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium">Ticker</th>
                  <th className="px-4 py-3 font-medium">Empresa</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">Sector</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Mercado</th>
                  <th className="px-4 py-3 font-medium text-right">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {assets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-900/50 transition-colors group">
                    <td className="p-0">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-200 border border-gray-700 group-hover:border-gray-500 transition-colors">
                          {asset.symbol}
                        </span>
                      </Link>
                    </td>
                    <td className="p-0 font-medium text-white">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        {asset.name}
                      </Link>
                    </td>
                    <td className="p-0 text-gray-400 hidden sm:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        {asset.sector || "—"}
                      </Link>
                    </td>
                    <td className="p-0 text-gray-400 hidden md:table-cell">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        {asset.market || "—"}
                      </Link>
                    </td>
                    <td className="p-0 text-right font-mono">
                      <Link href={`/assets/${asset.symbol}`} className="block px-4 py-3">
                        {asset.last_price ? (
                          <span>{Number(asset.last_price).toFixed(2)}</span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <FolderOpen className="w-12 h-12 text-gray-700 mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-1">El mercado está vacío</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                No hay activos registrados en la base de datos. Comienza a poblar el mercado para ver la lista de empresas.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
