import { styled } from "../styles"

const Button = styled("button", {
  padding: "10px 20px",
  borderRadius: 5,
  border: 0,
  backgroundColor: "blue",
  color: "white",
  "&:hover": {
    backgroundColor: "darkblue",
  },
})

export default function Home() {
  return (
    // <h1>Hello World</h1>
    <Button>Teste</Button>
  )
}
