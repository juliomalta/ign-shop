import { styled } from ".."

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 656,
  margin: '0 auto',

  h1: {
    fontSize: '$2xlarge',
    color: '$gray100',
  },

  p: {
    fontSize: '$xlarge',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.5,
  },
  
  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$large',
    fontWeight: 'bold',
    color: '$green500',
    textDecoration: 'none',

    '&:hover': {
      color: '$green300',
    }
  }
})

export const ImageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 130,
  height: 145,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  marginTop: '4rem',

  img: {
    objectFit: 'cover',
  },
})