import React from 'react';
import styled from 'styled-components';

const LayoutDiv = styled.div`
  width:100%;
  max-width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  overflow-x: hidden;
  position:relative;
  &::before{
    content:'';
    display:block;
    position:absolute;
    width:100%;
    height:100%;
    top:20em;
    bottom:0;
    background-color:rgba(0,0,0,0.02);
  }
`

const ContentDiv = styled.div`
  max-width: 100%;
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
