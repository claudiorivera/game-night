import { XMLParser } from "fast-xml-parser";

export const buildUrl = (
	url: string,
	queries: Array<Record<string, unknown>>,
) => {
	const _url = new URL(url);

	queries.forEach((arg) => {
		Object.entries(arg).forEach(([key, value]) => {
			_url.searchParams.append(key, String(value));
		});
	});

	return _url.toString();
};

export const xmlParser = new XMLParser({
	attributeNamePrefix: "",
	ignoreAttributes: false,
	parseAttributeValue: true,
});
