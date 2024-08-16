import Header from "@/components/Header"

const CheckoutLayout = ({children} :{ children: React.ReactNode}) =>{
  return (
    <div className="
      flex 
      flex-col 
      items-center 
      min-h-screen 
      bg-white
      ">
      <Header />
      <div className="mt-10">
        {children}
      </div>
    </div>
  )
}

export default CheckoutLayout