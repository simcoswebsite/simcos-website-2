import Link from "next/link";

import MainNav from "@/components/MainNav";
import Container from "@/components/ui/Container";
import NavbarActions from "@/components/NavbarActions";
import getCategories from "@/actions/getCategories";

const Navbar = async () => {
  const categories = await getCategories();

  return ( 
    <div className="sm:flex md:fixed w-full">
        <div className="relative px-4 sm:px-6 lg:px-8 flex justify-end h-16 items-center min-w-full">
          <Link href="/" className="ml-0 flex gap-x-2">
            <p className="font-bold text-xl text-white">Home</p>
          </Link>
          <MainNav data={categories} />
          <div className="justify-end">
            <NavbarActions />
          </div>
        </div>
    </div>
  );
};
 
export default Navbar;