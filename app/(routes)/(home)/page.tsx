import getBillboard from "@/actions/getBillboard";
import getProducts from "@/actions/getProducts";
import ProductList from "@/components/ProductList";
import Billboard from "@/components/ui/Billboard";
import Container from "@/components/ui/Container";

import Image from "next/image";
import { HotDog } from "./components/hotdog";
import { bevan, robotoCondensed } from "@/fonts";
import { SimcosButton } from "@/components/ui/SimcosButton";
import Navbar  from "@/components/Navbar"
import Link from "next/link";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  // TODO:refactor to make more dynamic
  const billboard = await getBillboard(`179e1a71-193b-4f5f-aaae-07ffef632132`);

  return (
    <Container>
      <div className="flex flex-col max-w-full">
      <Navbar />
        <div className="flex py-24 min-h-screen max-h-full min-w-full flex-col md:flex-row">
          <div className="flex flex-col items-stretch basis-1/2 max-h-full max-w-full relative">
            <div className="relative flex flex-col items-center justify-center min-h-full max-h-full">
              <div className="flex min-h-min min-w-min max-h-full max-w-full relative basis-1/2 items-center justify-center">
                <Image
                  alt="An image of Simco's logo"
                  src="/simcos-logo.png"
                  height={300}
                  width={300}
                  priority={true}
                  style={{objectFit:"cover"}}
                />
              </div>
              <div className="flex flex-col items-center relative mx-20 text-center basis-1/2">
                <h1 className={`text-white text-3xl m-8 mb-4 ${bevan.className}`}>
                  HUNGRY?
                </h1>
                <p className={`text-white text-xl mb-4 ${robotoCondensed.className}`}>
                  {`Welcome to Simco’s`}
                </p>
                <p className={`text-white text-xl mb-4 ${robotoCondensed.className}`}>
                  {`Welcome to Simco’s Home of the World's Largest Old Tyme Franks Serving iconic food & drink for lunch, dinner, and late-night cravings to the Boston area since 1935.`}
                </p>
                <div className="flex mb-4 sm:flex-row">
                  {/* <Link href="/menu">
                    <SimcosButton
                      variant={"simcos"}
                      size={'nav'}
                      className={bevan.className}
                    >
                      MENU
                    </SimcosButton>
                  </Link> */}
                  <Link href="/menu">
                    <SimcosButton
                      variant={"simcos"}
                      size={'nav'}
                      className={bevan.className}
                    >
                      PICKUP
                    </SimcosButton>
                  </Link>
                  <Link href="https://order.online/online-ordering/business/simcos-171605?delivery=true">
                    <SimcosButton
                      variant={"simcos"}
                      size={'nav'}
                      className={bevan.className}
                    >
                      DELIVERY
                    </SimcosButton>
                  </Link>
                </div>
                <div className="mb-4">
                  <Link href="/menu">
                      <SimcosButton
                        variant={"simcos"}
                        size={'nav'}
                        className={bevan.className}
                      >
                        MENU
                      </SimcosButton>
                    </Link>
                </div>
              </div>
            </div>
            {/* <ProductList title="" items={products} /> */}
          </div>
          <div className="basis-1/2 min-h-min min-w-min max-h-full max-w-full relative">
            <HotDog />
          </div>
        </div>
      </div>
    </Container>
  )
};

export default HomePage;