export type IOption = {
  value: string;
  label: JSX.Element;
  priceIndex: number;
};

export interface ISelectProps {
  options: IOption[];
  defaultValue: IOption;
  placeholder: string | undefined;
  setValue(value: string): void;
  menuDirection: 'bottom' | 'top' | 'auto';
}
