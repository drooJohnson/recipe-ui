import React from 'react';
import styled from 'styled-components';

const LayoutDiv = styled.div`
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  overflow: auto;
`

const ContentDiv = styled.div`
  width: 1024px;
  min-width: 720px;
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
