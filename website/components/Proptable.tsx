import { Title } from "@navikt/ds-react";
import "nav-frontend-tabell-style/dist/main.css";
import styled from "styled-components";

const Div = styled.div`
  margin-bottom: var(--navds-spacing-8);
`;

const PropTable = ({ node }) => {
  const props = node.props;
  if (props.length === 0) return null;
  return (
    <Div>
      <table
        className="tabell"
        summary="Oversikt over react-props komponenten bruker"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Req</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => {
            return (
              <tr key={prop._key}>
                <td>{prop.prop_name}</td>
                <td>{prop.prop_type}</td>
                <td>{prop.prop_required ? "✔️" : "❌"}</td>
                {<td>{prop.prop_default ? prop.prop_default : ""}</td>}
                {<td>{prop.prop_description ? prop.prop_description : ""}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Div>
  );
};

export default PropTable;
