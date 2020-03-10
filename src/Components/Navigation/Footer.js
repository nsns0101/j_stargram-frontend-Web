import React from "react";
import styled from "styled-components";

//footer전체
const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
`;

//메뉴 ul(리스트 전체)
const List = styled.ul`
  display: flex;
`;

//메뉴 li(리스트 각각)
const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

//링크 있는 메뉴 글
const Link = styled.a`
  color: ${props => props.theme.darkBlueColor};
`;

//카피라이트
const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">about us</Link>
      </ListItem>
      <ListItem>
        <Link href="#">support</Link>
      </ListItem>
      <ListItem>
        <Link href="#">press</Link>
      </ListItem>
      <ListItem>
        <Link href="#">api</Link>
      </ListItem>
      <ListItem>
        <Link href="#">jobs</Link>
      </ListItem>
      <ListItem>
        <Link href="#">privacy</Link>
      </ListItem>
      <ListItem>
        <Link href="#">terms</Link>
      </ListItem>
      <ListItem>
        <Link href="#">directory</Link>
      </ListItem>
      <ListItem>
        <Link href="#">profiles</Link>
      </ListItem>
      <ListItem>
        <Link href="#">hashtags</Link>
      </ListItem>
      <ListItem>
        <Link href="#">language</Link>
      </ListItem>
    </List>
    <Copyright>j_stargram {new Date().getFullYear()} &copy;</Copyright>
  </Footer>
);
