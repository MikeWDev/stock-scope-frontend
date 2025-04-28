// types
export interface Stock {
  name: string;
  symbol: string;
  currentPrice: number;
  percentChange: string;
  high: number;
  low: number;
}
export interface SingleStock {
  name: string;
  symbol: string;
  currentPrice: number;
  percentChange: string;
  high: number;
  low: number;
}
export interface FinnhubCandleResponse {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: "ok" | "no_data";
  t: number[];
  v: number[];
}
