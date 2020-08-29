import React from 'react';
import styled from 'styled-components';

const TextPanelDiv = styled.div`
  display:flex;
  flex:3;
  flex-direction:column;
  justify-content:flex-end;
`

const TextPanel = ({children}) => {
  return(
    <TextPanelDiv>
      {children}
    </TextPanelDiv>
  )
}

export default TextPanel
