import { readFileSync } from "fs";
import dotenv from "dotenv";
import { noCdnClient } from "../sanity/sanity.server";
import { DsProps } from "../types/autogen-types";

dotenv.config();

const docs_core = JSON.parse(
  readFileSync(__dirname + "/_docs-core.json", "utf8")
);
const docs_internal = JSON.parse(
  readFileSync(__dirname + "/_docs-internal.json", "utf8")
);

const ids = [];

const propList = (src: any, name: string): DsProps[] =>
  src.map((prop) => {
    if (ids.includes(`${prop.displayName.toLowerCase()}_${name}_ds_props`)) {
      console.error(
        `Found duplicate id: ${`${prop.displayName.toLowerCase()}_${name}_ds_props`}`
      );
    }
    ids.push(`${prop.displayName.toLowerCase()}_${name}_ds_props`);

    return {
      _id: `${prop.displayName.toLowerCase()}_${name}_ds_props`,
      _type: "ds_props",
      title: prop.displayName,
      displayname: prop.displayName,
      filepath: prop.filePath,
      proplist: Object.values(prop.props as unknown).map((val, y) => {
        return {
          _type: "prop",
          _key: val.name + y,
          name: val.name,
          defaultValue: val.defaultValue?.value ?? null,
          description: val.description,
          required: val.required,
          type: val.type.name,
          ref: val.name === "ref",
        };
      }),
    };
  });

const updateProps = async () => {
  const token = process.env.SANITY_WRITE_KEY;

  // this is our transactional client, it won't push anything until we say .commit() later
  const transactionClient = noCdnClient(token).transaction();

  propList(docs_core, "core").forEach((x) =>
    transactionClient.createOrReplace(x)
  );
  propList(docs_internal, "internal").forEach((x) =>
    transactionClient.createOrReplace(x)
  );

  await transactionClient
    .commit()
    .then(() => console.log(`Updated props`))
    .catch((e) => console.error(e.message));
};

updateProps();
