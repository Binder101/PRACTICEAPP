import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const moveTruck = keyframes`
  0% { left: -40px; }
  100% { left: calc(100% + 20px); }
`;

const load = keyframes`
  0% { width: 0%; }
  100% { width: 100%; }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0) scaleX(-1); }
  50% { transform: translateY(-5px) scaleX(-1); }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
`;

const Road = styled.div`
  height: 4px;
  background: #333;
  border-radius: 2px;
  margin: 20px 0;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

const Truck = styled.div`
  position: absolute;
  left: -40px;
  bottom: 15px;
  font-size: 32px;
  animation: ${moveTruck} 3s linear infinite, ${bounce} 0.4s ease-in-out infinite;
  transform: scaleX(-1);
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 12px;
  background: #eee;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
`;

const Progress = styled.div`
  width: 0%;
  height: 100%;
  background: #4CAF50;
  animation: ${load} 3s linear forwards;
  border-radius: 6px;
`;

const LoadingText = styled.div`
  text-align: center;
  color: #333;
  font-family: Arial, sans-serif;
  margin-top: 10px;
  font-weight: bold;
`;

const LoadingAnimation = () => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage(prev => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 30);

    const timeout = setTimeout(() => {
      navigate('/dashboard');
    }, 3000);

    // return () => {
    //   clearInterval(interval);
    //   clearTimeout(timeout);
    // };
  }, [navigate]);

  return (
    <LoadingContainer>
      <ProgressBar>
        <Progress />
      </ProgressBar>
      <Road>
        <Truck>🚚</Truck>
      </Road>
      <LoadingText>Loading... {loadingPercentage}%</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingAnimation;
