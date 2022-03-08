export interface IButtonProps {
  label?: string;
  navigateTo?: string;
  handleClick?(): void;
}
export interface ISwitchProps {
  label?: string;
  navigateTo?: string;
  handleOnActivate?(): void;
  handleOnDisable?(): void;
}
