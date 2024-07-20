import React from 'react';
import styled from 'styled-components';

const SideBarContainer = styled.div`
  width: 200px;
  background-color: ${({ theme }) => theme.sidebarBackground};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  border-right: 1px solid ${({ theme }) => theme.separeteBorder}
`;

const SideBar = () => {
  return (
    <SideBarContainer></SideBarContainer>
  );
};

export default SideBar;
