import React from 'react';
import { Card } from './components/card/Card';
import 'swiper/swiper-bundle.min.css'
import './App.css';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function App() {
  SwiperCore.use([Pagination]);

  return (
    <div className="App">
      <div className='header-container'>
        <div />
        <div className='header-title'>Header</div>
        <div />
      </div>
      <div className='container'>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          pagination={{
            el: '.swiper-pagnation',
            clickable: true,
          }}
        >
          <SwiperSlide>
            <Card title='test card'>
              <div className="center">hello!</div>
              <button className='fab pos-bottom-right' onClick={() => { console.log('fab pressed') }}>+</button>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card title='test card ... again!'>
              <div className="center">hello again!</div>
            </Card>
          </SwiperSlide>
          <div className='swiper-pagnation'></div>
        </Swiper>
      </div>
    </div>
  );
}

export default App;
