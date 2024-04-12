import { GetServerSideProps } from "next";
import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import Image from "next/image";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  }

}

export default function Success({ customerName, product}: SuccessProps) {
  return (
    <SuccessContainer>
      <h1>Compra realizada com sucesso!</h1>

      <ImageContainer>
        <Image src={product.imageUrl} alt={product.name} width={120} height={110} />
      </ImageContainer>

      <p>Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho</p>

      <Link href="/">
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      },
    }
  }

  const sessionId = String(query.session_id);


  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  // console.log(session)
  // console.log(session.line_items.data)
  // console.log(session.line_items.data[0].price.product)

  const customerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product 
  // É um pouco confuso mas o console.log mostra que data é um array de objetos, que chamo a partir do index 0, e dentro desse objeto, tem o price e o product.

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      }
    }
  }

}

// Fazer fetch com axios (useEffect), pegar o id da sessão e fazer a requisição para o backend; pelo getServerSideProps ou getStaticProps. ENTRETANTO, não faz sentido ser statico pois o id da sessão é dinâmico. Com o useEffect, a página é renderizada no client-side, ENTRETANTO com o stripe, é necessário que coloque a chave secreta, que ficaria exposta no client-side. Portanto, a melhor opção é o getServerSideProps.