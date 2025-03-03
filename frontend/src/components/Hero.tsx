import styled from 'styled-components';
import RaptheeBg from '../assets/Rapthee_bg.png';

const HeroContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px); // Account for navbar
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem;
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 4rem;
  z-index: 2;

  @media (max-width: 768px) {
    left: 2rem;
  }
`;

const YourText = styled.span`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2rem;
  font-weight: 200;
  display: block;
  letter-spacing: 6px;
  font-family: 'Inter', sans-serif;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
`;

const RaptrixText = styled.span`
  color: #ffffff;
  font-size: 4.5rem;
  font-weight: 700;
  display: block;
  letter-spacing: 1px;
  font-family: 'Inter', sans-serif;
  line-height: 1;
  text-transform: uppercase;
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const ProductContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
`;

const ProductImage = styled.img`
  max-width: 90%;
  max-height: 70vh;
  object-fit: contain;
  filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.1));
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotateX(10deg) rotateY(-15deg) translateY(20px);
  transform-style: preserve-3d;

  &:hover {
    transform: rotateX(5deg) rotateY(-10deg) translateY(0);
    filter: drop-shadow(0 0 50px rgba(255, 255, 255, 0.15));
  }
`;

const Hero = () => {
  return (
    <HeroContainer>
      <TitleContainer>
        <YourText>YOUR</YourText>
        <RaptrixText>Raptrix</RaptrixText>
      </TitleContainer>

      <ProductContainer>
        <ProductImage 
          src={RaptheeBg} 
          alt="Rapthee Product"
        />
      </ProductContainer>
    </HeroContainer>
  );
};

export default Hero;
