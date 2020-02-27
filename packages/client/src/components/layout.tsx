import styled from 'styled-components';

const Layout = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 0 15px;
  margin: 0 auto;
  background: ${({ theme }) => theme.background};
`;

export default Layout;
