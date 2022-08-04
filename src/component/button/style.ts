import styled from "styled-components";

export const MainButton = styled.button<{
  disabled?: boolean;
  transparent?: boolean;
}>`
  background: ${({ disabled }) =>
    !disabled ? "#F69F13" : "rgb(229, 229, 229)"};
  cursor: ${({ disabled }) => (!disabled ? "pointer" : null)};
`;
