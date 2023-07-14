import getBillboard from "@/actions/getBillboard";
import getProducts from "@/actions/getProducts";
import ProductList from "@/components/ProductList";
import Billboard from "@/components/ui/Billboard";
import Container from "@/components/ui/Container";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  // TODO:refactor to make more dynamic
  const billboard = await getBillboard("fc1f14e2-b17e-4e1f-8a24-25c4dd929379");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard 
          data={billboard}
        />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  )
};

export default HomePage;