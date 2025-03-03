import styled from 'styled-components';
import RaptheeBg from '../assets/Rapthee_bg.png';

const HeroContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  background-color: #000;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: calc(100vh - 50px);
  }
`;

const TitleContainer = styled.div`
  position: relative;
  padding: 2rem 2rem 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 0;
  }
`;

const YourText = styled.span`
  color: rgba(255, 255, 255, 0.3);
  font-size: 1rem;
  font-weight: 300;
  font-style: italic;
  letter-spacing: 6px;
  text-transform: uppercase;
  line-height: 1;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    font-size: 0.65rem;
    letter-spacing: 4px;
  }
`;

const RaptrixText = styled.span`
  color: #ffffff;
  font-size: 3.2rem;
  font-weight: 800;
  font-style: italic;
  letter-spacing: 2px;
  line-height: 0.9;
  font-family: 'Inter', sans-serif;
  margin-top: 0.0rem;
  @media (max-width: 768px) {
    font-size: 2.4rem;
    letter-spacing: 1px;
  }
`;

const ProductSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-top: -2rem;

  @media (max-width: 768px) {
    margin-top: 0;
    padding: 0.5rem;
    align-items: flex-start;
  }
`;

const ProductImage = styled.img`
  max-width: 85%;
  max-height: 72vh;
  object-fit: contain;

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 60vh;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    max-height: 55vh;
  }
`;

const Hero = () => {
  return (
    <HeroContainer>
      <TitleContainer>
        <YourText>YOUR</YourText>
        <RaptrixText>Raptrix</RaptrixText>
      </TitleContainer>

      <ProductSection>
        <ProductImage 
          src={RaptheeBg} 
          alt="Rapthee Product"
        />
      </ProductSection>
    </HeroContainer>
  );
};

export default Hero;
