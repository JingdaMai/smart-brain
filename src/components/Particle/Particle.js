import React from 'react';
import Particles from 'react-particles-js';

const Particle = () => {
  const particlesOptions = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
  };
  return <Particles className='particles' params={particlesOptions}/>;
}


export default Particle;