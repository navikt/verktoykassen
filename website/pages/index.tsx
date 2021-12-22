import { Ingress, Link } from "@navikt/ds-react";
import Head from "next/head";
import NextLink from "next/link";
import React, { useContext, useEffect } from "react";
import Snowfall from "react-snowfall";
import styled from "styled-components";
import * as Sc from "../components";
import {
  AmplitudeEvents,
  Card,
  LayoutContext,
  NAVLogoDark,
  SantaHat,
  useAmplitude,
} from "../components";
import FrontpageFooter from "../components/layout/footer/FrontpageFooter";
import { getClient, vkFrontpageQuery } from "../lib";
import { VkFrontpage } from "../lib/autogen-types";
import { ScBodyShort, ScHeading } from "./designsystem";

const ScIntro = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 650px;
  text-align: center;
`;

const ScLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3rem;

  > * {
    justify-self: center;
    font-size: 2rem;
  }
`;

const ScNav = styled.nav`
  margin: 4rem auto 0 auto;
`;

const ScDiv = styled.div`
  gap: 1.5rem;
  padding: 0;
  list-style: none;

  grid-template-columns: repeat(4, 18rem);
  place-content: start flex-start;
  display: grid;

  @media (max-width: 1320px) {
    grid-template-columns: repeat(3, 18rem);
  }

  @media (max-width: 1020px) {
    grid-template-columns: repeat(2, 18rem);
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(1, 18rem);
  }
`;

const ScFrontpage = styled.div`
  padding: 3rem;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--navds-semantic-color-component-background-alternate);

  > a {
    color: var(--navds-semantic-color-text);
  }

  @media (max-width: 564px) {
    padding: 2rem 1rem;
  }
`;

const ScLink = styled(Link)`
  position: absolute;
  top: 3rem;
  left: 3rem;

  @media (max-width: 768px) {
    top: 1rem;
    left: 1rem;
  }

  @media (max-width: 564px) {
    padding: 0rem;
  }
`;

const ScRelative = styled.div`
  position: relative;
`;

const Page = (props: { page: VkFrontpage; preview: boolean }): JSX.Element => {
  const { logAmplitudeEvent } = useAmplitude();

  const context = useContext(LayoutContext);

  useEffect(() => {
    logAmplitudeEvent(AmplitudeEvents.sidevisning, {
      side: "/",
    });
  }, []);

  console.log(props.page?.cards);
  return (
    <>
      <Head>
        <title>Verktøykassa</title>
        <meta property="og:title" content="Verktøykassen NAV" />
      </Head>
      {props.preview && <Sc.PreviewBanner />}
      <ScRelative>
        <Snowfall
          color="#dee4fd"
          snowflakeCount={context.isMobile ? 80 : 150}
        />
        <ScFrontpage>
          <NextLink passHref href="https://old-design-nav.vercel.app/">
            <ScLink>Gå til gammel dokumentasjon</ScLink>
          </NextLink>

          <ScIntro>
            <ScLogoWrapper>
              <NAVLogoDark />
            </ScLogoWrapper>
            <ScHeading spacing level="1" size="2xlarge">
              Verktøykassa
              <ScBodyShort>Beta</ScBodyShort>
              <SantaHat className="santahat" />
            </ScHeading>
            <Ingress>
              En samling ressurser fra ulike fagdisipliner som hjelper oss å
              skape bedre, universelt tilgjengelige og sammenhengende produkter
              i NAV.
            </Ingress>
          </ScIntro>
          <ScNav aria-label="Portal navigasjon">
            <ScDiv>
              {props?.page?.cards &&
                props.page.cards.map((card) => (
                  <Card
                    key={card._key}
                    node={card}
                    categoryRef={card.category_ref}
                    href={card.link}
                  />
                ))}
            </ScDiv>
          </ScNav>
        </ScFrontpage>
      </ScRelative>
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      {/* <Sc.SkipLink href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </Sc.SkipLink> */}
      <Sc.SidebarMain>
        <Sc.MainFooter>
          <Sc.Main fullwidth tabIndex={-1} id="hovedinnhold" graybg>
            {page}
          </Sc.Main>
          <FrontpageFooter />
        </Sc.MainFooter>
      </Sc.SidebarMain>
    </>
  );
};

export const getStaticProps = async ({
  preview = false,
}: {
  preview?: boolean;
}) => {
  const client = getClient(preview);

  let page = await client.fetch(vkFrontpageQuery);
  page = page?.find((item) => item._id.startsWith(`drafts.`)) || page?.[0];

  return {
    props: {
      page: page ?? null,
      slug: "/",
      validPath: true,
      isDraft: false,
      preview,
    },
    revalidate: 10,
  };
};

export default Page;
