
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";


export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  // token: process.env.SANITY_TOKEN!,
  useCdn,
});
