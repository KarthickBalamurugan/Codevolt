import { useState, useEffect } from 'react';
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
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transition: background-color 0.3s ease;
    background-color: ${({ status }) => 
      status === 'connected' ? '#4CAF50' :
      status === 'syncing' ? '#FFC107' : '#F44336'
    };
    box-shadow: 0 0 8px ${({ status }) => 
      status === 'connected' ? '#4CAF5066' :
      status === 'syncing' ? '#FFC10766' : '#F4433666'
    };
  }
`;

const StatusText = styled.span`
  opacity: 0.9;
  font-family: 'Inter', sans-serif;
  
  small {
    opacity: 0.7;
    font-size: 0.8rem;
    margin-left: 4px;
  }
`;

const NotificationDrawer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, ${({ isOpen }) => isOpen ? '-50%' : '150%'});
  width: 90%;
  max-width: 500px;
  height: 80vh;
  background-color: #111;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, ${({ isOpen }) => isOpen ? '0.5' : '0'});
  transition: background-color 0.3s ease;
  pointer-events: ${({ isOpen }) => isOpen ? 'all' : 'none'};
  z-index: 999;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 0.8rem 1.5rem;
  border: none;
  background-color: ${({ active }) => active ? '#2196F3' : '#333'};
  color: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background-color: ${({ active }) => active ? '#1976D2' : '#444'};
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
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
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connected'>('disconnected');
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [hasNotification, setHasNotification] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeToggle, setActiveToggle] = useState<'messages' | 'vehicles'>('messages');

  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionStatus(prev => {
        if (prev === 'disconnected') {
          setLastSyncTime(new Date());
          return 'connected';
        }
        setLastSyncTime(null);
        return 'disconnected';
      });
    }, 3000); // Toggle every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusText = () => {
    if (connectionStatus === 'connected' && lastSyncTime) {
      return 'Synced just now';
    }
    return 'Disconnected';
  };

  return (
    <>
      <NavContainer>
        <HamburgerIcon>
          <span />
          <span />
        </HamburgerIcon>
        
        <ConnectionStatus 
          status={connectionStatus === 'connected' ? 'connected' : 'disconnected'}
          onClick={() => setConnectionStatus(connectionStatus === 'connected' ? 'disconnected' : 'connected')}
          style={{ cursor: 'pointer' }}
        >
          <StatusText>
            {getStatusText()}
          </StatusText>
        </ConnectionStatus>
        
        <NotificationIcon 
          hasNotification={hasNotification}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        />
      </NavContainer>

      <Overlay isOpen={isDrawerOpen} onClick={() => setIsDrawerOpen(false)} />
      
      <NotificationDrawer isOpen={isDrawerOpen}>
        <h1 style={{ 
          color: 'white', 
          marginBottom: '2rem',
          fontSize: '1.8rem',
          textAlign: 'center' 
        }}>
          Notifications
        </h1>

        <ToggleContainer>
          <ToggleButton 
            active={activeToggle === 'messages'}
            onClick={() => setActiveToggle('messages')}
          >
            Messages
          </ToggleButton>
          <ToggleButton 
            active={activeToggle === 'vehicles'}
            onClick={() => setActiveToggle('vehicles')}
          >
            Vehicle Updates
          </ToggleButton>
        </ToggleContainer>

        <div style={{ width: '100%', flex: 1, overflowY: 'auto' }}>
          {activeToggle === 'messages' ? (
            <div style={{ color: '#888' }}>No new messages</div>
          ) : (
            <div style={{ color: '#888' }}>No vehicle updates</div>
          )}
        </div>
      </NotificationDrawer>
    </>
  );
};

export default Navbar;
