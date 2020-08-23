import React from "react";
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { Link } from "react-router-dom";

const ViewportWrapper = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex:1;
`

const Viewport = ({children}) => {
  return(
    <ViewportWrapper>
      {children}
    </ViewportWrapper>
  )
}

export default Viewport;
