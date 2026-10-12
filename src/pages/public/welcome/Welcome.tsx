import LibrariumImg from "@/assets/imgs/librarium_welcome.svg";
import { Button } from "@/components/ui/button";
import { MoveRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export const Welcome = () => {

  const navigate = useNavigate();
  
  const handleRedirectAuth = (flag:string) => {
    navigate(`/auth/${flag}`);
  };

  return (
    <section className="animate__animated animate__fadeIn mx-auto w-full max-w-6xl px-3 sm:px-6">
      {/* subtitulo superior */}
      <div className="subtitle">
        <h6 className='text-xs text-brand-coral'>BIENVENIDO A LIBRARIUM</h6>
      </div>
      {/* contenedor titulo */}
      <div className="presentation mx-auto mt-2 grid w-full max-w-6xl grid-cols-1 items-center gap-8 p-3 md:grid-cols-2">
        {/* contenedor info */}
        <div className="flex flex-col justify-around">
          {/* titulo */}
          <div>
            <h2 className="text-5xl">Tu santuario</h2>
            <h2 className='text-5xl text-brand-coral italic'>literario personal</h2>
          </div>
          {/* texto */}
          <div className="mt-3">
            <p className="text-black opacity-60">Organiza, cataloga y redescubre tu biblioteca privada
con una herramienta diseñada para el deleite táctil del
lector moderno. Una gestión local impecable para
mentes curiosas.</p>
          </div>
          {/* botones */}
          <div className="mt-9 flex flex-row flex-wrap">
            <Button className="bg-brand-coral flex gap-2 p-5 rounded-3xl mx-2" onClick={() => handleRedirectAuth("login")}>
              Acceder
              <MoveRight />  
            </Button>
            <Button className="bg-brand-coral flex gap-2 p-5 rounded-3xl mx-2"onClick={() => handleRedirectAuth("register")}>
              Registrarse
              <MoveRight />  
            </Button>
          </div>
        </div>
        {/* contenedor img */}
        <div>
          <img className="w-full rounded-2xl" src={LibrariumImg} alt="Librarium" />
        </div>
      </div>
      {/* metricas */}
      <div className="metrics"></div>
      {/* banners */}
      <div className="info"></div>
    </section>
  )
}
