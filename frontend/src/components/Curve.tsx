import React from 'react';
import styled from 'styled-components';
import { useEffect, useRef, useMemo } from 'react';

const CurveContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  padding: 1rem;
  margin-top: -3rem;
`;

const Label = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 1px;
`;

const ProgressIndicator = styled.div<{ progress: number }>`
  position: absolute;
  width: 12px;
  height: 12px;
  background: #00D26A;
  border-radius: 50%;
  filter: drop-shadow(0 0 8px rgba(0, 210, 106, 0.8));
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const SVGWrapper = styled.div`
  width: 100%;
  height: 80px;
  position: relative;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 10px rgba(0, 210, 106, 0.2));
`;

const RangeText = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.95);
  font-size: 1.8rem;
  font-weight: 800;
  font-family: 'Inter', sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 0 15px rgba(0, 210, 106, 0.3);
  transition: all 0.3s ease;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  margin-top: 2.5rem;
`;

const ValueText = styled.div`
  color: rgba(255, 255, 255, 0.95);
  font-size: 3rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.5px;
  text-shadow: 0 0 15px rgba(0, 210, 106, 0.3);
  line-height: 1;
  margin-top: -3.5rem;
  display:flex;
`;

const LabelText = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const P = styled.div`

    font-size: 1rem;
    align-self: flex-end;
    margin-bottom: 0.5rem;
    margin-left: 0.2rem;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: lowercase;
`;

interface CurveProps {
  progress?: number;
}

const Curve = ({ progress = 15 }: CurveProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Calculate range classification
  const rangeInfo = useMemo(() => {
    if (progress >= 70) {
      return {
        status: 'Good',
        color: '#4CAF50',
        gradientStart: 'rgba(76, 175, 80, 0.4)',
        gradientEnd: 'rgba(76, 175, 80, 1)'
      };
    } else if (progress >= 30) {
      return {
        status: 'Moderate',
        color: '#FFC107',
        gradientStart: 'rgba(255, 193, 7, 0.4)',
        gradientEnd: 'rgba(255, 193, 7, 1)'
      };
    } else {
      return {
        status: 'Low',
        color: '#F44336',
        gradientStart: 'rgba(244, 67, 54, 0.4)',
        gradientEnd: 'rgba(244, 67, 54, 1)'
      };
    }
  }, [progress]);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = length.toString();
      pathRef.current.style.strokeDashoffset = ((100 - progress) / 100 * length).toString();
    }
  }, [progress]);

  return (
    <CurveContainer>
      {/* <Label>COMFORT</Label> */}
      <SVGWrapper>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 800 200"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient 
              id="progressGradient" 
              x1="0" 
              y1="0" 
              x2="1" 
              y2="0"
            >
              <stop offset="0%" stopColor="#00FF00" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00FF00" stopOpacity="1" />
            </linearGradient>
            
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feFlood floodColor="#00FF00" floodOpacity="0.4" result="glowColor"/>
              <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow"/>
              <feMerge>
                <feMergeNode in="softGlow" />
                <feMergeNode in="softGlow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Arc */}
          <path
            d="M 100 160 A 400 400 0 0 1 700 160"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Progress Arc */}
          <path
            ref={pathRef}
            d="M 100 160 A 400 400 0 0 1 700 160"
            stroke="url(#progressGradient)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            style={{
              transition: 'stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </svg>
        
        <ProgressIndicator
          progress={progress}
          style={{
            left: `${100 + ((progress / 100) * 600)}px`,
            top: '160px',
            transform: 'translate(-50%, -50%)',
            background: '#00FF00',
            boxShadow: '0 0 15px #00FF00',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </SVGWrapper>

      <StatsContainer>
        <ValueText>147 <P className='text-md'>km</P></ValueText>
        <LabelText>Range Left</LabelText>
      </StatsContainer>
    </CurveContainer>
  );
};

export default Curve;