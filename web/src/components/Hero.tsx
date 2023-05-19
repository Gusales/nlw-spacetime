import Image from 'next/image'
import Link from 'next/link'
import Logo from '../assets/logo.svg'

export default function Hero() {
  return (
    <div className="space-y-5">
      <Image src={Logo} alt="NLW Spacetime" />

      <div className="max-w-[420px] space-y-1">
        <h1 className="text-5xl font-bold leading-tight text-gray-50">
          Cápsula do Tempo
        </h1>
        <p className="text-lg leading-relaxed">
          Colecione momentos marcantes da sua jornada e compartilhe (se quiser)
          com o mundo!
        </p>
      </div>

      <Link
        href="/memories/new"
        className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-gray-950 hover:bg-green-600"
      >
        CADASTRAR LEMBRANÇA
      </Link>
    </div>
  )
}
