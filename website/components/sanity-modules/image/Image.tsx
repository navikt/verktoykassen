import { BodyLong } from "@navikt/ds-react";
import NextImage from "next/image";
import React, { useState } from "react";
import { Lightbox } from "../..";
import { useSanityImage, Picture as PictureT } from "../../../lib";
import { withErrorBoundary } from "../../ErrorBoundary";

const Image = ({ node }: { node: PictureT }): JSX.Element => {
  if (!node || !node.asset) {
    return null;
  }

  const [open, setOpen] = useState(false);

  const imageProps = useSanityImage(node);

  return (
    <figure className="m-0 mb-8 flex flex-col">
      <button
        aria-label="Klikk for å åpne bildet i fullskjerm"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        className="rounded bg-gray-50 p-0 shadow-[0_0_0_1px_var(--navds-semantic-color-divider)] focus:shadow-focus focus:outline-none"
      >
        <NextImage
          {...imageProps}
          alt={node.title}
          quality="75"
          layout="responsive"
          className="rounded"
          sizes="800px"
        />
      </button>
      {node.caption && (
        <BodyLong as="figcaption" className="mt-2 self-center italic">
          {node.caption}
        </BodyLong>
      )}
      <Lightbox open={open} onClose={() => setOpen(false)}>
        {open && (
          <NextImage
            {...imageProps}
            quality="100"
            layout="fill"
            alt={node.title}
          />
        )}
      </Lightbox>
    </figure>
  );
};

export default withErrorBoundary(Image, "Image");
