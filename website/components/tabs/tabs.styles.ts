import styled from "styled-components";

export const Nav = styled.nav<{ isTablet: boolean }>`
  overflow-x: auto;
  position: sticky;
  top: 0;
  z-index: 1001;
  background-color: white;

  ${(props) => {
    return !props.isTablet
      ? `margin-left: 0;
      margin-right: 0;`
      : `margin: 0;
         max-width: none;
         padding-right: 0.5rem;
         padding-left: 0.5rem;`;
  }};

  ${(props) =>
    !props.isTablet &&
    `::after {
        content: "";
        background-color: var(--navds-semantic-color-canvas-background-default);
        height: 1px;
        width: 100%;
        bottom: 0px;
        left: 0;
        z-index: -1;

        position: absolute;
      }`}
`;

export const Ul = styled.ul<{ isTablet: boolean }>`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  overflow-x: auto;
  max-width: ${(props) => (props.isTablet ? "" : "600px")};
  margin-top: 0.5rem;
  margin-left: ${(props) => (!props.isTablet ? "3rem" : "")};
  gap: 0.25rem;

  > * {
    list-style: none;
    flex: 1 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    ${(props) =>
      props.isTablet &&
      `::after {
      content: "";
      background-color: var(--navds-semantic-color-canvas-background-default);
      height: 1px;
      width: fit-content;
      bottom: 0px;
      z-index: -1;
      width: 100%;
      position: absolute;
    }`}
  }
`;

export const A = styled.a`
  border-bottom: 3px solid transparent;
  background: none;
  cursor: pointer;
  text-decoration: none;
  text-transform: capitalize;
  color: var(--navds-global-color-gray-800);
  flex: 1 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  min-height: 48px;
  font-weight: 400;

  &[aria-selected="true"] {
    border-color: var(--navds-semantic-color-canvas-background-inverted);
    color: var(--navds-semantic-color-text-default);
    font-weight: 600;
  }

  :hover {
    color: var(--navds-semantic-color-text-default);
    border-color: var(--navds-semantic-color-canvas-background-inverted);
  }

  :focus {
    outline: 3px solid var(--navds-semantic-color-focus);
    outline-offset: -3px;
  }
`;
