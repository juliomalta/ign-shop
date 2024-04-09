import { AppProps } from "next/app"
import Image from "next/image";
import { globalStyles } from "../styles/global"

// import logoImg from '../assets/logo.svg'
import logoImg from '../assets/logo1.jpg'
import { Container, Header } from "../styles/pages/app";

globalStyles();
console.log(logoImg)
export default function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <Container>
      <Header>
        <Image src={logoImg.src} alt="logo" height={50} width={50}  />

        
      </Header>

      <Component {...pageProps} />
    </Container>
  )
}
