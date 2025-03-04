import styled from 'styled-components';
import { BiArrowBack, BiHistory } from 'react-icons/bi';
import { 
  MdSecurity, 
  MdConfirmationNumber,
  MdHeadsetMic,
  MdForum,
  // MdKeyboardArrowRight,
  MdOutlineSchedule 
} from 'react-icons/md';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #000;
  color: white;
  position: relative;
  z-index: 101; // Above navbar
  margin-bottom:8rem;
  @media (max-width: 768px) {
    padding-bottom: 80px; // Space for footer
  }
`;

const TopSection = styled.div`
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1.2rem;
    justify-content: flex-start;
    gap: 1.5rem;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    color: white;
    transform: translateX(-4px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem;
    margin: 0;
  }
`;

const Title = styled.h1`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  text-align: center;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    text-align: left;
    flex: 1;
  }
`;

// const MainContent = styled.div`
//   padding: 3rem;
//   max-width: 1400px;
//   margin: 0 auto;

//   @media (max-width: 768px) {
//     padding: 2rem 0 0;
//   }
// `;

// const MainHeading = styled.h2`
//   font-size: 3rem;
//   font-weight: 800;
//   color: white;
//   margin-bottom: 4rem;
//   padding: 0 2rem;
//   font-family: 'Inter', sans-serif;
//   letter-spacing: -1px;

//   @media (max-width: 768px) {
//     font-size: 2rem;
//     padding: 0 1.5rem;
//     margin-bottom: 2rem;
//   }
// `;

const GridContainer = styled.div`
  background: rgba(255, 255, 255, 0.02);
  border-radius: 24px;
  padding: 3rem;
  margin: 0 3rem 4rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    margin: 0 1rem 3rem;
    padding: 1.5rem;
    border-radius: 16px;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    border-radius: 16px;
    padding: 1.5rem;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.12);
  }
`;

const ServiceIcon = styled.div<{ color: string }>`
  font-size: 3.2rem;
  color: ${props => props.color};
  margin-bottom: 1.5rem;
  
  svg {
    filter: drop-shadow(0 0 20px ${props => props.color}40);
  }

  @media (max-width: 768px) {
    font-size: 2.4rem;
    margin-bottom: 1rem;
  }
`;

const ServiceContent = styled.div`
  flex: 1;
`;

const ServiceTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
`;

const ServiceDescription = styled.p`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ServiceFeatures = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const FeatureText = styled.span`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.3s ease;

  ${ServiceCard}:hover & {
    color: rgba(255, 255, 255, 0.9);
  }
`;

const Arrow = styled.span`
  color: ${props => props.color};
  opacity: 0.5;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  transform: scaleX(0.8);
  display: inline-block;
  margin-left: 4px;

  ${ServiceCard}:hover & {
    opacity: 1;
    transform: translateX(4px) scaleX(0.8);
  }
`;

// const ServiceFeatureHeader = styled.div`
//   position: relative;
//   padding: 2rem 3rem;
//   z-index: 2;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   gap: 0.1rem;
//   margin-bottom: 2rem;
// `;

// const SubtitleText = styled.span`
//   color: rgba(255, 255, 255, 0.3);
//   font-size: 0.7rem;
//   font-weight: 300;
//   font-style: italic;
//   letter-spacing: 6px;
//   text-transform: uppercase;
//   line-height: 1;
//   font-family: 'Inter', sans-serif;
// `;

// const TitleText = styled.span`
//   color: #ffffff;
//   font-size: 2.4rem;
//   font-weight: 800;
//   font-style: italic;
//   letter-spacing: 1px;
//   line-height: 0.9;
//   font-family: 'Inter', sans-serif;
// `;

const ServiceFeatureGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 3rem;
  margin: 3rem auto;
  max-width: 1000px;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    gap: 1rem;
    margin: 2rem auto;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 2rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(8px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.8rem;
  color: #009688;
  opacity: 0.9;
`;

const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ArrowIcon = styled(FiArrowRight)`
  font-size: 1.2rem;
  color: #009688;
  opacity: 0.7;
  transition: all 0.3s ease;

  ${FeatureCard}:hover & {
    opacity: 1;
    transform: translateX(4px);
  }
`;

const HeaderSection = styled.div`
  padding: 3rem 3rem 2rem;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem 1rem;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
`;

const SubText = styled.span`
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.7rem;
  font-weight: 300;
  font-style: italic;
  letter-spacing: 6px;
  text-transform: uppercase;
  line-height: 1;
  font-family: 'Inter', sans-serif;
`;

const MainText = styled.span`
  color: #ffffff;
  font-size: 3.2rem;
  font-weight: 800;
  font-style: italic;
  letter-spacing: 1px;
  line-height: 0.9;
  font-family: 'Inter', sans-serif;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const MainTitle = styled.h2`
  font-size: 3.2rem;
  font-weight: 800;
  color: white;
  margin: 3rem 3rem 2.5rem;
  font-family: 'Inter', sans-serif;
  letter-spacing: -1px;
  text-align: left;
  background: linear-gradient(to right, #fff, rgba(255,255,255,0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2.4rem;
    margin: 2rem 1.5rem;
  }
`;

const services = [
  {
    icon: <MdSecurity />,
    title: "SOS Emergency",
    description: "24/7 emergency roadside assistance when you need it most",
    color: "#f44336", // Red
    feature: "RSA",
    path: "/emergency"
  },
  {
    icon: <MdConfirmationNumber />,
    title: "Raise a Ticket",
    description: "Create and track service requests with ease",
    color: "#ffc107", // Yellow
    feature: "Report",
    path: "/ticket"
  },
  {
    icon: <MdHeadsetMic />,
    title: "Call Support",
    description: "Connect with our support team instantly",
    color: "#4caf50", // Green
    feature: "Contact",
    path: "/call"
  },
  {
    icon: <MdForum />,
    title: "Live Chat Support",
    description: "Get real-time assistance from our experts",
    color: "#2196f3", // Blue
    feature: "Help",
    path: "/chat"
  }
];

const SupportService = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (path: string) => {
    // Add navigation logic here
    console.log(`Navigating to ${path}`);
  };

  return (
    <PageContainer>
      <TopSection>
        <BackButton onClick={() => navigate(-1)}>
          <BiArrowBack />
        </BackButton>
        <Title>Support & Service</Title>
      </TopSection>

      <MainTitle>How can we help you?</MainTitle>

      <GridContainer>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              onClick={() => handleCardClick(service.path)}
            >
              <ServiceIcon color={service.color}>{service.icon}</ServiceIcon>
              <ServiceContent>
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceContent>
              <ServiceFeatures>
                <FeatureText>{service.feature}</FeatureText>
                <Arrow color={service.color}>→</Arrow>
              </ServiceFeatures>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </GridContainer>

      <HeaderSection style={{ marginTop: '4rem' }}>
        <StyledHeader>
          <SubText>SERVICE</SubText>
          <MainText>Features</MainText>
        </StyledHeader>
      </HeaderSection>

      <ServiceFeatureGrid>
        <FeatureCard>
          <FeatureIcon>
            <MdOutlineSchedule />
          </FeatureIcon>
          <FeatureContent>
            <FeatureTitle>Schedule Service</FeatureTitle>
            <FeatureDescription>
              Easily schedule and manage our EV bike maintenance
            </FeatureDescription>
          </FeatureContent>
          <ArrowIcon />
        </FeatureCard>

        <FeatureCard>
          <FeatureIcon>
            <BiHistory />
          </FeatureIcon>
          <FeatureContent>
            <FeatureTitle>Service History</FeatureTitle>
            <FeatureDescription>
              Effortlessly track your EV Bike's maintenance history
            </FeatureDescription>
          </FeatureContent>
          <ArrowIcon />
        </FeatureCard>
      </ServiceFeatureGrid>
    </PageContainer>
  );
};

export default SupportService;
