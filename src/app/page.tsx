import Navegacion from "@/componentes/Navegacion";
import Inicio from "@/componentes/Inicio";
import Trabajo from "@/componentes/Trabajo";
import MarcaStack from "@/componentes/MarcaStack";
import Enfoque from "@/componentes/Enfoque";
import Contacto from "@/componentes/Contacto";
import PieDePagina from "@/componentes/PieDePagina";

export default function Home() {
  return (
    <>
      <Navegacion />
      <main className="flex flex-col flex-1 w-full">
        <Inicio />
        <Trabajo />
        <MarcaStack />
        <Enfoque />
        <Contacto />
      </main>
      <PieDePagina />
    </>
  );
}
