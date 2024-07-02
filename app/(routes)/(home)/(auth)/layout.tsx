import Header from "@/components/Header"

const AuthLayout = ({children} :{ children: React.ReactNode}) =>{
  return (
    <div className="
      flex 
      flex-col 
      items-center 
      h-full 
      bg-[#EDEDED]
      ">
      <Header />
      {children}
    </div>
  )
}

export default AuthLayout