import Header from "@/components/Header"

const MenuLayout = ({children} :{ children: React.ReactNode}) =>{
  return (
    <div className="
      flex 
      flex-col 
      items-center 
      min-h-screen 
      bg-white
      ">
      <Header />
      {children}
    </div>
  )
}

export default MenuLayout