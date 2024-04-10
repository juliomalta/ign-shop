import { useRouter } from "next/router";
import { ImageContainer, ProductContainer, ProductInfo } from "../../styles/pages/product";
// import Image from "next/image";

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer>
{/* <Image></Image> */}
      </ImageContainer>
      <ProductInfo>
        <h1>Camiseta X</h1>
        <span>valor</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, autem similique? Voluptas officia, impedit aspernatur, perferendis repellat aliquam culpa dolore numquam vitae cumque explicabo officiis voluptatem qui beatae in dicta.</p>

        <button>Adicionar ao carrinho</button>
      </ProductInfo>
    </ProductContainer>
  )
}
//   const router = useRouter();
//   const { id } = router.query;

//   return (
//     <ProductContainer>
//       <ImageContainer>
//         <img src="https://via.placeholder.com/300" alt="Product" />
//       </ImageContainer>
//       <ProductInfo>
//         <h1>Product {id}</h1>
//         <p>This is a product</p>
//       </ProductInfo>
//     </ProductContainer>
//   );
// }