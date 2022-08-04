import styled from "styled-components";

export const MainInput = styled.input<{ error?: boolean | string }>`
  border: ${({ error }) => (error ? "1px solid #ff3d47" : "1px solid #718096")};
  &:focus {
    border: 1px solid #f39e28;
    /* box-shadow: 3px 4px 10px rgba(237, 56, 51, 0.25); */
  }
`;

export const PasswordInput = styled.div<{ error?: boolean | string }>`
  &:focus-within {
    border: 1px solid #f39e28;
    box-shadow: 3px 4px 10px rgba(237, 56, 51, 0.25);
  }
  border: ${({ error }) => (error ? "1px solid #ff3d47" : "1px solid #718096")};
`;
