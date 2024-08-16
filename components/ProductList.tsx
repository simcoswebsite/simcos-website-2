import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types";
import NoResults from "@/components/ui/NoResults";
import { robotoCondensed, roboto } from "@/fonts"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ProductListProps {
  title: string;
  items: Product[] | any[]
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items
}) => {
  return (
    <AccordionItem value={title} className="space-y-4">
      <AccordionTrigger>
        <h1 className={`text-[18px] py-4 ${robotoCondensed.className}`}>{title}</h1>
      </AccordionTrigger>
      <AccordionContent>
        {items.length === 0 && <NoResults />}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => {
            // const uniqueId = uuidv4()
            // const itemWithId = { ...item, uniqueId: uniqueId }
            return(
              <ProductCard key={item.id} data={item} />
            )
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
   );
}
 
export default ProductList;