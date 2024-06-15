import styled from 'styled-components';
const BotonEstilizado = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ed721a;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
`;

const Button = ({ children, onClick }) => {
  return (
    <BotonEstilizado onClick={onClick}>
      {children}
    </BotonEstilizado>
  );
};

export default Button;
