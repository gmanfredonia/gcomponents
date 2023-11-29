export interface IProduct {
  id: number;
  name: string;
  description: string;
  height: number | undefined;
  width: number | undefined;
  depth: number | undefined;
  price: number;
  useType: string;
  enabled: boolean;
  validFrom: Date;
  categoryId: number;
}
