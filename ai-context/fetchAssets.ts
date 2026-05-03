/**
 * Script to dynamically fetch ALL Spanish market stocks (IBEX 35, Mercado Continuo, BME Growth)
 * using an open screener endpoint (TradingView) to bypass Yahoo Finance / EODHD authentication limits.
 *
 * Usage:
 *   npm install node-fetch@2
 *   npx ts-node ai-context/fetchAssets.ts
 */

import fetch from 'node-fetch';
import * as fs from 'fs';

interface Asset {
  symbol: string;
  name: string;
  sector: string;
  market: string;
}

export async function fetchSpanishAssets(): Promise<Asset[]> {
  console.log("Fetching assets for Spanish Markets from open screener API...");

  const query = {
    "filter": [
        {"left": "exchange", "operation": "equal", "right": "BME"}
    ],
    "options": {"lang": "en"},
    "markets": ["spain"],
    "symbols": {"query": {"types": ["stock"]}, "tickers": []},
    "columns": ["name", "description", "sector", "market_cap_basic"],
    "sort": {"sortBy": "name", "sortOrder": "asc"},
    "range": [0, 500] // More than enough for the ~250 BME stocks
  };

  const assets: Asset[] = [];

  try {
    const response = await fetch("https://scanner.tradingview.com/spain/scan", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
        method: "POST"
    });

    if (response.status !== 200) {
        throw new Error(`Screener API returned ${response.status}`);
    }

    const data: any = await response.json();

    // Some known IBEX 35 mapping since TradingView doesn't explicitly flag the index
    const ibex35 = ['ITX', 'SAN', 'IBE', 'BBVA', 'AENA', 'AMS', 'CABK', 'FER', 'REP', 'NTGY', 'TEF', 'ELE', 'ACS', 'IAG', 'RED', 'BKT', 'MAP', 'ENG', 'ROVI', 'LOG', 'ANA', 'MRL', 'COL', 'FLUI', 'GRF', 'SAB', 'ACX', 'MEL', 'SACY', 'UNI'];

    // Remove known obsolete/duplicate BME tickers that sometimes show in TV scan
    const obsolete = ['BCH', 'CEL', 'FDR'];

    for (const item of data.data || []) {
        const tvSymbol = item.d[0]; // e.g. 'SAN'
        const name = item.d[1] || tvSymbol;
        const sector = item.d[2] || 'Unknown';
        const marketCap = item.d[3] || 0;

        // Skip non-stocks or warrants if any snuck through (heuristics on name)
        if (name.includes('WARRANT') || name.includes('BONO')) {
            continue;
        }

        if (obsolete.includes(tvSymbol)) continue;

        // Convert to Yahoo / requested format TICKER.MC
        const symbol = `${tvSymbol}.MC`;

        let market = 'Mercado Continuo';
        if (ibex35.includes(tvSymbol)) {
            market = 'IBEX 35';
        } else if (marketCap > 0 && marketCap < 100000000) {
            // Rough BME Growth heuristic
            market = 'BME Growth';
        }

        assets.push({
            symbol,
            name: name.replace(/'/g, "''"), // SQL escaping
            sector: sector.replace(/'/g, "''"),
            market
        });
    }

  } catch (error) {
    console.error("Error fetching from Screener API:", error);
  }

  return assets;
}

export async function generateSqlSeed() {
    const assets = await fetchSpanishAssets();

    if (assets.length === 0) {
        console.warn("No assets retrieved. Check API limits or network.");
        return;
    }

    let sqlContent = "-- Seed data for public.assets (Spanish Stock Market)\n";
    sqlContent += "-- Dynamically generated from TradingView Screener\n\n";
    sqlContent += "INSERT INTO public.assets (symbol, name, sector, market) VALUES\n";

    const values = assets.map(a => `('${a.symbol}', '${a.name}', '${a.sector}', '${a.market}')`);

    sqlContent += values.join(",\n");
    sqlContent += "\nON CONFLICT (symbol) DO NOTHING;\n";

    fs.writeFileSync('ai-context/seed_assets.sql', sqlContent);
    console.log(`Generated ai-context/seed_assets.sql with ${assets.length} assets.`);
}

// Execute if run directly
if (typeof require !== 'undefined' && require.main === module) {
    generateSqlSeed();
}
