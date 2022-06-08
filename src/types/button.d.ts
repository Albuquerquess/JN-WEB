export interface IButtonProps {
  color?: string;
  label?: string;
  background?: string;
  navigateTo?: string;
  handleClick?(): void;
}
export interface ISwitchProps {
  label?: string;
  status: boolean;
  navigateTo?: string;
  handleOnActivate?(): void;
  handleOnDisable?(): void;
  disabled?: boolean;
}
