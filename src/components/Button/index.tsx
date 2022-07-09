import { ButtonContainer, ButtonVariantColor } from "./styles";

interface IButtonProps {
  variant?: ButtonVariantColor;
}

export function Button({ variant = "primary" }: IButtonProps) {
  return <ButtonContainer variant={variant}>Enviar</ButtonContainer>;
}
