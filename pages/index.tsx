import Image from "next/image"
import { HomeContainer, Product } from "../styles/pages/home"

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import camiseta1 from "../assets/tshirt1.png"
import camiseta2 from "../assets/tshirt2.png" 
import camiseta3 from "../assets/tshirt3.png"
import camiseta4 from "../assets/tshirt4.png"

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {/* Adicionei o ref no container para que o keenSlider acesse os products dentro, lembrando de passar na className também */}
      <Product className="keen-slider__slide"> {/* Adicionei a className keen-slider__slide para que o keenSlider saiba que esse é um slide*/}
        <Image src={camiseta1.src} alt="Camiseta 1" height={520} width={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 49,90</span>
          
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta2.src} alt="Camiseta 2" height={520} width={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 49,90</span>
          
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta3.src} alt="Camiseta 3" height={520} width={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 49,90</span>
          
        </footer>
      </Product>

      <Product className="keen-slider__slide">
        <Image src={camiseta4.src} alt="Camiseta 4" height={520} width={480} />
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 49,90</span>
          
        </footer>
      </Product>
    </HomeContainer>
  )
}
