import fs from "fs/promises";
import path from "path";

type Metadata = {
	title: string;
	summary: string;
	image: string;
	ua: string;
	composition: string;
};

function parseFrontmatter(fileContent: string) {
	let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
	let match = frontmatterRegex.exec(fileContent);
	let frontMatterBlock = match![1];
	let content = fileContent.replace(frontmatterRegex, "").trim();
	let frontMatterLines = frontMatterBlock.trim().split("\n");
	let metadata: Partial<Metadata> = {};

	frontMatterLines.forEach((line) => {
		let [key, ...valueArr] = line.split(": ");
		let value = valueArr.join(": ").trim();
		value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
		metadata[key.trim() as keyof Metadata] = value;
	});

	return { metadata: metadata as Metadata, content };
}

async function getMDXFiles(dir: string) {
	return (await fs.readdir(dir)).filter((file) => path.extname(file) === ".mdx");
}

async function readMDXFile(filePath) {
	let rawContent = await fs.readFile(filePath, "utf-8");
	return parseFrontmatter(rawContent);
}

async function getMDXData(dir) {
	let mdxFiles = await getMDXFiles(dir);
	return mdxFiles.map(async (file) => {
		let { metadata, content } = await readMDXFile(path.join(dir, file));
		let slug = path.basename(file, path.extname(file));

		return {
			metadata,
			slug,
			content,
		};
	});
}

export async function getAllPlanets() {
	return await getMDXData(path.join(process.cwd(), "app", "planetas", "posts"));
}
