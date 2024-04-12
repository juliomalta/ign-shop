import { GetServerSideProps } from "next";
import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";

export default function Success() {
  return (
    <SuccessContainer>
      <h1>Compra realizada com sucesso!</h1>

      <ImageContainer>

      </ImageContainer>

      <p>Uhuul <strong>Usuário</strong>, sua <strong>Nome_camiseta</strong> já está a caminho</p>

      <Link href="/">
        Voltar ao catálogo
      </Link>
    </SuccessContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  });

  console.log(session)
  console.log(session.line_items.data)

  const customerName = session.customer_details.name;
  // const product = session.line_items.data[0].product as Stripe.Product

  return {
    props: {
      // customerName,
      // product: {
      //   name: product.name,
      //   image: product.images[0],
      // }
    }
  }

}
// Fazer fetch com axios (useEffect), pegar o id da sessão e fazer a requisição para o backend; pelo getServerSideProps ou getStaticProps. ENTRETANTO, não faz sentido ser statico pois o id da sessão é dinâmico. Com o useEffect, a página é renderizada no client-side, ENTRETANTO com o stripe, é necessário que coloque a chave secreta, que ficaria exposta no client-side. Portanto, a melhor opção é o getServerSideProps.