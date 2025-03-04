import React, { useState } from 'react'
import styled from 'styled-components'
import { FaBolt, FaTemperatureLow, FaCar, FaBatteryThreeQuarters } from 'react-icons/fa'

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
`

const FormCard = styled.div`
  background: #121212;
  border-radius: 1.5rem;
  padding: 2rem 1.5rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  color: #f3f4f6;
  text-align: center;
  line-height: 1.2;
  margin-bottom: 2rem;

  span {
    display: block;
    font-size: 1.1rem;
    font-weight: 500;
    color: #9ca3af;
    margin-top: 0.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    
    span {
      font-size: 1rem;
    }
  }
`

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`

const StyledInput = styled.input`
  width: 100%;
  padding: 1.25rem 1.5rem;
  border: 2px solid #202020;
  border-radius: 1rem;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s;
  background: #202020;
  color: #f3f4f6;

  &:focus {
    outline: none;
    border-color: #8884d8;
    background: #202020;
    box-shadow: 0 0 0 4px rgba(136, 132, 216, 0.15);
  }

  &::placeholder {
    color: #6b7280;
    font-weight: 400;
  }
`

const ErrorMessage = styled.p`
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`

const SubmitButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 1rem;
  margin-top: 1.5rem;
  background: linear-gradient(to right, #8884d8, #6d63d0);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(136, 132, 216, 0.25);
  }
`

const ResponseCard = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: #202020;
  border-radius: 1rem;
  width: 100%;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`

const MainMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const MetricCard = styled.div<{ background?: string }>`
  padding: 1.5rem;
  background: ${props => props.background || '#111827'};
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`

const MetricTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #9ca3af;
  font-size: 0.9rem;
  
  svg {
    font-size: 1.2rem;
  }
`

const MetricValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #e5e7eb;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const DetailedData = styled.div`
  background: #121212;
  border-radius: 0.75rem;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const DataSection = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #9ca3af;
  margin-bottom: 1rem;
`

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const DataItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: #202020;
  border-radius: 0.5rem;
  
  span:first-child {
    color: #9ca3af;
  }
  
  span:last-child {
    font-weight: 600;
    color: #f3f4f6;
  }
`

// TypeScript Interfaces for the API response
interface BatteryData {
  SOC: number;
  SOH: number;
  HV_Bat_Current_2: number;
  kWh_Remaining: number;
  Speed: number;
  Torque: number;
  Motor_Temp: number;
  Instant_kW: number;
  ECO: boolean;
  ePedal: boolean;
}

interface ResponseData {
  predicted_voltage: number;
  ambient_temperature: number;
  used_data: BatteryData;
}

const Innovent: React.FC = () => {
  const [location, setLocation] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<ResponseData | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!location.trim()) {
      setError('Please enter a location')
      return
    }

    setError('')
    setLoading(true)
    setResponse(null)

    try {
      const res = await fetch('http://127.0.0.1:5000/predict_voltage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        body: JSON.stringify({ location }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Server error')
      }

      const data: ResponseData = await res.json()
      setResponse(data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        setError('Unable to connect to the server. Please check if the server is running.')
      } else {
        setError(err.message || 'Something went wrong')
      }
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <FormCard>
        <Title>
          Go Where Your Heart Takes You
          <span>Enter a location to predict voltage</span>
        </Title>
        <form onSubmit={handleSubmit}>
          <InputWrapper>
            <StyledInput 
              type="text" 
              placeholder="Enter location (e.g., London, Paris, Tokyo)..." 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={loading}
            />
          </InputWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Predicting...' : 'Predict Voltage'}
          </SubmitButton>
        </form>

        {response && (
          <ResponseCard>
            <MainMetrics>
              <MetricCard background="linear-gradient(135deg, rgba(136, 132, 216, 0.15), rgba(136, 132, 216, 0.05))">
                <MetricTitle>
                  <FaBolt />
                  <span>Predicted Voltage</span>
                </MetricTitle>
                <MetricValue>{response.predicted_voltage.toFixed(2)}V</MetricValue>
              </MetricCard>
              <MetricCard background="linear-gradient(135deg, rgba(136, 132, 216, 0.12), rgba(136, 132, 216, 0.03))">
                <MetricTitle>
                  <FaTemperatureLow />
                  <span>Ambient Temperature</span>
                </MetricTitle>
                <MetricValue>{response.ambient_temperature}°C</MetricValue>
              </MetricCard>
            </MainMetrics>

            <DetailedData>
              <DataSection>
                <SectionTitle>
                  <FaBatteryThreeQuarters /> Battery Metrics
                </SectionTitle>
                <DataGrid>
                  <DataItem>
                    <span>State of Charge</span>
                    <span>{response.used_data.SOC}%</span>
                  </DataItem>
                  <DataItem>
                    <span>State of Health</span>
                    <span>{response.used_data.SOH}%</span>
                  </DataItem>
                  <DataItem>
                    <span>Battery Current</span>
                    <span>{response.used_data.HV_Bat_Current_2}A</span>
                  </DataItem>
                  <DataItem>
                    <span>Remaining kWh</span>
                    <span>{response.used_data.kWh_Remaining.toFixed(2)}</span>
                  </DataItem>
                </DataGrid>
              </DataSection>

              <DataSection>
                <SectionTitle>
                  <FaCar /> Vehicle Status
                </SectionTitle>
                <DataGrid>
                  <DataItem>
                    <span>Speed</span>
                    <span>{response.used_data.Speed} km/h</span>
                  </DataItem>
                  <DataItem>
                    <span>Torque</span>
                    <span>{response.used_data.Torque} Nm</span>
                  </DataItem>
                  <DataItem>
                    <span>Motor Temperature</span>
                    <span>{response.used_data.Motor_Temp}°C</span>
                  </DataItem>
                  <DataItem>
                    <span>Instant Power</span>
                    <span>{response.used_data.Instant_kW} kW</span>
                  </DataItem>
                  <DataItem>
                    <span>ECO Mode</span>
                    <span>{response.used_data.ECO ? 'On' : 'Off'}</span>
                  </DataItem>
                  <DataItem>
                    <span>ePedal</span>
                    <span>{response.used_data.ePedal ? 'Active' : 'Inactive'}</span>
                  </DataItem>
                </DataGrid>
              </DataSection>
            </DetailedData>
          </ResponseCard>
        )}
      </FormCard>
    </Container>
  )
}

export default Innovent
