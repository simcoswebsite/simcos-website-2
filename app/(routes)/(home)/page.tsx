import getBillboard from "@/actions/getBillboard";
import getProducts from "@/actions/getProducts";
import ProductList from "@/components/ProductList";
import Billboard from "@/components/ui/Billboard";
import Container from "@/components/ui/Container";

import Image from "next/image";
import { HotDog } from "./components/hotdog";
import { bevan, robotoCondensed } from "@/fonts";
import { SimcosButton } from "@/components/ui/SimcosButton";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  // TODO:refactor to make more dynamic
  const billboard = await getBillboard(`179e1a71-193b-4f5f-aaae-07ffef632132`);

  return (
    <Container>
      <div className="flex py-24 min-h-full max-h-full min-w-full flex-grow flex-col md:flex-row">
        <div className="flex flex-col items-stretch basis-1/2 max-h-full max-w-full relative">
          <div className="relative flex flex-col items-center justify-center min-h-full max-h-full">
            <div className="h-full w-full relative basis-1/2">
              <Image
                alt="An image of Simco's logo"
                src="/simcos-logo.png"
                fill
                priority={true}
                style={{objectFit:"contain"}}
              />
              </div>
            <div className="flex flex-col items-center relative px-20 text-center basis-1/2">
              <h1 className={`text-white text-3xl m-8 mb-4 ${bevan.className}`}>
                HUNGRY?
              </h1>
              <p className={`text-white text-xl ${robotoCondensed.className}`}>
                {`Welcome to Simco’s`}
              </p>
              <p className={`text-white text-xl ${robotoCondensed.className}`}>
                {`Welcome to Simco’s Home of the Worlds Largest Old Tyme Franks Serving iconic food & drink for lunch, dinner, and late-night cravings to the Boston area since 1935.`}
              </p>
              <SimcosButton
                variant={"simcos"}
                size={'nav'}
                className={bevan.className}
              >
                MENU
              </SimcosButton>
            </div>
          </div>
          {/* <ProductList title="" items={products} /> */}
        </div>
        {/* <HotDog /> */}
      </div>
    </Container>
  )
};

export default HomePage;