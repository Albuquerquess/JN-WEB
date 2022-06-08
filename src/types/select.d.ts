export type IOption = {
  value: string;
  label: any;
  priceIndex: number;
};

export interface ISelectProps {
  options: IOption[];
  defaultValue: IOption;
  placeholder: string | undefined;
  disable?: boolean;
  setValue(value: string): void;
  menuDirection: 'bottom' | 'top' | 'auto';
  id?: string;
}
