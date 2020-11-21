import React, { useEffect, useState } from 'react';
import { Card } from './components/card/Card';
import 'swiper/swiper-bundle.min.css'
import './App.css';
import SwiperCore, { Pagination, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SuperBucket } from './components/buckets/SuperBucket';
import Drawer from './components/drawer/Drawer.jsx';
import { AssignmentInd } from '@material-ui/icons';

function App() {
  SwiperCore.use([Pagination]);
  const [swiper, setSwiper] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [expenseOnly, setExpenseOnly] = useState(false);
  const [currSubIndex, setCurrSubIndex] = useState(-1);

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
      amount: 1550,
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
    }));
  }
  const addExpense = (index, expense) => {
    setSuperBuckets(superBuckets.map((superBucket, key) => {
      if (key === index) {
        return {
          ...superBucket,
          subExpenses: [...superBucket.subExpenses, expense]
        }
      } else {
        return superBucket
      }
    }));
  }
  const addSubBucket = (index, subBucket) => {
    setSuperBuckets(superBuckets.map((superBucket, key) => {
      if (key === index) {
        // console.log([...superBucket.subExpenses, subBucket])
        return {
          ...superBucket,
          subBuckets: [...superBucket.subBuckets, subBucket]
        }
      } else {
        return superBucket;
      }
    }))
  }
  const addSubBucketExpense = (index, subIndex, expense) => {
    setSuperBuckets(superBuckets.map((superBucket, key) => {
      if (key === index) {
        return {
          ...superBucket,
          subBuckets: superBucket.subBuckets.map((subBucket, subKey) => {
            if (subKey === subIndex) {
              return {
                ...subBucket,
                subExpenses: [...subBucket.subExpenses, expense]
              };
            } else {
              return subBucket;
            }
          })
        }
      } else {
        return superBucket;
      }
    }));
  }

  useEffect(() => {

  }, [])

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
                    setExpenseOnly(false);
                    setDrawerVisible(!drawerVisible);
                    setOverlayVisible(!overlayVisible);
                  }}
                  editBucket={(param) => editBucket(index, param)}
                  removeBucket={() => removeBucket(index)}
                  addSubBucketExpense={(subIndex) => {
                    setCurrSubIndex(subIndex);
                    setExpenseOnly(true);
                    setDrawerVisible(!drawerVisible);
                    setOverlayVisible(!overlayVisible);
                  }}
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
      }}
        onSubmit={(type, toAdd) => {
          if (!swiper) return;
          if (type === 0) {
            addSubBucket(swiper.activeIndex, toAdd);
          } else if (type === 1) {
            addExpense(swiper.activeIndex, toAdd)
          } else if (type === 2) {
            addSubBucketExpense(swiper.activeIndex, currSubIndex, toAdd);
          }
          console.log(superBuckets)
        }}
        expenseOnly={expenseOnly}
      />
      {overlayVisible && <div className={'overlay'} onClick={() => {
        setOverlayVisible(!overlayVisible);
        setDrawerVisible(!drawerVisible);
      }} />}
    </div>
  );
}

export default App;
