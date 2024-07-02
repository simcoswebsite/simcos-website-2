'use client'
import { robotoCondensed, roboto } from "@/fonts"
import { SearchBar } from "@/components/ui/searchbar"
import { SimcosButton } from "@/components/ui/SimcosButton"

export default function MenuPage(){
  return(
    <div className='w-full h-full bg-white px-8 flex flex-col'>
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
      <div className="grid grid-cols-2">
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
      </div>
    </div>
  )
}