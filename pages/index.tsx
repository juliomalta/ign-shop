import Image from "next/image"
import Link from "next/link"
import { HomeContainer, Product } from "../styles/pages/home"

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { stripe } from "../lib/stripe"
import { GetStaticProps } from "next"

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
          <Link href={`/product/${product.id}`} key={product.id} prefetch={false} >
            <Product className="keen-slider__slide"> {/* Adicionei a className keen-slider__slide para que o keenSlider saiba que esse é um slide*/}
              <Image src={product.imageUrl} alt="Camiseta 1" height={520} width={480} />
              <footer>
                <strong>{product.name}</strong>
                <span>{product.price}</span>
                
              </footer>
            </Product>
          </Link>
        )
      })}

    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'] // Para receber o preço do produto e usá-lo no return de products
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price // Forçando o tipo de price para Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      // O preço vem em centavos, então é necessário dividir por 100 para obter o valor em reais
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 24 // 24 horas
  }
} 
// SSR (Server Side Rendering)
// Para renderizar o conteúdo no server side (no servidor do Next), independendo do JS estar habilitado ou não. 
// Somente incluir informações que necessariamente precisam estar renderizada instantaneamente, junto da página, para indexadores, bots ou crowlers terem acesso a essas informações.
// Exemplos de uso: códigos de autenticação, informações sensíveis, APIS que não podem ser vistas etc.

// SSG (Static Site Generation)
// A página é gerada no momento da build, e não no momento da requisição. Por isso não recebe cookies de informação, e não é possível acessar informações (req e res) do usuário.
// O conteúdo é (e tem que ser) estático, e não muda a cada requisição.
// Uma vez gerada, é reutilizada em todas as solicitações subsequentes.
// Podemos usar o revalidate para atualizar a página a cada X segundos, minutos, horas, dias etc.
// Exemplos de uso: páginas de blog, páginas de produtos, páginas de documentação etc.

// Prefetch no next (vem como true), faz com que carregue (neste caso os links) antes do usuário clicar, para que a página carregue mais rápido, porém, faz isso assim que o produto estiver sendo exibido na tela, e não no hover, por exemplo. Para isso, é necessário usar o next/link e passar o prefetch={false} para que não faça o prefetch.
// O prefetch é útil para páginas que são acessadas com frequência, pois o usuário não precisa esperar o carregamento da página, pois ela já foi carregada antes.
// Surge o problema quando em uma página há vários links, como em um e-commerce.