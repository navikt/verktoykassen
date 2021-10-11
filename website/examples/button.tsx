import { Close } from "@navikt/ds-icons";
import { Button, Loader } from "@navikt/ds-react";
import React from "react";

export const ButtonAllVariants = () => (
  <>
    <Button variant="primary">Primary button</Button>
    <Button variant="secondary">Secondary button</Button>
    <Button variant="tertiary">Tertiary button</Button>
    <Button variant="danger">Danger button</Button>
  </>
);

ButtonAllVariants.react = `
<Button variant="primary">Primary button</Button>
    <Button variant="secondary">Secondary button</Button>
    <Button variant="tertiary">Tertiary button</Button>
    <Button variant="danger">Danger button</Button>`;

export const ButtonPrimary = () => (
  <>
    <Button variant="primary">Primary button</Button>
    <Button variant="primary" size="small">
      Primary button
    </Button>
  </>
);

ButtonPrimary.react = `<Button variant="primary">Primary button</Button>
<Button variant="primary" size="small">
  Primary button
</Button>`;

export const ButtonSecondary = () => (
  <>
    <Button variant="secondary">Secondary button</Button>
    <Button variant="secondary" size="small">
      Secondary button
    </Button>
  </>
);

ButtonSecondary.react = `<Button variant="secondary">Secondary button</Button>
<Button variant="secondary" size="small">
  Secondary button
</Button>`;

export const ButtonTertiary = () => {
  return (
    <>
      <Button variant="tertiary">Tertiary button</Button>
      <Button variant="tertiary" size="small">
        Tertiary button
      </Button>
    </>
  );
};

ButtonTertiary.react = `
    <Button variant="tertiary">Tertiary button</Button>
    <Button variant="tertiary" size="small">
      Tertiary button
    </Button>
`;

export const ButtonDanger = () => (
  <>
    <Button variant="danger">Danger button</Button>
    <Button variant="danger" size="small">
      Danger button
    </Button>
  </>
);

ButtonDanger.react = `<Button variant="danger">Danger button</Button>
<Button variant="danger" size="small">
  Danger button
</Button>`;

export const ButtonDisabled = () => (
  <>
    <Button variant="primary" disabled={true}>
      Disabled button
    </Button>
    <Button variant="primary" disabled={true} size="small">
      Disabled button
    </Button>
  </>
);

ButtonDisabled.react = `<Button variant="primary" disabled={true}>
Disabled button
</Button>
<Button variant="primary" disabled={true} size="small">
Disabled button
</Button>`;

ButtonDisabled.html = `<button
disabled="true"
class="navds-button navds-button--primary navds-button--medium"
>
<span class="navds-button__inner navds-body-short">
  Disabled button
</span>
</button>
<button
disabled="true"
class="navds-button navds-button--primary navds-button--small"
>
<span class="navds-button__inner navds-body-short navds-body-short--small">
  Disabled button
</span>
</button>`;

export const ButtonWithIcon = () => (
  <>
    <Button variant="primary">
      Button
      <Close aria-label="presentation" />
    </Button>
    <Button variant="primary" size="small">
      Button
      <Close aria-label="presentation" />
    </Button>
  </>
);

ButtonWithIcon.react = `<Button variant="primary">
Button
<Close aria-label="presentation" />
</Button>
<Button variant="primary" size="small">
Button
<Close aria-label="presentation" />
</Button>`;

export const ButtonWithLoader = () => (
  <>
    <Button variant="primary" aria-label="laster innhold...">
      Button <Loader aria-label="lastesirkel" />
    </Button>
    <Button variant="primary" size="small" aria-label="laster innhold...">
      Button <Loader aria-label="lastesirkel" />
    </Button>
  </>
);

ButtonWithLoader.react = `<Button variant="primary" aria-label="laster innhold...">
Button <Loader aria-label="lastesirkel"/>
</Button>
<Button variant="primary" size="small" aria-label="laster innhold...">
Button <Loader aria-label="lastesirkel"/>
</Button>`;
