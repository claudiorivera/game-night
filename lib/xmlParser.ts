import { XMLParser } from "fast-xml-parser";

export const xmlParser = new XMLParser({
  attributeNamePrefix: "",
  ignoreAttributes: false,
  parseAttributeValue: true,
});
