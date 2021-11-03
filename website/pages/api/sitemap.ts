import { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";
import { getDsPaths } from "../../lib";

/* https://linguinecode.com/post/add-robots-txt-file-sitemaps-nextjs */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const smStream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    // List of posts
    const pages = await getDsPaths().then((paths) =>
      paths.map((slugs) => slugs.join("/"))
    );

    // Create each URL row
    pages.forEach((post) => {
      smStream.write({
        url: `/${post}`,
        changefreq: "weekly",
        priority: 0.5,
      });
    });

    smStream.end();

    // XML sitemap string
    const sitemapOutput = (await streamToPromise(smStream)).toString();

    // Change headers
    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    // Display output to user
    res.end(sitemapOutput);
  } catch (e) {
    console.log(e);
    res.send(JSON.stringify(e));
  }
};
