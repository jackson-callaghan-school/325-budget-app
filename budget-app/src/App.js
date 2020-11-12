import React from 'react';
import { Card } from './components/card/Card';
import 'swiper/swiper-bundle.min.css'
import './App.css';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SuperBucket } from './components/buckets/SuperBucket';

function App() {
  SwiperCore.use([Pagination]);

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
            <Card title='test card'>
              <div className="center">hello!</div>
              {/* <SegmentedProgressBar data={testCosts}/> */}
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <SuperBucket data={testSuperBucket} onClickAdd={() => console.log('open drawer')}/>
          </SwiperSlide>
          <div className='swiper-pagnation'></div>
        </Swiper>
      </div>
    </div>
  );
}

export default App;
