import styled from 'styled-components';

const HeroContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  background-color: #000;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  position: relative;
  padding-left: 2.5rem;
  padding-top: 2.5rem;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.1rem; // Reduced gap between YOUR and Raptrix
`;

const YourText = styled.span`
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.7rem; // Slightly smaller
  font-weight: 300;
  font-style: italic;
  letter-spacing: 6px; // Reduced letter spacing
  text-transform: uppercase;
  margin: 0;
  line-height: 1;
  font-family: 'Inter', sans-serif;
  transform: translateX(2px); // Reduced offset
  transition: all 0.3s ease;
  
  &:hover {
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 7px;
  }
`;

const RaptrixText = styled.span`
  color: #ffffff;
  font-size: 3.2rem; // Increased size
  font-weight: 800;
  font-style: italic;
  letter-spacing: 2px;
  line-height: 0.9;
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
  
  &:hover {
    letter-spacing: 3px;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    font-size: 2.6rem; // Increased mobile size too
  }
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1000px;
  padding: 2rem 0;
`;

const ProductImage = styled.img`
  max-width: 70%;
  max-height: 60vh;
  object-fit: contain;
  filter: drop-shadow(0 0 60px rgba(255, 255, 255, 0.12));
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotateX(12deg) rotateY(-18deg) translateY(20px);
  transform-style: preserve-3d;

  &:hover {
    transform: rotateX(8deg) rotateY(-12deg) translateY(5px);
    filter: drop-shadow(0 0 70px rgba(255, 255, 255, 0.2));
  }
`;

const BottomSection = styled.div`
  width: 100%;
  min-height: 200px;
  // Add your styles for bottom content here
`;

const Hero = () => {
  return (
    <HeroContainer>
      <TitleContainer>
        <YourText>YOUR</YourText>
        <RaptrixText>Raptrix</RaptrixText>
      </TitleContainer>

      <ContentSection>
        <ProductContainer>
          <ProductImage 
            src="Rapthee_white.png" 
            alt="Rapthee Product"
          />
        </ProductContainer>
        
        <BottomSection>
          {/* Add your bottom content here */}
        </BottomSection>
      </ContentSection>
    </HeroContainer>
  );
};

export default Hero;
