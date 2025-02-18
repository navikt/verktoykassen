import { ErrorMessage } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <ErrorMessage>Du må fylle ut tekstfeltet før innsending.</ErrorMessage>
  );
};

export default withDsExample(Example);

export const args = {
  index: 0,
};
