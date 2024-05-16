"use server";
import { CustomMDX } from "app/components/mdx";
import { getAllPlanets } from "app/planetas/utils";
import { baseUrl } from "app/sitemap";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	let posts = getAllPlanets();

	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export function generateMetadata({ params }) {
	let post = getAllPlanets().find((post) => post.slug === params.slug);
	if (!post) {
		return;
	}

	let { title, summary: description, image } = post.metadata;
	let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: "article",
			url: `${baseUrl}/planetas/${post.slug}`,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [ogImage],
		},
	};
}

export default function Planets({ params }) {
	let post = getAllPlanets().find((post) => post.slug === params.slug);

	if (!post) {
		notFound();
	}

	return (
		<section>
			<script
				type="application/ld+json"
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "BlogPosting",
						headline: post.metadata.title,
						description: post.metadata.summary,
						image: post.metadata.image
							? `${baseUrl}${post.metadata.image}`
							: `/og?title=${encodeURIComponent(post.metadata.title)}`,
						url: `${baseUrl}/planetas/${post.slug}`,
						author: {
							"@type": "Person",
							name: "Andres Fernandez",
						},
					}),
				}}
			/>
			<h1 className="title font-semibold text-2xl tracking-tighter">{post.metadata.title}</h1>
			<div className="mt-3 mb-8 text-sm">
				<p className="text-sm mb-[5px] text-neutral-600 dark:text-neutral-400">
					<span className="pr-1 text-base text-[#c7d2fe] inline-block p-[2px] rounded-l bg-gray-800 text-gray-400 text-opacity-75 tracking-widest">
						Unidades astronómicas
					</span>
					<span className="border rounded-r py-[3px] px-[6px]">{post.metadata.ua}</span>
				</p>
				<p className="text-sm mb-1 text-neutral-600 dark:text-neutral-400">
					<span className="pr-1 text-base text-[#c7d2fe] inline-block p-[2px] rounded-l bg-gray-800 text-gray-400 text-opacity-75 tracking-widest">
						Composición:
					</span>
					<span className="border rounded-r py-[3px] px-[6px]">{post.metadata.composition}</span>
				</p>
			</div>
			<Image
				src={post.metadata.image}
				width={400}
				height={300}
				alt={post.metadata.summary}
				className="border-2 border-[#c7d2fe] rounded"
			/>

			<article className="prose">
				<CustomMDX source={post.content} />
			</article>
		</section>
	);
}
