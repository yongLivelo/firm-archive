export interface Row {
  code: string;
  date: string;
  flow: string;
  mode: string;
  tags: Tags[] | null;
  amount: number;
  description: string;
}

export interface Tags {
  category: string | null;
  selected?: string;
}
