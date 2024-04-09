import Image from "next/image"
import { HomeContainer, Product } from "../styles/pages/home"

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe"
import { GetServerSideProps } from "next"

import camiseta1 from "../assets/tshirt1.png"
import camiseta2 from "../assets/tshirt2.png" 
import camiseta3 from "../assets/tshirt3.png"
import camiseta4 from "../assets/tshirt4.png"
import Stripe from "stripe"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })


  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {/* Adicionei o ref no container para que o keenSlider acesse os products dentro, lembrando de passar na className também */}
      {products.map(product => {
        return (
          <Product key={product.id} className="keen-slider__slide"> {/* Adicionei a className keen-slider__slide para que o keenSlider saiba que esse é um slide*/}
            <Image src={product.imageUrl} alt="Camiseta 1" height={520} width={480} />
            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
              
            </footer>
          </Product>

        )
      })}

    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'] // Para receber o preço do produto e usá-lo no return de products
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price // Forçando o tipo de price para Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100, // O preço vem em centavos, então é necessário dividir por 100 para obter o valor em reais
    }
  })

  console.log(response.data)


  console.log('Tudo que estiver aqui, não será exibido no servidor cliente, apenas no servidor do Next')

  return {
    props: {
      products
    }
  }
} // Para renderizar o conteúdo no server side (no servidor do Next), independendo do JS estar habilitado ou não. 
// Somente incluir informações que necessariamente precisam estar renderizada instantaneamente, junto da página, para indexadores, bots ou crowlers terem acesso a essas informações.
// Exemplos de uso: códigos de autenticação, informações sensíveis, etc.