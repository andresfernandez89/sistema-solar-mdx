import { BlogPlanets } from "app/components/posts";

export const metadata = {
	title: "Planetas",
	description: "Informacion de todos los planetas del sistema solar.",
};

export default function Page() {
	return (
		<section>
			<h1 className="font-semibold text-2xl mb-8 tracking-tighter">Planetas</h1>
			<BlogPlanets />
		</section>
	);
}
