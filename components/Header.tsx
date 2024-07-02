import Image from "next/image"
import Link from "next/link";

const Header = () => {
  
  return ( 
    <nav className="
      flex 
      items-center 
      relative 
      min-h-[20vh] 
      justify-center 
      w-full 
      bg-white
      border-black 
      border-solid 
      border-b-2
      ">
      <Link href="/">
      <div className="relative h-full w-full">
        <Image
          alt="An image of Simco's logo"
          src="/simcos-logo.png"
          height={200}
          width={200}
          // style={{
          //   position: 'absolute'
          // }}
        />
      </div>
      </Link>
    </nav>
   );
}
 
export default Header;