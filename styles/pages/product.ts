import { styled } from "..";

export const ProductContainer = styled('main', {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  alignItems: "stretch",
  gap: "4rem",
  maxWidth: "1180px",
  margin: "0 auto",
})

export const ImageContainer = styled('div', {
  display: 'flex',
  height: 656,
  width: "100%",
  maxWidth: 576,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  }
})


export const ProductInfo = styled('div', {
  display: 'flex', 
  flexDirection: 'column',

  h1: {
    fontSize: '$2xlarge',
    color: '$gray300',    
  },

  span: {
    display: 'block',
    marginTop: '1rem',
    fontSize: '$2xlarge',
    color: '$green300',
  },

  p: {
    marginTop: '2rem',
    fontSize: '$medium',
    lineHeight: 1.6,
    color: '$gray300',
  },

  button: {
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '$medium',

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    }
  }
})