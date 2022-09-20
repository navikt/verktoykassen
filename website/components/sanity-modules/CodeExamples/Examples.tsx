import { SanityT } from "@/lib";
import { useEffect, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Snippet } from "@/components";
import cl from "classnames";

const exampleIframeId = "example-iframe";
const iframePadding = 192;

const ComponentExamples = ({
  node,
}: {
  node: Omit<SanityT.Schema.kode_eksempler, "dir" | "filnavn"> & {
    dir?: SanityT.Schema.kode_eksempler_fil;
    filnavn?: SanityT.Schema.kode_eksempler_fil;
  };
}) => {
  const [iframeHeight, setIframeHeight] = useState(400);
  const [activeExample, setActiveExample] = useState(null);

  const handleExampleLoad = () => {
    let attempts = 0;

    const waitForExampleContentToRender = setInterval(() => {
      const exampleIframe = document.getElementById(
        exampleIframeId
      ) as HTMLIFrameElement;
      const exampleIframeDOM = exampleIframe?.contentDocument;
      const exampleWrapper = exampleIframeDOM?.getElementById("ds-example");

      if (exampleWrapper) {
        const newHeight = iframePadding + exampleWrapper.offsetHeight;
        setIframeHeight(newHeight);
        clearInterval(waitForExampleContentToRender);
      }

      attempts++;

      if (attempts > 10) {
        clearInterval(waitForExampleContentToRender);
      }
    }, 100);

    return () => clearInterval(waitForExampleContentToRender);
  };

  useEffect(() => {
    node?.dir?.filer?.[0]?.navn && setActiveExample(node.dir.filer[0].navn);
  }, [node]);

  const fixName = (str: string) => str.split(".")?.[1] ?? str;

  if (node.standalone || node.dir.filer.length === 0 || !node.dir) {
    return true;
  }

  return (
    <>
      <Tabs.Root
        defaultValue={node.dir.filer[0].navn}
        onValueChange={(v) => setActiveExample(v)}
      >
        <Tabs.List className="mb-4 flex flex-wrap gap-2">
          {node.dir.filer.map((fil) => {
            return (
              <Tabs.Trigger
                key={fil._key}
                value={fil.navn}
                className={cl("", {
                  active: activeExample === fil.navn,
                  nonactive: activeExample !== fil.navn,
                })}
              >
                {fixName(fil.navn)}
              </Tabs.Trigger>
            );
          })}
        </Tabs.List>
        {node.dir.filer.map((fil) => {
          const exampleUrl = `/eksempler/${node.dir.title}/${fil.navn.replace(
            ".tsx",
            ""
          )}`;
          const codeSnippet = {
            _type: "code_snippet" as const,
            title: `${fil.navn}-snippet`,
            code: { code: fil.innhold.trim(), language: "jsx" },
          };

          return (
            <Tabs.Content key={fil._key} value={fil.navn}>
              <div className="mb-4 overflow-hidden bg-white ring-4 ring-gray-100">
                <iframe
                  src={exampleUrl}
                  height={iframeHeight}
                  onLoad={handleExampleLoad}
                  id={exampleIframeId}
                  className="block w-full min-w-96 max-w-full overflow-auto"
                />
              </div>

              <Snippet node={codeSnippet} />
            </Tabs.Content>
          );
        })}
      </Tabs.Root>
    </>
  );
};

export default ComponentExamples;
