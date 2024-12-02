import { Flow } from "./Flow";

export interface Row {
  code: string;
  date: string;
  flow: Flow;
  mode: string;
  amount: number;
  description: string;
}
