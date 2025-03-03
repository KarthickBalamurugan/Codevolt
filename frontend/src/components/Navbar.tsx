import { useState } from 'react';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #000;
  height: 60px;
`;

const HamburgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  
  span:first-child {
    width: 24px;
    height: 2px;
    background-color: white;
  }
  
  span:last-child {
    width: 16px;
    height: 2px;
    background-color: white;
  }
`;

const ConnectionStatus = styled.div<{ status: 'disconnected' | 'connected' | 'syncing' }>`
  color: white;
  font-size: 0.9rem;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
    background-color: ${({ status }) => 
      status === 'connected' ? '#4CAF50' :
      status === 'syncing' ? '#FFC107' : '#F44336'
    };
  }
`;

const NotificationIcon = styled.div<{ hasNotification: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  
  &::after {
    content: '';
    display: ${({ hasNotification }) => hasNotification ? 'block' : 'none'};
    position: absolute;
    top: -2px;
    right: -2px;
    width: 8px;
    height: 8px;
    background-color: #F44336;
    border-radius: 50%;
  }
`;

const Navbar = () => {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connected' | 'syncing'>('disconnected');
  const [hasNotification, setHasNotification] = useState(false);

  return (
    <NavContainer>
      <HamburgerIcon>
        <span />
        <span />
      </HamburgerIcon>
      
      <ConnectionStatus status={connectionStatus}>
        {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
      </ConnectionStatus>
      
      <NotificationIcon hasNotification={hasNotification} />
    </NavContainer>
  );
};

export default Navbar;
