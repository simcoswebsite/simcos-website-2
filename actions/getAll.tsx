import { Product } from "@/types";
import qs from "query-string";

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}


const getAll = async (query: Query): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: "https://admin-dashboard-commerce.vercel.app/api/71c9f33e-9448-4cab-8076-c777af94cf22/products",
    query: { 
      colorId: "test",
      sizeId: "test",
      categoryId: "test",
      isFeatured: "test",
    },
  });
  debugger
  const res = await fetch(url);

  return res.json();
};

export default getAll;