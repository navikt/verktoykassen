import * as DsIcons from "@navikt/ds-icons";
import * as DsReact from "@navikt/ds-react";
import * as DsReactInternal from "@navikt/ds-react-internal";
import babel from "prettier/parser-babel";
import prettier from "prettier/standalone";
import theme from "prism-react-renderer/themes/dracula";
import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
  withLive,
} from "react-live";
import { DsCodeSandbox as SandboxT } from "../../../lib";
import getSandbox from "../../../stories/sandbox";
import { SandboxComponent } from "../../../stories/sandbox/types";
import { withErrorBoundary } from "../../ErrorBoundary";
import CopyButton from "../code/CopyButton";
import {
  generateState,
  getInitialState,
  ParsedArgsT,
  StateT,
} from "./settings-panel/generateState";
import PreviewWrapper from "./PreviewWrapper";

const formatCode = (code: string) => {
  try {
    const formated = prettier.format(`${code}`, {
      parser: "babel",
      plugins: [babel],
      printWidth: 60,
      semi: false,
    });
    return formated.startsWith(";")
      ? formated.slice(1).replace(/\n$/, "")
      : formated.replace(/\n$/, "");
  } catch (e) {
    return code;
  }
};

const scope = {
  ...DsReact,
  ...DsReactInternal,
  ...DsIcons,
};

type SandboxContextProps = {
  sandboxState: SandboxStateT;
  setSandboxState: React.Dispatch<SandboxStateT>;
  bg: string;
  setBg: React.Dispatch<string>;
  reset: () => void;
};

export const SandboxContext = createContext<SandboxContextProps>({
  sandboxState: null,
  setSandboxState: () => null,
  bg: "--navds-semantic-color-canvas-background",
  setBg: () => null,
  reset: () => null,
});

interface SandboxStateT {
  args: ParsedArgsT;
  propsState: StateT;
  openSettings: boolean;
  inlineSettings: boolean;
}

const Sandbox = ({ node }: { node: SandboxT }): JSX.Element => {
  const [code, setCode] = useState<string>(null);
  const [reseting, setReseting] = useState(false);
  const preFocusCapture = useRef<HTMLDivElement>(null);
  const focusCapture = useRef<HTMLButtonElement>(null);
  const [background, setBackground] = useState(
    "--navds-semantic-color-canvas-background"
  );

  const [sandboxState, setSandboxState] = useState<SandboxStateT>({
    args: null,
    propsState: null,
    openSettings: false,
    inlineSettings: true,
  });

  const sandboxComp: SandboxComponent | null = useMemo(
    () => getSandbox(node?.title),
    [node.title]
  );

  useEffect(() => {
    if (sandboxComp) {
      const args = generateState(sandboxComp.args);
      const newState = getInitialState(args);
      setSandboxState({ ...sandboxState, args, propsState: newState });
      setCode(
        formatCode(sandboxComp(newState.props, newState.variants).trim())
      );
      sandboxComp?.args?.background &&
        setBackground(sandboxComp.args.background);
    }
  }, [sandboxComp]);

  const reset = () =>
    setSandboxState({
      ...sandboxState,
      propsState: getInitialState(sandboxState.args),
    });

  useEffect(() => {
    sandboxState.propsState &&
      setCode(
        formatCode(
          sandboxComp(
            sandboxState.propsState.props,
            sandboxState.propsState.variants
          ).trim()
        )
      );

    /* Hack to make editor update */
    setReseting(true);
    setTimeout(() => setReseting(false), 50);
  }, [sandboxState.propsState]);

  if (!node || !node.title) {
    return null;
  }

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      event.shiftKey
        ? preFocusCapture.current?.focus()
        : focusCapture.current?.focus();
    }
  };

  const Editor = (
    <LiveProvider code={code} scope={scope} noInline={!code?.startsWith("<")}>
      <div className="index-ignore relative mb-8">
        <PreviewWrapper>
          <LivePreview />
          <LiveError />
        </PreviewWrapper>
        {/* <div ref={preFocusCapture} tabIndex={-1} />

        <div className="relative mt-2 rounded">
          <pre className="sandbox-editor relative m-0 max-h-[400px] overflow-x-auto overflow-y-auto rounded bg-canvas-background-inverted p-4 pr-20 font-code">
            {reseting ? (
              <LiveEditor
                style={{
                  overflowX: "auto",
                  whiteSpace: "pre",
                  backgroundColor: "transparent",
                }}
                className="overflow-x-auto whitespace-pre bg-transparent"
                key="old-editor"
                theme={theme}
              />
            ) : (
              <LiveEditor
                key="new-editor"
                onChange={(v) => setCode(v)}
                theme={theme}
                style={{ backgroundColor: "transparent" }}
                onKeyDown={handleKeyDown}
              />
            )}
            <CopyButton ref={focusCapture} content={code} inTabs={false} />
          </pre>
        </div> */}
      </div>
    </LiveProvider>
  );

  return (
    <>
      {code !== null ? (
        <SandboxContext.Provider
          value={{
            sandboxState,
            setSandboxState,
            bg: background,
            setBg: setBackground,
            reset,
          }}
        >
          {Editor}
        </SandboxContext.Provider>
      ) : null}
    </>
  );
};

const LiveApp = withLive(Sandbox);

export default withErrorBoundary(LiveApp, "Sandbox");
