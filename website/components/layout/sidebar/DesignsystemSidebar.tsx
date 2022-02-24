import { useContext } from "react";
import { LayoutContext } from "../..";
import Menu from "../menu/DesignsystemMenu";

const DesignsystemSidebar = () => {
  const context = useContext(LayoutContext);

  if (!context?.activeHeading) return null;

  return (
    <div className="index-ignore sticky top-0 z-[1002] hidden h-screen w-sidebar shrink-0 self-start overflow-y-auto border-r border-r-divider bg-white py-8 px-0 lg:block">
      <Menu heading={context.activeHeading} />
    </div>
  );
};

export default DesignsystemSidebar;
