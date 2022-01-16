import styled from 'styled-components';

const Button = styled.button`
  background-color: var(--bluepop);
  color: #fff;
  border: none;
  padding: 10px;
  margin: 5px;

  &:hover {
    background-color: #fff;
    color: var(--bluepop);
    border: 1px solid var(--bluepop);
  }

  &:disabled {
    background-color: grey;
  }
`;

export default Button;
