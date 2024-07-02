import Image from "next/image"
import Link from "next/link";

const Header = () => {
  
  return ( 
    <nav className="
      flex 
      items-center 
      relative 
      min-h-min 
      justify-center 
      w-full 
      bg-white
      border-black 
      border-solid 
      border-b-2
      ">
      <Link href="/">
      <div className="relative h-full w-full py-2">
        <Image
          alt="An image of Simco's logo"
          src="/simcos-logo.png"
          height={200}
          width={200}
          style={{
            // position: 'absolute',
            objectFit: 'cover'
          }}
        />
      </div>
      </Link>
    </nav>
   );
}
 
export default Header;