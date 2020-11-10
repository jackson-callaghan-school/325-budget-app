import { Card } from './components/card/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
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
        </Swiper>
      </div>
    </div>
  );
}

export default App;
