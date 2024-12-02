import { Api } from "datatables.net-bs5";

export interface TableContextType {
  data: Api | null | undefined;
  setData: (table: Api | null | undefined) => void;
}
