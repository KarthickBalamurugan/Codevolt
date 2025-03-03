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
  justify-content: center;
  gap: 1rem; // Reduced gap between icons
  padding: 0.8rem 3rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0.5rem 1.5rem;
    gap: 0.8rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
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
  border-radius: 50%;

  svg {
    font-size: 1.8rem;
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
  gap: 0.2rem;
`;

const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
`;

const StatUnit = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
`;

const StatLabel = styled.span`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 500;
  max-width: 60px;
  text-align: center;
  white-space: nowrap;
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
          <IconWrapper>
            <IconButton
              active={activeView === 'performance'}
              onClick={() => setActiveView('performance')}
            >
              <TbChartDonut />
            </IconButton>
            <StatsContainer>
              <StatValue>
                234<StatUnit>km</StatUnit>
              </StatValue>
              <StatLabel>Total Distance</StatLabel>
            </StatsContainer>
          </IconWrapper>

          <IconWrapper>
            <IconButton
              active={activeView === 'energy'}
              onClick={() => setActiveView('energy')}
            >
              <BsLightningCharge />
            </IconButton>
            <StatsContainer>
              <StatValue>
                89<StatUnit>%</StatUnit>
              </StatValue>
              <StatLabel>Battery Level</StatLabel>
            </StatsContainer>
          </IconWrapper>
        </IconButtonsContainer>

        {/* Analytics content will go here */}
      </MainContent>
    </PageContainer>
  );
};

export default Analytics;