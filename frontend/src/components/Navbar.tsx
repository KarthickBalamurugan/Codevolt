/* eslint-disable @typescript-eslint/no-unused-vars */
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
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 6px 12px;
  border-radius: 20px;
  background: ${({ status }) => 
    status === 'connected' ? 'rgba(76, 175, 80, 0.1)' : 
    'rgba(244, 67, 54, 0.1)'
  };
  
  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: ${({ status }) => 
      status === 'connected' ? '#4CAF50' : '#F44336'
    };
    box-shadow: 0 0 12px ${({ status }) => 
      status === 'connected' ? '#4CAF5088' : '#F4433688'
    };
    transform: scale(${({ status }) => 
      status === 'connected' ? '1.1' : '1'
    });
  }

  &:hover {
    background: ${({ status }) => 
      status === 'connected' ? 'rgba(76, 175, 80, 0.15)' : 
      'rgba(244, 67, 54, 0.15)'
    };
  }
`;

const StatusText = styled.span`
  opacity: 0.9;
  font-family: 'Inter', sans-serif;
  transition: transform 0.3s ease, opacity 0.3s ease;
  display: inline-block;
  
  &.entering {
    transform: translateY(-10px);
    opacity: 0;
  }
  
  &.entered {
    transform: translateY(0);
    opacity: 1;
  }
`;

const NotificationDrawer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, ${({ isOpen }) => isOpen ? '-50%' : '200%'});
  width: 95vw;
  height: 95vh;
  background-color: #111;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`;

const DrawerHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 2rem;
`;

const BackIcon = styled.button`
  position: absolute;
  left: 0;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px 16px;
  transition: all 0.2s ease;
  border-radius: 8px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
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
  z-index: ${({ isOpen }) => isOpen ? '1000' : '-1'}; // Show only when open
  opacity: ${({ isOpen }) => isOpen ? '1' : '0'};
`;

const ToggleButton = styled.button<{ active: boolean }>`
  padding: 0.8rem 1.5rem;
  border: none;
  background-color: ${({ active }) => active ? '#009688' : 'transparent'};
  color: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.9rem;
  min-width: 140px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: ${({ active }) => active ? '#00796B' : '#333'};
    transition: transform 0.4s ease;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 25px;
  }
  
  &:hover::before {
    transform: translate(-50%, -50%) scale(1);
  }
  
  span {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    min-width: 120px;
    padding: 0.7rem 1rem;
    font-size: 0.85rem;
  }
`;

const ToggleContainer = styled.div<{ activeIndex: number }>`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 4px;
  background: #222;
  border-radius: 28px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: calc(50% - 4px);
    height: calc(100% - 8px);
    background: #009688;
    border-radius: 25px;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: translateX(${({ activeIndex }: { activeIndex: number }) => activeIndex * 100}%);
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 3px;
  }
`;

const MessageItem = styled.div`
  padding: 1.2rem;
  background: #1a1a1a;
  border-radius: 12px;
  margin-bottom: 1rem;
  color: white;
  font-size: 1rem;
  line-height: 1.4;
  letter-spacing: 0.3px;
  
  &:hover {
    background: #222;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.95rem;
    border-radius: 8px;
  }
`;

const MessageTime = styled.div`
  color: #888;
  font-size: 0.85rem;
  margin-top: 0.7rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-top: 0.5rem;
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

const Sidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 100vh;
  background-color: #111;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding-top: 4rem;
  padding-inline: 2rem;
  box-shadow: ${({ isOpen }) => isOpen ? '0 0 40px rgba(0, 0, 0, 0.8)' : 'none'};
  z-index: 1001;
  transform: translateX(${({ isOpen }) => isOpen ? '0' : '-100%'});
  
  @media (max-width: 768px) {
    width: 280px;
  }
`;

const UserSection = styled.div`
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  h2 {
    color: white;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }
  
  p {
    color: #009688;
    font-size: 0.9rem;
    font-weight: 500;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 0.5rem;
  
  a {
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;
    padding: 1rem;
    border-radius: 12px;
    transition: all 0.3s ease;
    opacity: 0.8;
    
    &:hover {
      background-color: rgba(0, 150, 136, 0.15);
      opacity: 1;
      transform: translateX(4px);
    }
    
    span {
      margin-left: 1rem;
      font-weight: 500;
    }
  }
`;

const Navbar = () => {
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connected'>('disconnected');
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  const [hasNotification] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeToggle, setActiveToggle] = useState<'messages' | 'vehicles'>('messages');
  const [statusTextKey, setStatusTextKey] = useState(0); // Add this for text animation
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  useEffect(() => {
    setStatusTextKey(prev => prev + 1); // Trigger text animation on status change
  }, [connectionStatus]);

  useEffect(() => {
    // Prevent body scroll when sidebar is open
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const getStatusText = () => {
    if (connectionStatus === 'connected' && lastSyncTime) {
      return 'Synced just now';
    }
    return 'Disconnected';
  };

  const messages = [
    {
      id: 1,
      text: "Your vehicle registration needs renewal",
      time: "2 hours ago",
      type: "messages"
    },
    {
      id: 2,
      text: "Scheduled maintenance reminder for BMW X5",
      time: "5 hours ago",
      type: "vehicles"
    },
    {
      id: 3,
      text: "New security update available",
      time: "1 day ago",
      type: "messages"
    },
    {
      id: 4,
      text: "Vehicle diagnostic report ready",
      time: "2 days ago",
      type: "vehicles"
    }
  ];

  const menuItems = [
    { icon: "👤", label: "Account", path: "/account" },
    { icon: "📄", label: "Documents", path: "/documents" },
    { icon: "⚡", label: "Charging", path: "/charging" },
    { icon: "🔍", label: "Diagnosis", path: "/diagnosis" },
    { icon: "⚙️", label: "Settings", path: "/settings" },
    { icon: "👥", label: "Community", path: "/community" },
    { icon: "❓", label: "Help & FAQ", path: "/help" },
  ];

  // Combined click handler for outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const hamburger = document.getElementById('hamburger');
      const notificationDrawer = document.getElementById('notification-drawer');
      const notificationIcon = document.getElementById('notification-icon');
      
      // Handle sidebar clicks
      if (isSidebarOpen && 
          sidebar && 
          !sidebar.contains(event.target as Node) && 
          hamburger && 
          !hamburger.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }

      // Handle notification drawer clicks
      if (isDrawerOpen &&
          notificationDrawer &&
          !notificationDrawer.contains(event.target as Node) &&
          notificationIcon &&
          !notificationIcon.contains(event.target as Node)) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen, isDrawerOpen]);

  return (
    <>
      <NavContainer>
        <HamburgerIcon 
          id="hamburger"
          onClick={() => setIsSidebarOpen(true)}
        >
          <span />
          <span />
        </HamburgerIcon>
        
        <ConnectionStatus 
          status={connectionStatus === 'connected' ? 'connected' : 'disconnected'}
          onClick={() => setConnectionStatus(connectionStatus === 'connected' ? 'disconnected' : 'connected')}
          style={{ cursor: 'pointer' }}
        >
          <StatusText
            key={statusTextKey}
            className="entering entered"
          >
            {getStatusText()}
          </StatusText>
        </ConnectionStatus>
        
        <NotificationIcon 
          id="notification-icon"
          hasNotification={hasNotification}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        />
      </NavContainer>

      <Sidebar id="sidebar" isOpen={isSidebarOpen}>
        <UserSection>
          <h2>John Doe</h2>
          <p>Premium Member</p>
        </UserSection>

        <MenuList>
          {menuItems.map((item, index) => (
            <MenuItem key={index}>
              <a 
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  setIsSidebarOpen(false);
                  // Add navigation logic here
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </MenuItem>
          ))}
        </MenuList>
      </Sidebar>

      <Overlay 
        isOpen={isSidebarOpen || isDrawerOpen} 
        onClick={() => {           setIsSidebarOpen(false);
          setIsDrawerOpen(false);
        }} 
      />

      <NotificationDrawer id="notification-drawer" isOpen={isDrawerOpen}>
        <DrawerHeader>
          <BackIcon onClick={() => setIsDrawerOpen(false)}>
            &lt;
          </BackIcon>
          <h1 style={{ 
            color: 'white', 
            fontSize: '1.8rem',
            textAlign: 'center',
            width: '100%'
          }}>
            Notifications
          </h1>
        </DrawerHeader>

        <ToggleContainer activeIndex={activeToggle === 'messages' ? 0 : 1}>
          <ToggleButton 
            active={activeToggle === 'messages'}
            onClick={() => setActiveToggle('messages')}
          >
            <span>Messages</span>
          </ToggleButton>
          <ToggleButton 
            active={activeToggle === 'vehicles'}
            onClick={() => setActiveToggle('vehicles')}
          >
            <span>Vehicle Updates</span>
          </ToggleButton>
        </ToggleContainer>

        <div style={{ width: '100%', flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {messages
            .filter(msg => msg.type === activeToggle)
            .map(message => (
              <MessageItem key={message.id}>
                {message.text}
                <MessageTime>{message.time}</MessageTime>
              </MessageItem>
            ))}
        </div>
      </NotificationDrawer>
    </>
  );
};

export default Navbar;