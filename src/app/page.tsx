import Navegacion from "@/componentes/Navegacion";
import Inicio from "@/componentes/Inicio";
import Trabajo from "@/componentes/Trabajo";
import MarcaStack from "@/componentes/MarcaStack";
import Servicios from "@/componentes/Servicios";
import Proceso from "@/componentes/Enfoque";
import Contacto from "@/componentes/Contacto";
import PieDePagina from "@/componentes/PieDePagina";
import WhatsAppFlotante from "@/componentes/WhatsAppFlotante";

export default function Home() {
  return (
    <>
      <Navegacion />
      <main className="flex flex-col flex-1 w-full">
        <Inicio />
        <Trabajo />
        <MarcaStack />
        <Servicios />
        <Proceso />
        <Contacto />
      </main>
      <PieDePagina />
      <WhatsAppFlotante />
    </>
  );
}
