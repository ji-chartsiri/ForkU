import React from 'react'
import './LoadingAnimation.css'
import fork from './ziXoyRA7T.png'

class LoadingAnimation extends React.Component{
    render() {
        let particles = []
        for(let i = 0; i < 25; i++){
            particles.push(
                <img className='particle' key={i} src={fork}/>
            )
        }
        return (
            <div
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: '0',
              left: '0',
              zIndex: '10',
              backgroundColor: 'black',
              opacity: '0.5'
            }}>
                <h1 id="name">
                    ForkU
                </h1>
                {particles}
            </div>
        )
    }
}

export default LoadingAnimation