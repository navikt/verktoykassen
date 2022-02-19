import { Detail } from "@navikt/ds-react";
import React, { useContext } from "react";
import { SectionContext } from "../..";
import { Tips as TipsT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";
import { SanityBlockContent } from "../../SanityBlockContent";
import cl from "classnames";

const Tips = ({ node }: { node: TipsT }): JSX.Element => {
  const context = useContext(SectionContext);

  if (!node || !node.body) {
    return null;
  }

  return (
    <div
      className={cl(
        "max-w-2xl rounded-r border-l-[6px] border-l-gray-500 bg-gray-50 px-4 py-3 shadow-md md:px-8",
        { "my-8": context.withinSection, "my-16": !context.withinSection }
      )}
    >
      <Detail className="text-text-muted" spacing>
        TIPS
      </Detail>
      <SanityBlockContent blocks={node.body} noLastMargin />
    </div>
  );
};

export default withErrorBoundary(Tips, "Tips");
