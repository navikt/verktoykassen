import { Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  const handleChange = (val: any[]) => console.log(val);

  return (
    <CheckboxGroup
      legend="Hvor vil du sitte?"
      description="Fremste rad er nærmest nødutgangene"
      onChange={(val: any[]) => handleChange(val)}
    >
      <Checkbox value="Bakerst">Bakerst</Checkbox>
      <Checkbox value="Midterst">Midterst</Checkbox>
      <Checkbox value="Fremst">Fremst</Checkbox>
    </CheckboxGroup>
  );
};

export default withDsExample(Example);

export const args = {
  index: 2,
};
