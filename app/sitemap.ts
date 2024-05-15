import { getAllPlanets } from "app/planetas/utils";

export const baseUrl = "https://portfolio-blog-starter.vercel.app";

export default async function sitemap() {
	let blogs = getAllPlanets().map((post) => ({
		url: `${baseUrl}/planetas/${post.slug}`,
	}));

	let routes = ["", "/planetas"].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date().toISOString().split("T")[0],
	}));

	return [...routes, ...blogs];
}
