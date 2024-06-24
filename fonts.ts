import { Inter, Bevan, Roboto, Roboto_Condensed } from 'next/font/google'
 
export const inter = Inter({
  subsets: ['latin'],
  display:'swap'
})
 
export const bevan = Bevan({
  subsets: ['latin'],
  weight:"400",
  display: 'swap',
})

//used for h1 tags
export const robotoCondensed = Roboto_Condensed({
  subsets:['latin'],
  weight: "700",
  display: 'swap'
})

export const robotoBold = Roboto({
  subsets:['latin'],
  weight: "700",
  display: 'swap'
})

export const roboto = Roboto({
  subsets:['latin'],
  weight: "400",
  display: 'swap'
})