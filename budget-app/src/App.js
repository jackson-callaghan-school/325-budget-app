import React, { useEffect, useState } from 'react';
import { Card } from './components/card/Card';
import 'swiper/swiper-bundle.min.css'
import './App.css';
import SwiperCore, { Pagination, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SuperBucket } from './components/buckets/SuperBucket';
import Drawer from './components/drawer/Drawer.jsx';

function App() {
  SwiperCore.use([Pagination]);
  const [swiper, setSwiper] = useState(null);

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const testData = [
    {
      name: 'Test Bucket',
      amount: 1450,
      subBuckets: [
        {
          name: 'Housing',
          amount: 700,
          color: '#eeaaee',
          subExpenses: [
            {
              name: 'Rent',
              amount: 550,
              color: '#aa00aa'
            },
            {
              name: 'Utilities',
              amount: 150,
              color: '#ffee00'
            }
          ]
        }
      ],
      subExpenses: [
        {
          name: 'Pizza',
          amount: 50,
          color: '#ee2222'
        },
        {
          name: 'Random',
          amount: 110,
          color: '#ffaa22'
        }
      ]
    },
    {
      name: 'Test Bucket 2',
      amount: 1450,
      subBuckets: [
        {
          name: 'ETFS',
          amount: 550,
          color: '#008822',
          subExpenses: [
            {
              name: 'Vanguard',
              amount: 150,
            },
            {
              name: 'JP Morgan',
              amount: 400,
              color: '#ee0000'
            }
          ]
        },
        {
          name: 'Bonds',
          amount: 437.93,
          color: '#3311ff',
          subExpenses: [
            {
              name: 'James',
              amount: 250,
              color: '#ffeeaa'
            },
            {
              name: 'Covalent',
              amount: 187.93,
              color: '#eeffaa'
            }
          ]
        }
      ],
      subExpenses: [
        {
          name: 'Extra',
          amount: 50,
          color: '#ee2222'
        },
        {
          name: 'Extra',
          amount: 50,
          color: '#ee2222'
        },
        {
          name: 'Extra',
          amount: 50,
          color: '#ee2222'
        },
        {
          name: 'Extra',
          amount: 50,
          color: '#ee2222'
        },
      ]
    },
  ];

  const [superBuckets, setSuperBuckets] = useState(testData);
  const addNewBucket = () => {
    setSuperBuckets(superBuckets.concat({ name: 'New Bucket', amount: 0, subBuckets: [], subExpenses: [] }));
  }
  const removeBucket = (index) => {
    setSuperBuckets(superBuckets.filter((superBucket, key) => key !== index));
  }
  const editBucket = (index, params) => {
    setSuperBuckets(superBuckets.map((superBucket, key) => {
      if (key === index) {
        return {
          ...superBucket,
          ...params
        }
      } else {
        return superBucket
      }
    }))
  }

  useEffect(() => {
    swiper && swiper.update();
  }, [superBuckets])

  return (
    <div className="App">
      <div className='header-container'>
        <div />
        <div className='header-title'>Bucket Budgeting</div>
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
          onSwiper={(swiper) => {
            setSwiper(swiper);
          }}
        >
          {superBuckets.map((superBucket, index) => {
            return (
              <SwiperSlide key={index}>
                <SuperBucket key={index} index={index}
                  data={superBucket}
                  onClickAdd={() => {
                    setDrawerVisible(!drawerVisible)
                    setOverlayVisible(!overlayVisible)
                  }}
                  editBucket={editBucket}
                  removeBucket={removeBucket}
                />
              </SwiperSlide>
            )
          })}
          <SwiperSlide>
            <Card>
              <div className='center'>
                <button className='fab fab-large' style={{ position: 'static' }} onClick={() => { addNewBucket() }}>+</button>
                <div className='fab-title'>Add New Super Bucket</div>
              </div>
            </Card>
          </SwiperSlide>
          <div className='swiper-pagnation'></div>
        </Swiper>
      </div>
      <Drawer visible={drawerVisible} onClose={() => {
        setOverlayVisible(!overlayVisible);
        setDrawerVisible(!drawerVisible);
      }} />
      {overlayVisible && <div className={'overlay'} onClick={() => {
        setOverlayVisible(!overlayVisible);
        setDrawerVisible(!drawerVisible);
      }} />}
    </div>
  );
}

export default App;
