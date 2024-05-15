import { getAllPlanets } from "app/planetas/utils";
import { baseUrl } from "app/sitemap";

export async function GET() {
	let allBlogs = await getAllPlanets();

	const itemsXml = allBlogs
		.sort((a, b) => {
			if (a.metadata.ua < b.metadata.ua) {
				return -1;
			}
			return 1;
		})
		.map(
			(post) =>
				`<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/planetas/${post.slug}</link>
          <description>${post.metadata.summary || ""}</description>
        </item>`
		)
		.join("\n");

	const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Sistema Solar</title>
        <link>${baseUrl}</link>
        <description>Informacion acerca de nuestro sistema solar.</description>
        ${itemsXml}
    </channel>
  </rss>`;

	return new Response(rssFeed, {
		headers: {
			"Content-Type": "text/xml",
		},
	});
}
