import { styled } from "..";

// evitar espaçamento dentro do container ou do product, pra não ter conflito com o keen-slider, ele tem um espaçamento próprio
// o keen-slider não aceita margin, padding e etc, então o espaçamento tem que ser feito no keen-slider

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656, // pode dar problema
});

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)', // as camisetas têm que ter fundo transparente para aparecer o gradiente
  borderRadius: 8,
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden', // fazer com que a barra de preço fique dentro do product

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  img: {
    objectFit: 'cover', // ajustar a imagem ao tamanho do product, tem outras opções como 'contain' e 'fill'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    transform: 'translateY(110%)',
    transition: 'all 0.2s ease-in-out',
    opacity: 0,

    strong: {
      fontSize: '$large',
      color: '$gray100'
    },

    span: {
      fontSize: '$xlarge',
      fontWeight: 'bold',
      color: '$green300',
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0)',
      opacity: 1,
    }
  }
});