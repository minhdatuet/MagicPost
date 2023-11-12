import React from 'react';
import './Home.css'
import Slick from '../../conponents/Slick/Slick'
import slide1 from '../../assets/images/slide1.png'
import slide2 from '../../assets/images/slide2.png'
import slide3 from '../../assets/images/slide3.png'

export const Home = () => {
  return (
    <div>
      <Slick arrImg = {[slide1, slide2, slide3, slide2]}>
        
      </Slick>
    </div>

  )
}
