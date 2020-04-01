import React from 'react';
import styled from '@emotion/styled';

const Header = styled.h1`
  padding-top: 1em;
  text-align: center;
`;

const SubHeading = ({ children }) => <Header>{children}</Header>;

export default SubHeading;
