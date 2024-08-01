import Image from "next/image"

export const HotDog = () => {
  return(
    <div className="
      bg-white
      basis-1/2
      rounded-2xl
      flex
      items-center
      justify-center
      relative
      h-96
      min-h-full
      min-w-full
      max-h-full
      max-w-full
      border-2
      border-s
    ">
      <Image
        src="/hot-dog-with-fries.jpg"
        fill
        alt="Picture of a hot dog with a side of fries" 
        style={{
          objectFit: "cover",
          borderRadius: "2rem",
          padding: "1rem"
        }}
      />
    </div>
  )
}