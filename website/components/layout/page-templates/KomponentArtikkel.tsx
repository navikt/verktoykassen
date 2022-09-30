import { SanityT } from "@/lib";
import { SanityBlockContent } from "@/sanity-block";
import { ExternalLink } from "@navikt/ds-icons";
import { BodyShort, Heading, Tag } from "@navikt/ds-react";
import cl from "classnames";
import IntroSeksjon from "components/sanity-modules/IntroSeksjon";
import Head from "next/head";
import { dateStr, Feedback, TableOfContents, UnderArbeid } from "../..";

const kodepakker = {
  "ds-react": {
    title: "@navikt/ds-react",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
  "ds-css": {
    title: "@navikt/ds-css",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
  "ds-react-internal": {
    title: "@navikt/ds-react-internal",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/internal",
  },
  "ds-css-internal": {
    title: "@navikt/ds-css-internal",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/internal",
  },
  "ds-icons": {
    title: "@navikt/ds-reaciconst",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
  "ds-tokens": {
    title: "@navikt/ds-tokens",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
  "ds-tailwind": {
    title: "@navikt/ds-tailwind",
    git: "https://github.com/navikt/nav-frontend-moduler/tree/master/%40navikt/core",
  },
};

const KomponentArtikkelTemplate = ({
  data,
  title,
}: {
  data: SanityT.Schema.komponent_artikkel;
  title: string;
}): JSX.Element => {
  const pack = data?.kodepakker?.length > 0 && kodepakker[data?.kodepakker[0]];

  return (
    <>
      <Head>
        <title>{data?.heading ? `${data?.heading} - ${title}` : title}</title>
        <meta
          property="og:title"
          content={`${data.heading} - Designsystemet`}
        />
      </Head>

      <div className="content-box">
        <div className="pt-8">
          <div className="flex flex-wrap gap-2"></div>
          <Heading
            size="xlarge"
            level="1"
            spacing
            className="algolia-index-lvl1 flex flex-wrap items-center gap-4"
          >
            {data.heading}
          </Heading>
          <BodyShort
            as="div"
            size="small"
            className="mb-4 flex flex-wrap items-center justify-start gap-x-4 gap-y-3"
          >
            {data?.status && data.status?.tag !== "ready" && (
              <Tag
                variant="info"
                size="small"
                className={cl("border-none capitalize", {
                  "bg-gray-200 capitalize text-text":
                    data.status?.tag === "deprecated",
                  "bg-green-300 capitalize text-text":
                    data.status?.tag === "new",
                  "bg-purple-400 text-text-inverted":
                    data.status?.tag === "beta",
                })}
              >
                {data.status?.tag}
              </Tag>
            )}
            <BodyShort
              size="small"
              as="span"
              className="flex items-center text-text-muted"
            >
              {`Oppdatert ${dateStr(data._updatedAt)}`}
            </BodyShort>
          </BodyShort>
          <BodyShort
            as="span"
            size="small"
            className="flex gap-4 text-text-muted"
          >
            {pack && (
              <>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://yarnpkg.com/package/${pack.title}`}
                  className="flex items-center gap-1 underline hover:text-text hover:no-underline focus:bg-blue-800 focus:text-text-inverted focus:no-underline focus:shadow-focus focus:outline-none"
                >
                  Yarn
                  <ExternalLink title="Gå til yarn pakke" />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer noopener"
                  href={pack.git}
                  className="flex items-center gap-1 underline hover:text-text hover:no-underline focus:bg-blue-800 focus:text-text-inverted focus:no-underline focus:shadow-focus focus:outline-none"
                >
                  Kode
                  <ExternalLink title="Gå til github-kode" />
                </a>
              </>
            )}

            {data.figma_link && (
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={data.figma_link}
                className="flex items-center gap-1 underline hover:text-text hover:no-underline focus:bg-blue-800 focus:text-text-inverted focus:no-underline focus:shadow-focus focus:outline-none"
              >
                Figma
                <ExternalLink title="Åpne i Figma" />
              </a>
            )}
          </BodyShort>
        </div>
      </div>
      <div className="relative flex max-w-full md:max-w-7xl">
        <TableOfContents changedState={data["bruk_tab"]} hideToc={false} />
        <div className="content-box">
          {data?.under_arbeid?.status ? (
            <>
              <UnderArbeid
                className="mt-12"
                text={data?.under_arbeid?.forklaring}
              />
              {data?.under_arbeid?.vis_innhold && (
                <div>
                  <IntroSeksjon node={data.intro} />
                  {data["bruk_tab"] && (
                    <SanityBlockContent blocks={data["bruk_tab"]} />
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="mt-12">
              <IntroSeksjon node={data.intro} />
              {data["bruk_tab"] && (
                <SanityBlockContent blocks={data["bruk_tab"]} />
              )}
              {data["kode_tab"] && (
                <SanityBlockContent blocks={data["kode_tab"]} />
              )}
            </div>
          )}
          <Feedback docId={data?._id} docType={data?._type} />
        </div>
      </div>
    </>
  );
};

export default KomponentArtikkelTemplate;
