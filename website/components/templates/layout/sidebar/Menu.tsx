import { BodyShort } from "@navikt/ds-react";
import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  margin-top: var(--navds-spacing-6);

  ul,
  ul > li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

const Link = styled.a<{ active?: boolean }>`
  display: flex;
  padding: 0.75rem 1rem 0.75rem 2rem;
  text-decoration: none;
  ${(props) =>
    props.active &&
    `
    box-shadow: inset 4px 0 0 0 var(--navds-color-blue-50);
    background-color: var(--navds-color-gray-10);
    color: var(--navds-color-gray-90);
    font-weight: 600;
  `}

  :hover {
    background-color: var(--navds-color-blue-10);
  }
`;

const Menu = (): JSX.Element => {
  return (
    <Nav>
      <BodyShort as="ul">
        <li>
          <Link href="#">Accordion</Link>
        </li>
        <li>
          <Link active href="#">
            Button
          </Link>
        </li>
        <li>
          <Link href="#">Popover</Link>
        </li>
        <li>
          <Link href="#">Internal Header</Link>
        </li>
      </BodyShort>
    </Nav>
  );
};

export default Menu;
