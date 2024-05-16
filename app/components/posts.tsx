import { getAllPlanets } from "app/planetas/utils";
import Link from "next/link";

export async function BlogPlanets() {
	const allPlanets = await Promise.all(await getAllPlanets());

	return (
		<div>
			{allPlanets
				.sort((a, b) => {
					if (a.metadata.ua < b.metadata.ua) {
						return -1;
					}
					return 1;
				})
				.map((post) => (
					<Link
						key={post.slug}
						className="flex flex-col space-y-1 mb-4"
						href={`/planetas/${post.slug}`}
					>
						<div className="w-full flex flex-row space-x-0 md:space-x-2">
							<p className="text-[#4338ca] dark:text-[#a5b4fc] w-[50px] tabular-nums">
								{post.metadata.ua}
							</p>
							<p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
								{post.metadata.title}
							</p>
						</div>
					</Link>
				))}
		</div>
	);
}
