"use client"

import Link from "next/link";

import SubMainNav from "@/components/SubMainNav";
import Container from "@/components/ui/Container";
import NavbarActions from "@/components/NavbarActions";
// import getCategories from "@/actions/getCategories";

const SubNav = () => {
  // const categories = await getCategories();

  return ( 
    <div className="flex w-full">
        <div className="relative px-4 sm:px-6 lg:px-8 flex justify-center h-16 items-center min-w-full">
          <SubMainNav />
          <div className="justify-end">
            <NavbarActions />
          </div>
        </div>
    </div>
  );
};
 
export default SubNav;