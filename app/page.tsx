import { BlogPlanets } from "app/components/posts";

export default function Page() {
	return (
		<section>
			<h1 className="mb-8 text-2xl font-semibold tracking-tighter">Sistema Solar</h1>
			<p className="mb-4">
				{`Nuestro sistema solar está compuesto por el Sol y ocho planetas principales: Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano y Neptuno. Además de los planetas, hay numerosos cuerpos celestes más pequeños, como asteroides, cometas y satélites naturales, que orbitan alrededor del Sol. Cada planeta tiene características únicas, desde la densa atmósfera de Venus hasta los espectaculares anillos de Saturno. La Tierra es el único planeta conocido por albergar vida, mientras que Júpiter es el más grande de todos y Neptuno es el más distante del Sol. 
      `}
			</p>
			<p className="font text-md shadow-sm shadow-[#4f46e5] w-fit p-2">
				<em>Lo sabias?</em>
			</p>
			<div className="my-8">
				<BlogPlanets />
			</div>
		</section>
	);
}
