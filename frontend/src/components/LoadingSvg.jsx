import React from 'react'

const LoadingSvg = ({color="#2580FF"}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="60" height="30">
  <path fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray="60 77" strokeDashoffset="0" 
        d="M55 15c0 6.2-5.4 10-10 10-11.6 0-18.4-20-30-20-5.6 0-10 4.4-10 10s4.6 10 10 10c11.6 0 18.4-20 30-20 4.8 0 10 3.8 10 10Z">
    <animate attributeName="stroke-dashoffset" calcMode="spline" dur="2s" values="137;-137" keySplines="0 0 1 1" repeatCount="indefinite" />
  </path>
</svg>

        

        // <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'><path fill='none' stroke='#2580FF' strokeWidth='15' strokeLinecap='round' strokeDasharray='300 385' strokeDashoffset='0' d='M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z'><animate attributeName='stroke-dashoffset' calcMode='spline' dur='2' values='685;-685' keySplines='0 0 1 1' repeatCount='indefinite'></animate></path></svg>

   
  )
}

export default LoadingSvg