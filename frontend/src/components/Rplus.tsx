import Dev from './Dev'
import { useState } from 'react'
import Innovent from './Innovent'
import { FaCode, FaLightbulb } from 'react-icons/fa'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 5rem;
`

const ToggleContainer = styled.div`
  position: relative;
  padding: 0.375rem;
  background-color: #121212;
  border-radius: 9999px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  width: fit-content;
`

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 10;
`

const ToggleButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  min-width: 130px;
  justify-content: center;
  border-radius: 9999px;
  transition: all 0.3s;
  position: relative;
  color: ${props => props.isActive ? 'black' : 'black'};

  &:hover {
    color: ${props => props.isActive ? 'black' : 'black'};
  }

  svg {
    font-size: 1.25rem;
  }

  span {
    font-weight: 500;
  }
`

const SliderBackground = styled.div<{ isDevMode: boolean }>`
  position: absolute;
  top: 0.375rem;
  bottom: 0.375rem;
  width: 130px;
  left: ${props => props.isDevMode ? '0.375rem' : 'calc(50% - 0.25rem)'};
  border-radius: 9999px;
  background: linear-gradient(to right, #3b82f6, #4f46e5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`

const Rplus = () => {
  const [activeComponent, setActiveComponent] = useState<'dev' | 'innovent'>('dev')

  return (
    <Container>
      <ToggleContainer>
        <ButtonsWrapper>
          <ToggleButton
            isActive={activeComponent === 'dev'}
            onClick={() => setActiveComponent('dev')}
          >
            <FaCode />
            <span>Dev Mode</span>
          </ToggleButton>
          <ToggleButton
            isActive={activeComponent === 'innovent'}
            onClick={() => setActiveComponent('innovent')}
          >
            <FaLightbulb />
            <span>Innovent Mode</span>
          </ToggleButton>
        </ButtonsWrapper>
        <SliderBackground isDevMode={activeComponent === 'dev'} />
      </ToggleContainer>
      {activeComponent === 'dev' ? <Dev /> : <Innovent />}
    </Container>
  )
}

export default Rplus