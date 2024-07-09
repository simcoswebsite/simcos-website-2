'use client'
import { robotoCondensed, roboto } from "@/fonts"
import { SearchBar } from "@/components/ui/searchbar"
import { SimcosButton } from "@/components/ui/SimcosButton"
import ProductCard from '@/components/ui/ProductCard';
import NoResults from '@/components/ui/NoResults';

import { useEffect, useState } from 'react'

export default function MenuPage(){
  const products = [
    {
      id: 'cdf907d4-9d74-4003-80b4-7219a856eb2e',
      storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
      categoryId: '00eff0fd-4041-4b4d-9372-9ff730aad16e',
      name: 'Turkey Wrap',
      price: '14.95',
      isFeatured: false,
      isArchived: false,
      sizeId: '217d9983-99f7-4f01-a50d-f1ec2c6ada31',
      colorId: '6f03850f-d31d-4b2c-bd26-9f12ecde30b4',
      createdAt: '2024-06-23T20:36:57.144Z',
      updatedAt: '2024-06-23T20:36:57.144Z',
      images: [{
        "id": "9805b6e6-0057-4288-b1c4-d0cc49cf723f",
        "productId": "cdf907d4-9d74-4003-80b4-7219a856eb2e",
        "url": "https://res.cloudinary.com/drxcdjs2l/image/upload/v1719175011/jbs9pagb94yeteiuksse.jpg",
        "createdAt": "2024-06-23T20:36:57.144Z",
        "updatedAt": "2024-06-23T20:36:57.144Z"
      }],
      category: {
        id: '00eff0fd-4041-4b4d-9372-9ff730aad16e',
        storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
        billboardId: '501b7d1c-dd5c-48dd-8314-8e752c1fca55',
        name: 'Wraps',
        createdAt: '2024-06-23T20:15:20.311Z',
        updatedAt: '2024-06-23T20:15:20.311Z'
      },
      color: {
        id: '6f03850f-d31d-4b2c-bd26-9f12ecde30b4',
        storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
        name: 'Simcos-Orange',
        value: '#EF370D',
        createdAt: '2024-06-23T20:28:27.808Z',
        updatedAt: '2024-06-23T20:28:27.808Z'
      },
      size: {
        id: '217d9983-99f7-4f01-a50d-f1ec2c6ada31',
        storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
        name: 'Small',
        value: 'S',
        createdAt: '2024-06-23T20:13:11.701Z',
        updatedAt: '2024-06-23T20:13:11.701Z'
      }
    },
    {
      id: 'a513e191-12c5-495e-a30b-332e8b42fa1d',
      storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
      categoryId: '00eff0fd-4041-4b4d-9372-9ff730aad16e',
      name: 'Roast Beef Wrap',
      price: '14.95',
      isFeatured: false,
      isArchived: false,
      sizeId: '217d9983-99f7-4f01-a50d-f1ec2c6ada31',
      colorId: '6f03850f-d31d-4b2c-bd26-9f12ecde30b4',
      createdAt: '2024-06-23T20:35:06.984Z',
      updatedAt: '2024-06-23T20:35:06.984Z',
      images: [{
        "id": "db0651b9-3e0a-4651-b572-90b4cfe73a6f",
        "productId": "a513e191-12c5-495e-a30b-332e8b42fa1d",
        "url": "https://res.cloudinary.com/drxcdjs2l/image/upload/v1719174875/dfxv1zf5630dh0wlq96c.jpg",
        "createdAt": "2024-06-23T20:35:06.984Z",
        "updatedAt": "2024-06-23T20:35:06.984Z"
      }],
      category: {
        id: '00eff0fd-4041-4b4d-9372-9ff730aad16e',
        storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
        billboardId: '501b7d1c-dd5c-48dd-8314-8e752c1fca55',
        name: 'Wraps',
        createdAt: '2024-06-23T20:15:20.311Z',
        updatedAt: '2024-06-23T20:15:20.311Z'
      },
      color: {
        id: '6f03850f-d31d-4b2c-bd26-9f12ecde30b4',
        storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
        name: 'Simcos-Orange',
        value: '#EF370D',
        createdAt: '2024-06-23T20:28:27.808Z',
        updatedAt: '2024-06-23T20:28:27.808Z'
      },
      size: {
        id: '217d9983-99f7-4f01-a50d-f1ec2c6ada31',
        storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
        name: 'Small',
        value: 'S',
        createdAt: '2024-06-23T20:13:11.701Z',
        updatedAt: '2024-06-23T20:13:11.701Z'
      }
    },
    {
      id: 'b6dca3a1-3b7a-44c4-b3dc-b55541c635a7',
      storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
      categoryId: '00eff0fd-4041-4b4d-9372-9ff730aad16e',
      name: 'Shrimp Wrap',
      price: '19.95',
      isFeatured: false,
      isArchived: false,
      sizeId: '217d9983-99f7-4f01-a50d-f1ec2c6ada31',
      colorId: '6f03850f-d31d-4b2c-bd26-9f12ecde30b4',
      createdAt: '2024-06-23T20:32:36.502Z',
      updatedAt: '2024-06-23T20:32:36.502Z',
      images:  [{
        "id": "e27af6e4-45e5-439f-8a5b-91d0a79c4866",
        "productId": "b6dca3a1-3b7a-44c4-b3dc-b55541c635a7",
        "url": "https://res.cloudinary.com/drxcdjs2l/image/upload/v1719174750/yrc7tz0itv5sckzyd4j6.jpg",
        "createdAt": "2024-06-23T20:32:36.502Z",
        "updatedAt": "2024-06-23T20:32:36.502Z"
      }],
      category: {
        id: '00eff0fd-4041-4b4d-9372-9ff730aad16e',
        storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
        billboardId: '501b7d1c-dd5c-48dd-8314-8e752c1fca55',
        name: 'Wraps',
        createdAt: '2024-06-23T20:15:20.311Z',
        updatedAt: '2024-06-23T20:15:20.311Z'
      },
      color: {
        id: '6f03850f-d31d-4b2c-bd26-9f12ecde30b4',
        storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
        name: 'Simcos-Orange',
        value: '#EF370D',
        createdAt: '2024-06-23T20:28:27.808Z',
        updatedAt: '2024-06-23T20:28:27.808Z'
      },
      size: {
        id: '217d9983-99f7-4f01-a50d-f1ec2c6ada31',
        storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
        name: 'Small',
        value: 'S',
        createdAt: '2024-06-23T20:13:11.701Z',
        updatedAt: '2024-06-23T20:13:11.701Z'
      }
    },
    {
      id: 'ece65876-1b8a-4449-a1e0-ef50f7573d46',
      storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
      categoryId: '00eff0fd-4041-4b4d-9372-9ff730aad16e',
      name: 'Cripsy Chicken Wrap',
      price: '16.95',
      isFeatured: false,
      isArchived: false,
      sizeId: '217d9983-99f7-4f01-a50d-f1ec2c6ada31',
      colorId: '6f03850f-d31d-4b2c-bd26-9f12ecde30b4',
      createdAt: '2024-06-23T20:29:28.830Z',
      updatedAt: '2024-06-23T20:29:28.830Z',
      images:  [{
        "id": "be83565c-a590-4e47-8697-7e905506abc8",
        "productId": "ece65876-1b8a-4449-a1e0-ef50f7573d46",
        "url": "https://res.cloudinary.com/drxcdjs2l/image/upload/v1719174560/ezo5qqljpbsfgvysheg3.jpg",
        "createdAt": "2024-06-23T20:29:28.830Z",
        "updatedAt": "2024-06-23T20:29:28.830Z"
      }],
      category: {
        id: '00eff0fd-4041-4b4d-9372-9ff730aad16e',
        storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
        billboardId: '501b7d1c-dd5c-48dd-8314-8e752c1fca55',
        name: 'Wraps',
        createdAt: '2024-06-23T20:15:20.311Z',
        updatedAt: '2024-06-23T20:15:20.311Z'
      },
      color: {
        id: '6f03850f-d31d-4b2c-bd26-9f12ecde30b4',
        storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
        name: 'Simcos-Orange',
        value: '#EF370D',
        createdAt: '2024-06-23T20:28:27.808Z',
        updatedAt: '2024-06-23T20:28:27.808Z'
      },
      size: {
        id: '217d9983-99f7-4f01-a50d-f1ec2c6ada31',
        storeId: '71c9f33e-9448-4cab-8076-c777af94cf22',
        name: 'Small',
        value: 'S',
        createdAt: '2024-06-23T20:13:11.701Z',
        updatedAt: '2024-06-23T20:13:11.701Z'
      }
    }
  ]

  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        console.log(response)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data)
        setCategories(data);
      } catch (error) {
        console.log(error)
      } 
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items');
        console.log(response)
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data.objects);
      } catch (error) {
        console.log(error)
      } 
    };

    fetchItems();
  }, []);

  console.log("here", categories)

  return(
    <div className='w-full h-full bg-white px-8 md:px-40 lg:px-40 flex flex-col'>
      <h1 className={`text-[30px] py-2 ${robotoCondensed.className}`}>MENU</h1>
      <SearchBar className={`${roboto.className}`} placeholder="〇 Search"/>
      <div className="flex py-8 justify-evenly">
        <div className="flex flex-col items-center">
          <SimcosButton variant={"filter"} size={"item"}>
            <div className="bg-[#EF370D] hover:bg-white rounded-full h-8 w-8"></div>
          </SimcosButton>
          <p className={`text-[15px] py-1 ${roboto.className}`}>All</p>
        </div>
        <div className="flex flex-col items-center">
          <SimcosButton variant={"filter"} size={"item"}>
            <div className="bg-[#EF370D] hover:bg-white rounded-full h-8 w-8"></div>
          </SimcosButton>
          <p className={`text-[15px] py-1 ${roboto.className}`}>Hot Dog</p>
        </div>
        <div className="flex flex-col items-center">
          <SimcosButton variant={"filter"} size={"item"}>
            <div className="bg-[#EF370D] hover:bg-white rounded-full h-8 w-8"></div>
          </SimcosButton>
          <p className={`text-[15px] py-1 ${roboto.className}`}>Burger</p>
        </div>
        <div className="flex flex-col items-center">
          <SimcosButton variant={"filter"} size={"item"}>
            <div className="bg-[#EF370D] hover:bg-white rounded-full h-8 w-8"></div>
          </SimcosButton>
          <p className={`text-[15px] py-1 ${roboto.className}`}>Pizza</p>
        </div>
      </div>
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
        {/* {categories.map((category) =>(
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