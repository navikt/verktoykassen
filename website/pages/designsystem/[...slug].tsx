import React from "react";
import styled from "styled-components";
import * as Sc from "../../components";
import { LayoutPicker, PreviewBanner } from "../../components";
import DesignsystemFooter from "../../components/layout/footer/DesignsystemFooter";
import DesignsystemHeader from "../../components/layout/header/DesignsystemHeader";
import DesignsystemSidebar from "../../components/layout/sidebar/DesignsystemSidebar";
import {
  DsArticlePage,
  DsComponentPage,
  dsDocumentBySlug,
  DsNavigation,
  dsNavigationQuery,
  DsTabbedArticlePage,
  getClient,
  getDsPaths,
} from "../../lib";

export const ScGrow = styled.div`
  margin-top: auto;
`;

const Page = (props: {
  slug?: string;
  page: DsComponentPage | DsTabbedArticlePage | DsArticlePage;
  navigation: DsNavigation;
  preview: boolean;
}): JSX.Element => {
  return (
    <>
      {props.preview && <PreviewBanner />}
      <LayoutPicker title="Designsystemet" data={props.page} />
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <Sc.SkipLink href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </Sc.SkipLink>
      <DesignsystemHeader />
      <Sc.SidebarMain>
        <DesignsystemSidebar />
        <Sc.MainFooter>
          <Sc.Main tabIndex={-1} id="hovedinnhold">
            {page}
            <ScGrow />
          </Sc.Main>
          <DesignsystemFooter />
        </Sc.MainFooter>
      </Sc.SidebarMain>
    </>
  );
};

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { slug: string[] } }[];
}> => {
  return {
    paths: await getDsPaths().then((paths) =>
      paths.map((slug) => ({
        params: {
          slug: slug.filter((x) => x !== "designsystem"),
        },
      }))
    ),
    fallback: "blocking",
  };
};

interface StaticProps {
  props: {
    page: DsComponentPage | DsTabbedArticlePage | DsArticlePage;
    slug: string;
    navigation: DsNavigation;
    isDraft: boolean;
    validPath: boolean;
    preview: boolean;
  };
  revalidate: number;
}

export const getStaticProps = async ({
  params: { slug },
  preview = false,
}: {
  params: { slug: string[] };
  preview?: boolean;
}): Promise<StaticProps | { notFound: true }> => {
  const joinedSlug = slug.slice(0, 2).join("/");

  const client = getClient(preview);
  let page = await client.fetch(dsDocumentBySlug, {
    slug: "designsystem/" + joinedSlug,
  });

  const isDraft = page.filter((item) => !item._id.startsWith("drafts.")).length;

  page = page?.find((item) => item._id.startsWith(`drafts.`)) || page?.[0];

  const navigation = await getClient(false).fetch(dsNavigationQuery);

  const validPath = await getDsPaths().then((paths) =>
    paths
      .map((slugs) => slugs.filter((slug) => slug !== "designsystem").join("/"))
      .includes(slug.filter((x) => x !== "designsystem").join("/"))
  );

  return {
    props: {
      page: page ?? null,
      slug: joinedSlug,
      navigation,
      isDraft: isDraft === 0,
      validPath,
      preview,
    },
    revalidate: 10,
  };
};

export default Page;
