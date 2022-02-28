import React, { createContext, useEffect, useState } from "react";
import { withErrorBoundary } from "../../../ErrorBoundary";
import CodeBlock from "./Block";
import CodeTabs from "./Tabs";
import { DsCodeExample as DsCodeExampleT } from "../../../../lib";

import dynamic from "next/dynamic";
import { BgColors } from "../../../../stories/sandbox/types";

const CodePreview = dynamic(() => import("./Preview"), {
  loading: () => (
    <div className="flex h-[100px] w-full border border-t-0 border-gray-200 bg-gray-50" />
  ),
  ssr: false,
});

type TabType = { name: string; content: React.ReactNode; language?: string };

type ContextProps = {
  node: Partial<DsCodeExampleT>;
  tabs: TabType[];
  setTabs: React.Dispatch<React.SetStateAction<TabType[]>>;
  showTabs: boolean;
  showPreview: boolean;
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  fullscreenLink: string;
  setFullscreenLink: React.Dispatch<React.SetStateAction<string>>;
  previewBg: BgColors;
  setPreviewBg: React.Dispatch<React.SetStateAction<BgColors>>;
};

export const CodeContext = createContext<ContextProps>({
  node: {},
  tabs: [],
  setTabs: () => null,
  showTabs: false,
  showPreview: false,
  activeTab: 0,
  setActiveTab: () => null,
  fullscreenLink: "",
  setFullscreenLink: () => null,
  previewBg: null,
  setPreviewBg: () => null,
});

const Code = ({ node }: { node: DsCodeExampleT }): JSX.Element => {
  const [tabs, setTabs] = useState<TabType[]>(
    node?.infercode
      ? [
          {
            name: "",
            content: "",
            language: "html",
          },
        ]
      : []
  );
  const [activeTab, setActiveTab] = useState(-1);
  const [fullscreenLink, setFullscreenLink] = useState("");
  const [previewBg, setPreviewBg] = useState(BgColors.DEFAULT);

  if (
    (!node.preview && !node?.tabs) ||
    (node.preview && !node?.infercode === undefined)
  ) {
    return null;
  }

  useEffect(() => {
    if (node.infercode === true) return;
    const tabList: TabType[] = [];
    node.tabs &&
      node.tabs.forEach((tab) =>
        tabList.push({
          name: tab.title,
          content: tab.example.code,
          language: tab.example.language,
        })
      );
    setTabs([...tabList]);
  }, []);

  const showPreview = !!node.preview;
  const showTabs =
    (!!node.preview && tabs.length > 0) || (!node.preview && tabs.length > 1);

  return (
    <CodeContext.Provider
      value={{
        node,
        tabs,
        setTabs,
        showPreview,
        activeTab: activeTab === -1 && !showPreview ? 0 : activeTab,
        setActiveTab,
        showTabs,
        fullscreenLink,
        setFullscreenLink,
        previewBg,
        setPreviewBg,
      }}
    >
      <div className="index-ignore mb-9 flex w-full flex-col">
        {showTabs && <CodeTabs />}
        {showPreview && activeTab === -1 && <CodePreview />}
        {(node.tabs || tabs) &&
          tabs.map((tab, i) => (
            <CodeBlock key={tab.content.toString()} index={i} />
          ))}
      </div>
    </CodeContext.Provider>
  );
};

export default withErrorBoundary(Code, "Kode eksempel");
