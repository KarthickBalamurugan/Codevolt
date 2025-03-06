import styled from 'styled-components';
import RaptheeBg from '../assets/Rapthee_bg.png';
import Curve from './Curve';

const HeroContainer = styled.div`
  width: 100%;
  min-height: calc(120vh - 60px);
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
  padding: 2rem 2rem 2rem; // Increased bottom padding
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1.5rem 2rem; // Increased bottom padding for mobile
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
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; // Changed to flex-start
  padding: 1rem;
  margin-top: 1rem; // Changed from -2rem to positive value
  position: relative; // Added position relative

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    padding: 0.5rem;
    align-items: center;
  }
`;

const ProductImage = styled.img`
  max-width: 85%;
  max-height: 60vh; // Slightly reduced height
  object-fit: contain;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 50vh;
    margin-top: 0; // Removed top margin
  }

  @media (max-width: 480px) {
    max-height: 45vh;
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
        <Curve />
      </ProductSection>
    </HeroContainer>
  );
};

export default Hero;