import Image from "next/image"
import { HomeContainer, Product } from "../styles/pages/home"

import camiseta1 from "../assets/tshirt1.png"
import camiseta2 from "../assets/Camiseta.jpg" //tirar o fundo branco
import camiseta3 from "../assets/tshirt2.png"

export default function Home() {
  return (
    // <h1>Hello World</h1>
    <HomeContainer>
      <Product>
        <Image src={camiseta1.src} alt="Camiseta 1" height={520} width={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 49,90</span>
          
        </footer>
      </Product>

      <Product>
        <Image src={camiseta3.src} alt="Camiseta 1" height={520} width={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 49,90</span>
          
        </footer>
      </Product>
    </HomeContainer>
  )
}
