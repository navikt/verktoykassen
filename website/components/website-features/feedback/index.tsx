import { BodyShort, Button, Heading, Label, Textarea } from "@navikt/ds-react";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled, { css } from "styled-components";
import { LayoutContext, useAmplitude } from "../..";
import { HelpfulArticleEnum, HelpfulArticleT } from "../../../lib";
import { AmplitudeEvents } from "../utils";

const ScFeedback = styled.div<{ isTablet?: boolean }>`
  width: 100%;
  padding: 2rem 1rem 2rem 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border-top: 1px solid var(--navds-semantic-color-border-muted);
  border-bottom: 1px solid var(--navds-semantic-color-border-muted);

  margin: ${(props) =>
    props.isTablet ? "4rem auto 4rem 0" : "4rem auto 4rem 0"};

  @media (max-width: 564px) {
    padding: 1rem;
  }
`;

const ScWidthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  gap: 1rem;
`;

const ScButtons = styled.div`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  justify-content: center;

  @media (max-width: 564px) {
    gap: 0.5rem;
  }

  > * {
    flex: 1 1;
    max-width: 8rem;
  }
`;

const ScStateCss = css`
  :hover {
    background-color: var(--navds-semantic-color-canvas-background);
  }

  :active {
    background-color: var(--navds-semantic-color-component-background-inverted);
    color: var(--navds-semantic-color-text-inverted);
    border-color: var(--navds-semantic-color-component-background-inverted);
  }

  :focus {
    outline: none;
    box-shadow: var(--navds-shadow-focus);
  }

  :focus:active {
    box-shadow: 0 0 0 1px white, var(--navds-shadow-focus);
  }
`;

const ScButton = styled.button<{ active?: boolean }>`
  color: var(--navds-semantic-color-text);
  background-color: var(--navds-semantic-color-component-background-light);
  border: 2px solid var(--navds-semantic-color-border);
  border-radius: 2px;
  min-height: 48px;
  cursor: pointer;

  ${ScStateCss}

  ${({ active }) =>
    active &&
    `
    background-color: var(--navds-semantic-color-component-background-inverted);
    color: var(--navds-semantic-color-text-inverted);
    border-color: var(--navds-semantic-color-component-background-inverted);

    :hover {
      background-color: var(--navds-semantic-color-component-background-inverted);
    }

    :focus {
      outline: none;
      box-shadow: 0 0 0 1px white, var(--navds-shadow-focus);
    }
  `}
`;

const ScButtonLabel = styled.button<{ active?: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.25rem 1rem;
  border-radius: 2px;

  ${ScStateCss}

  ${({ active }) =>
    active &&
    `
    background-color: var(--navds-semantic-color-component-background-inverted);
    color: var(--navds-semantic-color-text-inverted);
    border-color: var(--navds-semantic-color-component-background-inverted);

    :hover {
      background-color: var(--navds-semantic-color-component-background-inverted);
    }

    :focus {
      outline: none;
      box-shadow: 0 0 0 1px white, var(--navds-shadow-focus);
    }
  `}
`;

const ScFormWrapper = styled.form`
  width: 100%;
  max-width: 400px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ScSendButton = styled(Button)`
  margin-right: auto;
`;

const Feedback = ({
  docId,
  docType,
}: {
  docId?: string;
  docType?: string;
}): JSX.Element => {
  const { logAmplitudeEvent } = useAmplitude();
  const { asPath, basePath } = useRouter();
  const context = useContext(LayoutContext);
  const [textValue, setTextValue] = useState("");
  const [activeState, setActiveState] = useState<HelpfulArticleEnum | null>(
    null
  );
  const timeoutTimer = useRef<number | null>();
  const [thanksFeedback, setThanksFeedback] = useState<boolean>(false);
  const textAreaRef = useRef(null);
  const [hasLoggedFeedback, setHasLoggedFeedback] = useState(false);

  const fetchFeedback = () => {
    const msg: HelpfulArticleT = {
      answer: activeState,
      message: textValue,
      url: `${basePath}${asPath}`,
      docId: docId,
      docType: docType,
    };

    fetch("/api/helpfulArticleFeedback", {
      method: "POST",
      body: JSON.stringify(msg),
    });
  };

  const logFeedback = useCallback(
    (completed: boolean) => {
      !hasLoggedFeedback && activeState && console.log("logFeedback");
      !hasLoggedFeedback &&
        activeState &&
        logAmplitudeEvent(AmplitudeEvents.feedbackinteraksjon, {
          fra: asPath,
          valg: activeState,
          completed,
        });
    },
    [asPath, activeState, hasLoggedFeedback]
  );

  useEffect(() => {
    const callLogFeedback = () => logFeedback(false);

    window.addEventListener("beforeunload", callLogFeedback);
    return () => {
      window.removeEventListener("beforeunload", callLogFeedback);
    };
  }, [logFeedback]);

  const handleSend = (e) => {
    e.preventDefault();

    fetchFeedback();

    logFeedback(true);
    setHasLoggedFeedback(true);

    setActiveState(null);
    setTextValue("");
    setThanksFeedback(true);
    timeoutTimer.current = window.setTimeout(() => {
      setThanksFeedback(false);
    }, 3000);

    return () => {
      if (timeoutTimer.current) {
        window.clearTimeout(timeoutTimer.current);
        timeoutTimer.current = null;
      }
    };
  };

  useEffect(() => {
    if (timeoutTimer.current && activeState) {
      setThanksFeedback(false);
      window.clearTimeout(timeoutTimer.current);
      timeoutTimer.current = null;
    }
  }, [activeState]);

  useEffect(() => {
    activeState && textAreaRef.current && textAreaRef.current.focus();
  }, [activeState]);

  useEffect(() => {
    setActiveState(null);
    setTextValue("");
    setThanksFeedback(false);

    if (timeoutTimer.current) {
      window.clearTimeout(timeoutTimer.current);
      timeoutTimer.current = null;
    }
  }, [asPath]);

  const getPlaceholder = () => {
    switch (activeState) {
      case HelpfulArticleEnum.JA:
        return "Så bra! Er det noe du vil trekke frem? (valgfritt)";
      case HelpfulArticleEnum.DELVIS:
        return "Hm.. Hva er det som mangler?";
      case HelpfulArticleEnum.NEI:
        return "Kjipt! Hva e de du ikke liker?";
      case HelpfulArticleEnum.MISC:
        return "Hva kan forbedres?";
      default:
        return "Hva kan forbedres?";
    }
  };

  if (!docId || !docType) return null;

  return (
    <ScFeedback isTablet={context.isTablet}>
      <ScWidthWrapper>
        <Heading size="small" level="2">
          Var denne artikkelen til hjelp?
        </Heading>
        <ScButtons>
          <ScButton
            active={activeState === HelpfulArticleEnum.JA}
            onClick={() => setActiveState(HelpfulArticleEnum.JA)}
          >
            <Label>Ja</Label>
          </ScButton>
          <ScButton
            active={activeState === HelpfulArticleEnum.DELVIS}
            onClick={() => setActiveState(HelpfulArticleEnum.DELVIS)}
          >
            <Label>Delvis</Label>
          </ScButton>
          <ScButton
            active={activeState === HelpfulArticleEnum.NEI}
            onClick={() => setActiveState(HelpfulArticleEnum.NEI)}
          >
            <Label>Nei</Label>
          </ScButton>
        </ScButtons>
        <ScButtonLabel
          active={activeState === HelpfulArticleEnum.MISC}
          onClick={() => setActiveState(HelpfulArticleEnum.MISC)}
        >
          <Label size="small">
            Jeg vil foreslå forbedringer til artikkelen.
          </Label>
        </ScButtonLabel>
        <ScFormWrapper>
          {activeState !== null && (
            <Textarea
              ref={textAreaRef}
              /* error={errorMsg} */
              label="Skriv inn feedbacken du ønsker å gi."
              hideLabel
              placeholder={getPlaceholder()}
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              maxLength={600}
              minRows={3}
            />
          )}
          {(textValue !== "" || activeState === HelpfulArticleEnum.JA) && (
            <ScSendButton onClick={handleSend}>Send inn svar</ScSendButton>
          )}
        </ScFormWrapper>
        {thanksFeedback && (
          <BodyShort size="small">Takk for tilbakemeldingen!</BodyShort>
        )}
      </ScWidthWrapper>
    </ScFeedback>
  );
};

export default Feedback;
