import Link from "next/link";
import Image from 'next/image';

export const Header = () => {
  return (
  <div>
    <Link href="/">
      <a>
        <Image
          src="/logo.png"
          alt="Picture of the author"
          objectFit="cover"
          loading="eager"
          width={300}
          height={100}
        />
      </a>
    </Link>
    <h1>Characters of Marvel</h1>
    <Link href="/login">
      <a>Compte</a>
    </Link>
  </div>

  )
}