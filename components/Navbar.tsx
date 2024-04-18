import Link from "next/link";

import MainNav from "@/components/MainNav";
import Container from "@/components/ui/Container";
import NavbarActions from "@/components/NavbarActions";
import getCategories from "@/actions/getCategories";

const Navbar = async () => {
  const categories = await getCategories();

  return ( 
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-0 flex gap-x-2">
            <p className="font-bold text-xl">Trillion Troves</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};
 
export default Navbar;