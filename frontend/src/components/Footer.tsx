import styled from 'styled-components';
// import { motion } from 'framer-motion';
import { RiHome5Line } from 'react-icons/ri';
import { TbChartHistogram } from 'react-icons/tb';
import { BiSupport } from 'react-icons/bi';
import { useState } from 'react';

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
`;

const RplusIcon = styled.div`
  position: relative;
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1;

  span {
    font-size: 0.9rem;
    color: #009688;
  }
`;

const NavItem = styled.div<{ active: boolean }>`
  position: relative;
  padding: 1rem;
  color: ${props => props.active ? '#009688' : 'rgba(255, 255, 255, 0.5)'};
  transition: all 0.3s ease;
  cursor: pointer;

  svg, ${RplusIcon} {
    font-size: 1.6rem;
  }
`;

const Footer = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <FooterContainer>
      <NavList>
        {['home', 'rplus', 'stats', 'support'].map((tab) => (
          <NavItem
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'home' && <RiHome5Line />}
            {tab === 'rplus' && (
              <RplusIcon>
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
