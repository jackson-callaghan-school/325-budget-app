import React, { useState } from 'react';
import { Card } from './components/card/Card';
import 'swiper/swiper-bundle.min.css'
import './App.css';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SuperBucket } from './components/buckets/SuperBucket';
import Drawer from './components/drawer/Drawer.jsx';

function App() {
  SwiperCore.use([Pagination]);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const testSuperBucket = {
    name: 'Test Bucket',
    total: 1450,
    subBuckets: [
      {
        name: 'Housing',
        total: 700,
        expenses: [
          {
            name: 'Rent',
            total: 550,
            color: '#aa00aa'
          },
          {
            name: 'Utilities',
            total: 150,
            color: '#ffee00'
          }
        ]
      }
    ],
    expenses: [
      {
        name: 'Pizza',
        total: 50,
        color: '#ee2222'
      },
      {
        name: 'Random',
        total: 110,
        color: '#ffaa22'
      }
    ]
  };

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
            <SuperBucket data={testSuperBucket} onClickAdd={() => {
              setDrawerVisible(!drawerVisible)
              setOverlayVisible(!overlayVisible)
            }} />
          </SwiperSlide>
          <SwiperSlide>
            <Card title='drawer test'>
              <button id="addBtn" className='fab pos-bottom-right' onClick={() => {
                document.getElementById("drawerContainer").style.display = "block";
                document.getElementById("addBtn").style.display = "none";
                console.log('fab pressed')
              }}>+</button>
              <Drawer></Drawer>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card title='test card ... again!'>
              <div className="center">hello again!</div>
              <Drawer></Drawer>
            </Card>
          </SwiperSlide>
          <div className='swiper-pagnation'></div>
        </Swiper>
      </div>
      <Drawer visible={drawerVisible} onClose={() => {
        setOverlayVisible(!overlayVisible);
        setDrawerVisible(!drawerVisible);
      }} />
      <div className={'overlay ' + overlayVisible ? 'shown' : 'hidden'} />
    </div>
  );
}

export default App;
