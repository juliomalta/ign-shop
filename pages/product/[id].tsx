import { ImageContainer, ProductContainer, ProductInfo } from "../../styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "../../lib/stripe";
import Stripe from "stripe";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)

  async function handleBuyProduct() {
    try {
      setIsCheckoutLoading(true);
      // se eu tivesse a rota externa, tem que ser feito o uso de window.location.href, se for para uma rota interna, usar o router.push, criando uma const router = useRouter() e router.push('/rota').
      // o axios tem a função de fazer requisições para o backend, e o axios.post('/rota', {dados}) é a forma de fazer uma requisição POST para o backend, passando os dados que o backend precisa.
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCheckoutLoading(false);

      alert('Erro ao redirecionar ao checkout')
    }
  }
  const { isFallback } = useRouter()

  if (isFallback) {
    return <h1>Carregando...</h1>
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} alt="Product" width={520} height={520} />
      </ImageContainer>
      <ProductInfo>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button disabled={isCheckoutLoading} onClick={handleBuyProduct}>Adicionar ao carrinho</button>
      </ProductInfo>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Idealmente, colocaria produtos mais vendidos ou mais acessados, para gerar no deploy, aumentando o desempenho. Porém com o Stripe não é possível.

  return {
    paths: [
      { params: { id: 'prod_PicAnoaFKTFMUF'}}
    ],
    fallback: true, // Se a página não foi gerada estática, gera no momento da requisição
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price

    return {
      props: {
        product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: price.currency,
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 4, // 4 hours
  }
}
// Quando a página está sendo gerada estática e com parâmetros dinâmicos, teria que passar os paths (ids) dentro de params em getStaticPaths, para acessar as páginas. Como não estamos usando getStaticPaths, o Next.js não sabe quais páginas gerar estáticas, então ele não gera nenhuma. Por isso, a página não é gerada estática, mas sim no momento da requisição. Para resolver isso, basta adicionar getStaticPaths, que é um método que diz ao Next.js quais páginas ele deve gerar estáticas.

// Como seria o comportamento: o Next no deploy, gera 10 páginas mais acessadas por exemplo, mas teria que esperar todas as páginas serem geradas para acessar a página com o id 11. Além de não conseguir adicionar novos produtos, apenas no próximo deploy.

// Aí entra o fallback: true, que diz ao Next.js para gerar a página no momento da requisição, caso ela não tenha sido gerada estática. Isso é útil para páginas que não são acessadas com tanta frequência, pois não é necessário gerar todas as páginas estáticas de uma vez.

// ENTRETANTO, com o fallback true, as informações estáticas serão geradas assincronamente, e a página será renderizada sem elas, e depois atualizada com as informações, sendo preciso então um estado de loading (skeleton scren).
// Para resolver isso, basta adicionar um fallback: 'blocking', que faz com que a página só seja renderizada quando todas as informações estiverem prontas. Porém, isso pode aumentar o tempo de carregamento da página, pois ela só será renderizada quando todas as informações estiverem prontas, piorando a experiência do usuário.

// Pra detectar que a página está carregando, tem que utilizar o useRouter do next/router, e verificar se o isFallback é true. Se for, renderizar um loading, ou um skeleton screen.