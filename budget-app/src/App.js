import { Card } from './components/card/Card';
import 'swiper/swiper-bundle.min.css'
import './App.css';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

function App() {
  SwiperCore.use([Pagination]);

  return (
    <div className="App">
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
