import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { BsLightningCharge } from 'react-icons/bs';
import { TbChartDonut } from 'react-icons/tb';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #000;
  color: white;
  position: relative;
  z-index: 101;
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
  }
`;

const BackButton = styled.button`
  position: absolute;
  left: 2rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    left: 1rem;
    padding: 0.4rem;
  }

  &:hover {
    color: white;
    transform: translateX(-4px);
  }
`;

const Title = styled.h1`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  text-align: center;
  margin: 0;
  flex: 1;
  padding: 0 3rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0 2rem;
  }
`;

const MainContent = styled.div`
  padding: 0 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 0 1rem 1rem;
  }
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem 0.5rem; // Reduced bottom padding
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem 0.5rem;
  }
`;

const IntervalSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

const IntervalText = styled.span`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.3rem;
  color: white;
  letter-spacing: 0.5px;
`;

const DropdownIcon = styled(MdKeyboardArrowDown)`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.4rem;
  transition: transform 0.2s ease;

  ${IntervalSelector}:hover & {
    transform: translateY(2px);
  }
`;

const MonthSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  font-family: 'Inter', sans-serif;
  padding: 0.5rem 0; // Removed horizontal padding
`;

const MonthButton = styled.button`
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  font-size: 1.2rem;

  &:hover {
    color: white;
    transform: scale(1.1);
  }
`;

const MonthText = styled.span`
  font-weight: 500;
  font-size: 1.1rem;
  min-width: 80px;
  text-align: center;
`;

const DayScroller = styled.div`
  overflow-x: auto;
  padding: 0.5rem 0; // Reduced padding
  margin-top: 0; // Removed margin
  position: relative;
  margin-bottom: -0.5rem; // Reduce space between scrollbar and icons
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  &::after {
    content: '';
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: 4rem;
    pointer-events: none;
    z-index: 2;
    background: linear-gradient(to left, #000, transparent);
  }
`;

const DaysContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  padding: 0 3rem; // Aligned with FilterSection
  padding-right: 3rem;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0 1.5rem;
    padding-right: 2rem;
  }
`;

const DayItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.8rem 0.4rem;
  min-width: 45px;
  position: relative;

  ${props => props.isActive && `
    transform: translateY(-2px) scale(1.05);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #009688;
    }
  `}

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    min-width: 40px;
    padding: 0.6rem 0.3rem;
  }
`;

const DayText = styled.span<{ isActive?: boolean }>`
  font-size: 0.85rem;
  font-weight: ${props => props.isActive ? '700' : '600'};
  color: ${props => props.isActive ? '#009688' : 'rgba(255, 255, 255, 0.5)'};
  letter-spacing: 1px;
  transition: all 0.3s ease;
`;

const DateText = styled.span<{ isActive?: boolean }>`
  font-size: ${props => props.isActive ? '1.4rem' : '1.2rem'};
  font-weight: ${props => props.isActive ? '800' : '600'};
  color: ${props => props.isActive ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  transition: all 0.3s ease;
`;

const IconButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 3rem;
  width: 100%;
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  width: 100%;
`;

const IconButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0.6rem;
  color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;

  svg {
    font-size: 2.2rem;
  }

  &:hover {
    color: ${props => props.active ? '#fff' : 'rgba(255, 255, 255, 0.8)'};
    transform: translateY(-2px);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 3.2rem;
  font-weight: 800;
  color: white;
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
  margin-bottom: 0.2rem;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const StatUnit = styled.span`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
`;

const StatLabel = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
`;

const RidesSection = styled.div`
  margin-top: 2rem;
  padding: 0 2rem;
  width: 100%;
`;

const RidesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const RidesTitle = styled.h3`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  font-weight: 500;
`;

const RidesCount = styled.span`
  color: white;
  font-weight: 600;
`;

const RidesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RideCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
  width: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(4px);
  }
`;

const RideInfo = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: center;
  width: 100%;
`;

const RideTime = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  font-weight: 600;
  min-width: 60px;
`;

const RouteVisual = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  position: relative;
  background: transparent;
  border: 3px solid transparent;
  background-image: conic-gradient(
    #4CAF50 0%,
    #4CAF50 40%,
    #2196F3 40%,
    #2196F3 70%,
    #F44336 70%,
    #F44336 100%
  );
  
  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    right: 3px;
    bottom: 3px;
    background: #000;
    border-radius: 50%;
  }
`;

const RideDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
`;

const RideName = styled.span`
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
`;

const RideDistance = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.9rem;
`;

const ExploreSection = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  margin-left: auto;
`;

const ExploreIcon = styled.span`
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.4rem;
  transition: transform 0.3s ease;

  ${RideCard}:hover & {
    transform: translateX(4px);
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Analytics = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState('March');
  const [activeDay, setActiveDay] = useState(new Date().getDate());
  const [activeView, setActiveView] = useState<'performance' | 'energy'>('performance');

  const getDayAbbreviation = (date: Date) => {
    return date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase().slice(0, 2);
  };

  const generateDays = () => {
    const today = new Date();
    const days = [];
    for (let i = -15; i <= 15; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      days.push({
        day: getDayAbbreviation(date),
        date: date.getDate(),
        isToday: i === 0
      });
    }
    return days;
  };

  return (
    <PageContainer>
      <TopSection>
        <BackButton onClick={() => navigate(-1)}>
          <BiArrowBack />
        </BackButton>
        <Title>Analytics</Title>
      </TopSection>

      <FilterSection>
        <IntervalSelector>
          <IntervalText>Daily</IntervalText>
          <DropdownIcon />
        </IntervalSelector>

        <MonthSelector>
          <MonthButton>
            <MdChevronLeft />
          </MonthButton>
          <MonthText>{currentMonth}</MonthText>
          <MonthButton>
            <MdChevronRight />
          </MonthButton>
        </MonthSelector>
      </FilterSection>

      <MainContent>
        <DayScroller>
          <DaysContainer>
            {generateDays().map((item, index) => (
              <DayItem 
                key={index}
                isActive={item.date === activeDay}
                onClick={() => setActiveDay(item.date)}
              >
                <DayText isActive={item.date === activeDay}>
                  {item.day}
                </DayText>
                <DateText isActive={item.date === activeDay}>
                  {item.date}
                </DateText>
              </DayItem>
            ))}
          </DaysContainer>
        </DayScroller>
        
        <IconButtonsContainer>
          <IconsWrapper>
            <IconButton
              active={activeView === 'performance'}
              onClick={() => setActiveView('performance')}
            >
              <TbChartDonut />
            </IconButton>
            <IconButton
              active={activeView === 'energy'}
              onClick={() => setActiveView('energy')}
            >
              <BsLightningCharge />
            </IconButton>
          </IconsWrapper>
          
          <StatsContainer>
            <StatValue>
              234<StatUnit>km</StatUnit>
            </StatValue>
            <StatLabel>Total Distance</StatLabel>
          </StatsContainer>
        </IconButtonsContainer>

        <RidesSection>
          <RidesHeader>
            <RidesTitle>Rides</RidesTitle>
            <RidesCount>2 rides</RidesCount>
          </RidesHeader>

          <RidesList>
            {[
              {
                time: "14:30",
                name: "Morning Commute",
                distance: "12.5 km",
                duration: "45 min"
              },
              {
                time: "18:45",
                name: "Evening Return",
                distance: "13.2 km",
                duration: "50 min"
              }
            ].map((ride, index) => (
              <RideCard key={index}>
                <RideInfo>
                  <RideTime>{ride.time}</RideTime>
                  <RideDetails>
                    <RideName>{ride.name}</RideName>
                    <RideDistance>{ride.distance} • {ride.duration}</RideDistance>
                  </RideDetails>
                  <RouteVisual />
                  <ExploreSection>
                    <ExploreIcon>→</ExploreIcon>
                  </ExploreSection>
                </RideInfo>
              </RideCard>
            ))}
          </RidesList>
        </RidesSection>
      </MainContent>
    </PageContainer>
  );
};

export default Analytics;