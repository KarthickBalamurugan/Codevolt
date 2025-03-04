import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BarChart2, Headphones, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { LineChart, LifeBuoy } from "lucide-react";

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(8px);
  padding: 0.8rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  z-index: 100;
`;

const NavList = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  padding: 0.8rem 0;
  gap: 1rem;
`;

const Spotlight = styled(motion.div)`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(0, 150, 136, 0.15) 0%,
    rgba(0, 150, 136, 0.05) 50%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
`;

const RplusIcon = styled.div<{ active: boolean }>`
  position: relative;
  font-family: 'Inter', sans-serif;
  font-size: 1.3rem;
  font-weight: 800;
  color: ${props => props.active ? '#00e5ff' : 'rgba(255, 255, 255, 0.5)'};
  display: flex;
  align-items: center;
  filter: ${props => props.active ? 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.4))' : 'none'};

  &::after {
    content: '+';
    position: absolute;
    top: -6px;
    right: -8px;
    font-size: 0.9rem;
    color: currentColor;
  }
`;

const NavItem = styled(motion.div)<{ active: boolean }>`
  position: relative;
  padding: 1rem;
  color: ${props => props.active ? '#009688' : 'rgba(255, 255, 255, 0.5)'};
  transition: color 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  z-index: 1;

  svg {
    font-size: 1.6rem;
    stroke-width: ${props => props.active ? 2.5 : 1.8};
    color: ${props => props.active ? '#00e5ff' : 'rgba(255, 255, 255, 0.5)'};
    filter: ${props => props.active ? 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.4))' : 'none'};
  }
`;

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    // Set initial active tab based on current route
    if (location.pathname === '/support') return 'support';
    if (location.pathname === '/stats') return 'stats';
    if (location.pathname === '/rplus') return 'rplus';
    return 'home';
  });

  const handleNavigation = (tab: string) => {
    setActiveTab(tab);
    switch(tab) {
      case 'home':
        navigate('/');
        break;
      case 'support':
        navigate('/support');
        break;
      case 'stats':
        navigate('/stats'); // This will now navigate to Analytics page
        break;
      case 'rplus':
        navigate('/rplus');
        break;
    }
  };

  const spotlightVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  const getSpotlightPosition = (index: number) => index * 100;

  return (
    <FooterContainer>
      <NavList>
        <AnimatePresence mode="wait">
          <Spotlight
            key={activeTab}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={spotlightVariants}
            style={{
              x: getSpotlightPosition(
                activeTab === 'home' ? 0 :
                activeTab === 'rplus' ? 1 :
                activeTab === 'stats' ? 2 : 3
              ) + 20
            }}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 }
            }}
          />
        </AnimatePresence>

        <NavItem
          active={activeTab === 'home'}
          onClick={() => handleNavigation('home')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home size={26} />
        </NavItem>

        <NavItem
          active={activeTab === 'rplus'}
          onClick={() => handleNavigation('rplus')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <RplusIcon active={activeTab === 'rplus'}>R</RplusIcon>
        </NavItem>

        <NavItem
          active={activeTab === 'stats'}
          onClick={() => handleNavigation('stats')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <LineChart size={24} />
        </NavItem>

        <NavItem
          active={activeTab === 'support'}
          onClick={() => handleNavigation('support')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <LifeBuoy size={26} />
        </NavItem>
      </NavList>
    </FooterContainer>
  );
};

export default Footer;
