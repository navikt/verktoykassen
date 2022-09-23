import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { Heading } from "@navikt/ds-react";
import Nextlink from "next/link";

const getStatus = (status?: SanityT.Schema.komponent_artikkel["status"]) => {
  switch (status?.tag) {
    case "beta":
      return (
        <span className="ml-2 rounded bg-purple-400 px-1 text-sm text-white">
          Ready
        </span>
      );
    case "new":
      return (
        <span className="ml-2 rounded bg-green-300 px-1 text-sm text-gray-900">
          Ready
        </span>
      );
    case "ready":
      return (
        <span className="ml-2 rounded bg-deepblue-400 px-1 text-sm text-white">
          Ready
        </span>
      );

    default:
      return (
        <span className="ml-2 rounded bg-deepblue-400 px-1 text-sm text-white">
          Ready
        </span>
      );
  }
};

const ComponentOverview = ({
  node,
}: {
  node: {
    _id: string;
    heading: string;
    slug: string;
    ingress?: any[];
    status?: SanityT.Schema.komponent_artikkel["status"];
  }[];
}): JSX.Element => {
  /* if (!node || !node.components) {
    return null;
  } */

  const sorted = node.sort((a, b) => a?.heading?.localeCompare(b.heading));

  console.log(sorted);

  return (
    <div>
      <ul className="component-card-grid">
        {sorted.map((x) => (
          <li key={x._id}>
            <div className="group relative rounded border border-gray-300/60 shadow-small focus-within:shadow-focus hover:shadow-medium">
              <div></div>
              <div className="grid p-3">
                <span>
                  <Nextlink href={`/${x?.slug}`} passHref>
                    <Heading
                      as="a"
                      size="small"
                      className="z-10 before:absolute before:inset-0 focus:outline-none group-hover:underline"
                    >
                      {x.heading}
                    </Heading>
                  </Nextlink>
                  {getStatus(x.status)}
                </span>
                <span className="clamp-3 mt-1 overflow-hidden">
                  {<SanityBlockContent noLastMargin blocks={x?.ingress} />}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentOverview;
