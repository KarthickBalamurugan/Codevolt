import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { RiHome5Line } from 'react-icons/ri';
import { TbChartHistogram } from 'react-icons/tb';
import { BiSupport } from 'react-icons/bi';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  padding: 0.5rem 0;
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
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1;
  color: ${props => props.active ? '#009688' : 'rgba(255, 255,   255, 0.5)'};

  span {
    position: absolute;
    top: -4px;
    right: -8px;
    font-size: 0.9rem;
    color: #009688;
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

  svg, ${RplusIcon} {
    font-size: 1.6rem;
    transition: transform 0.3s ease;
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

        {['home', 'rplus', 'stats', 'support'].map((tab) => (
          <NavItem
            key={tab}
            active={activeTab === tab}
            onClick={() => handleNavigation(tab)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab === 'home' && <RiHome5Line />}
            {tab === 'rplus' && (
              <RplusIcon active={activeTab === tab}>
                R<span>+</span>
              </RplusIcon>
            )}
            {tab === 'stats' && <TbChartHistogram />}
            {tab === 'support' && <BiSupport />}
          </NavItem>
        ))}
      </NavList>
    </FooterContainer>
  );
};

export default Footer;
