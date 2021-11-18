import React, { useState, useEffect, useRef } from "react";
import { withDocument } from "part:@sanity/form-builder";
import {
  TextInput,
  Stack,
  Label,
  Checkbox,
  Radio,
  Flex,
  Text,
  Box,
  Card,
  Heading,
} from "@sanity/ui";
import styled from "styled-components";

const CustomDisplay = React.forwardRef((props, ref) => {
  return (
    <Stack space={0} ref={ref} space={[3, 1, 2, 4]}>
      <Heading as="h2" size={2}>
        God Praksis
      </Heading>

      <Text size={2}>
        IA-en for God Praksis er ikke helt på plass enda, men er mulig å skrive
        artikler og teste dem fortsatt.
      </Text>

      <Text size={2}>
        Trykk på `preview`-knappen litt opp på siden og se hvordan artikkelen
        ser ut på nettsiden uten å måtte publisere den.
      </Text>
      <Text size={2}>
        Når IA og løsningen er på plass både i CMS og Frontend vil vi gå gjennom
        å fikse alt av struktur som mangler. Er også et lite notatfelt rett
        under der man kan notere litt slik at man lettere kan holde kontrollen.
      </Text>
    </Stack>
  );
});

export default withDocument(CustomDisplay);
