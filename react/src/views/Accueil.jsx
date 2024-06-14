export default function Accueil() {
  return (
    <div className="bg-white">
      <div className="py-24 mx-auto max-w-7xl sm:px-6 sm:py-2 lg:px-1">
        <div className="relative px-6 pt-16 overflow-hidden bg-gray-900 shadow-2xl isolate sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="max-w-md mx-auto text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Bienvenue sur HETRAONLINE
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Ce site regroupe en un seul Espace les differentes
              Fonctionnalites(Immatriculation,Paiment virtuel,Consultation de
              situation fiscale)
            </p>
            <div className="flex items-center justify-center mt-10 gap-x-6 lg:justify-start">
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-white"
              >
                Plus informations <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="/hetra3.png"
              alt="hetra"
              width={900}
              height={1080}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
