import React from 'react';
import styled from 'styled-components';

const LayoutDiv = styled.div`
  width:100%;
  max-width:100%;
  display:flex;
  justify-content:center;
  position:relative;
  background:linear-gradient(to bottom, rgba(0,0,0,0.0) 17em, rgba(0,0,0,0.02) 17em);
  flex-grow:1;
`

const ContentDiv = styled.div`
  max-width: 1024px;
  width: 100%;
  padding: 24px;
`

const Layout = ({children}) => {
    return (
      <LayoutDiv>
        <ContentDiv>{children}</ContentDiv>
      </LayoutDiv>
    )
}

export default Layout;
