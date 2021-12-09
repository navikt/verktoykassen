import { documentMetadata } from "../templates/document-metadata-template";
import { documentInformation } from "../templates/document-template";
import { defaultPreview } from "../templates/document-preview-template";
import { documentSearchMetadata } from "../templates/document-search-template";

const prefix = "designsystem/side/";

export default {
  title: "Artikkel med tabs",
  name: "ds_tabbed_article_page",
  type: "document",
  ...defaultPreview(),
  fields: [
    documentMetadata("article"),
    ...documentInformation(prefix),
    {
      name: "tabs",
      title: "Tabs",
      type: "array",
      of: [
        {
          name: "tab",
          title: "Tab",
          type: "object",
          fields: [
            {
              title: "Tittel",
              description: "Innhold vil da legges under url/tab-tittel",
              name: "title",
              type: "string",
              validation: (Rule) =>
                Rule.required().error("Tabben må ha en enkel tittel"),
            },
            {
              title: "Sideinnhold",
              name: "body",
              type: "blockContent",
              validation: (Rule) =>
                Rule.required().error("Tabben må ha noe innhold"),
            },
            documentSearchMetadata,
          ],
        },
      ],
      validation: (Rule) => Rule.required().error("Siden må ha minst en tab"),
    },
  ],
};
