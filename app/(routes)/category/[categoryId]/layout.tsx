import Header from "@/components/Header"

const CategoryLayout = ({children} :{ children: React.ReactNode}) =>{
  return (
    <div className="
      flex 
      flex-col 
      items-center 
      min-h-screen 
      bg-[#EDEDED]
      ">
      <Header />
      {children}
    </div>
  )
}

export default CategoryLayout