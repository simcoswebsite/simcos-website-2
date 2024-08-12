'use client'
import { robotoCondensed, roboto } from "@/fonts"
import { SearchBar } from "@/components/ui/searchbar"
import { SimcosButton } from "@/components/ui/SimcosButton"
import ProductCard from '@/components/ui/ProductCard';
import ProductList from "@/components/ProductList";
import NoResults from '@/components/ui/NoResults';
import { Product } from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



import categories from './categories.json'

import { useEffect, useState } from 'react'

export default function MenuPage(){
  const [error, setError] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const menuCategories = Object.keys(categories).map((category) => {
    return <h1>{category}</h1>
  })


  useEffect(() => {
    const fetchmenus = async () => {
      try {
        const response = await fetch('/api/menus');
        console.log(response)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data)
        setMenus(data);
      } catch (error) {
        console.log(error)
      } 
    };

    fetchmenus();
  }, []);

  // console.log("here", menus)

  const menu = []

  for (const key in menus){
    const items = menus[key]
    const list = Object.values(items).map((item, index)=>{
      // return <p key={index}>{item}</p>
      const obj = {
        id: item.id,
        // category: item.category,
        name: item.name,
        // isDeleted: item.isDeleted,
        // itemData: item.itemData,
        price:item.itemData.variations[0].itemVariationData.priceMoney.amount,
        // modifiers: item.itemData.modifiers.filter((modifier) => modifier.type == 'MODIFIER_LIST'),
        // sizeOptions: item.itemData.variations
      }
      // return <ProductCard key={index} data={item}/>
      return obj
    })
    // debugger
    console.log("menu list", list)
    menu.push(
      // <div key={key}>
      //   <h1>{key}</h1>
      //   <ul>{list}</ul>
      // </div>
      <ProductList title={key} items={list}/>

    )
  }
  console.log("RELEVANT DATA", menu)
  return(
    <div className='w-full h-full bg-white px-8 md:px-40 lg:px-40 flex flex-col'>
      <h1 className={`text-[30px] py-2 ${robotoCondensed.className}`}>MENU</h1>
      <SearchBar className={`${roboto.className}`} placeholder="〇 Search"/>
      <h1 className={`text-[18px] py-2 ${robotoCondensed.className}`}>PROMOTIONS</h1>
      <div className="min-h-24 min-w-full bg-[#EF370D] rounded-xl flex">
        <div className="flex flex-col p-4">
          <p className={`text-[15px] py-1 text-white ${roboto.className}`}>Todays Offer</p>
          <p className={`text-[18px]  text-white ${robotoCondensed.className}`}>FREE BOX OF FRIES</p>
          <p className={`text-[13px] text-white ${roboto.className}`}>On all orders above $150</p>
        </div>
        <div className="bg-[#EFEFEF] h-16 w-24 border-black border-[1px] border-solid rounded-lg relative bottom-5 left-5">
          {/* image of promotional item */}
        </div>
      </div>
      <h1 className={`text-[18px] py-4 ${robotoCondensed.className}`}>POPULAR</h1>
      <div>
        {menuCategories}
        {/* {menus.map((category) =>(
          <p>{category.categoryData.name}</p>
        ))} */}
        {/* {items.map((item) =>(
          <p>{item.itemData}</p>
        ))} */}
      </div>
      {/* <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
      </div> */}
      {/* <div className="grid grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <SimcosButton variant={"filter"} size={"tile"}>
          <div className="flex flex-col items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-white"></div>
              <p className={`text-[13px] text-black py-1 ${roboto.className}`}>Hot Dog</p>
            </div>
          </SimcosButton>
        </div>
        <div className="flex flex-col items-center justify-center">
          <SimcosButton variant={"filter"} size={"tile"}>
            <div className="flex flex-col items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-white"></div>
              <p className={`text-[13px] text-black py-1 ${roboto.className}`}>Cheeseburger</p>
            </div>
          </SimcosButton>
        </div>
      </div> */}
    </div>
  )
}