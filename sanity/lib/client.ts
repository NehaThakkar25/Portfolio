import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Live API (not the CDN) so freshly published content shows immediately.
  // With ISR (revalidate) this stays fast in production.
  useCdn: false,
});
