import React from 'react';
import styled from 'styled-components';
import Navigation from './Navigation/Navigation';
import Viewport from './Viewport';

export const LayoutContainer = styled.div`
  height:100vh;
  width:100vw;
  display:flex;
  flex-direction:column;
`;

export {Navigation, Viewport};
