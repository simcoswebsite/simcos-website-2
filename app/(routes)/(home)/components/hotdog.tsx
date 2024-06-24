import Image from "next/image"

export const HotDog = () => {
  return(
    <div className="
      bg-white
      basis-1/2
      rounded-l-2xl
      flex
      items-center
      justify-center
      relative
      min-h-full
      min-w-full
    ">
      <Image
        src="/hot-dog-with-fries.jpg"
        fill
        alt="Picture of a hot dog with a side of fries" 
        style={{
          objectFit: "cover",
          borderTopLeftRadius: "2rem",
          borderBottomLeftRadius: "2rem",
          paddingLeft:"1rem",
          paddingTop:"1rem",
          paddingBottom:"1rem"
        }}
      />
    </div>
  )
}