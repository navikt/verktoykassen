import React from "react";
import * as Sc from "../../components";
import { LayoutPicker, PreviewBanner } from "../../components";
import GodPraksisHeader from "../../components/layout/header/GodPraksisHeader";
import { getClient, gpDocumentBySlug, gpDocuments } from "../../lib";
import { GpArticlePage } from "../../lib/autogen-types";
const Page = (props: {
  slug?: string;
  page: GpArticlePage;
  sidebar: any;
  preview: boolean;
}): JSX.Element => {
  return (
    <>
      {props.preview && <PreviewBanner />}
      <LayoutPicker title="God Praksis" data={props.page} />
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <Sc.SkipLink href="#hovedinnhold" tab-index={-1}>
        Hopp til innhold
      </Sc.SkipLink>
      <GodPraksisHeader />
      <Sc.SidebarMain>
        <Sc.MainFooter>
          <Sc.Main tabIndex={-1} id="hovedinnhold">
            {page}
          </Sc.Main>
        </Sc.MainFooter>
      </Sc.SidebarMain>
    </>
  );
};

export const getStaticPaths = async (): Promise<{
  fallback: string;
  paths: { params: { slug: string[] } }[];
}> => {
  const documents: any[] | null = await getClient(false).fetch(gpDocuments);
  const paths = [];

  documents?.forEach((page) => {
    page.slug &&
      paths.push({
        params: {
          slug: page.slug.split("/").filter((x) => x !== "god-praksis"),
        },
      });
  });

  return {
    paths,
    fallback: "blocking",
  };
};

interface StaticProps {
  props: {
    page: GpArticlePage;
    slug: string;
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

  let page = await client.fetch(gpDocumentBySlug, {
    slug: "god-praksis/" + joinedSlug,
  });

  const isDraft = page?.filter(
    (item) => !item._id.startsWith("drafts.")
  ).length;

  page = page?.find((item) => item._id.startsWith(`drafts.`)) || page?.[0];

  return {
    props: {
      page: page ?? null,
      slug: joinedSlug,
      isDraft: isDraft === 0,
      validPath: !!page,
      preview,
    },
    revalidate: 10,
  };
};

export default Page;
