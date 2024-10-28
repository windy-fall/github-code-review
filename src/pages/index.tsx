import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Countdown from "react-countdown";
import Image from 'next/image';
import styles from '@/styles/Birthday.module.scss';
import { StageContent, stagesContent } from '@/data';
import LSModal from '@/components/common/LSModal';
import Stage1 from '@/components/index/Stage1';
import Stage2 from '@/components/index/Stage2';
import Stage3 from '@/components/index/Stage3';
import Stage4 from '@/components/index/Stage4';
import dayjs from 'dayjs';

export default function Birthday() {
  const [progress, setProgress] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState<StageContent>(stagesContent[0]);
  const [seconds, setSeconds] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    const calculateTimeDifference = () => {
      const now = dayjs();
      const birthday = dayjs('2023-08-24 00:00');
      return Math.floor(birthday.diff(now) / 1000);
    };

    setSeconds(calculateTimeDifference());

    const countdown = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleModalConfirm = () => {
    setProgress((prevProgress) => prevProgress + 1);
    setModalShow(false);
  };

  const renderStage = (stageNumber, Component, onAction) => (
    <CSSTransition in={!modalShow && progress === stageNumber} timeout={2000} classNames="fade" unmountOnExit>
      <Component {...onAction} />
    </CSSTransition>
  );

  return (
    <main className={styles.birthday}>
      <div className={seconds > 0 ? 'countdown' : 'countdown hidden'}>
        <Countdown date={Date.now() + seconds * 1000} />
      </div>

      <CSSTransition in={modalShow} timeout={2000} classNames="scale" unmountOnExit>
        <LSModal
          imgUrl={modalContent.imgUrl}
          title={modalContent.title}
          content={modalContent.description}
          btnText={modalContent.btnUrl}
          onConfirm={handleModalConfirm}
        />
      </CSSTransition>

      <div className={seconds > 0 ? 'hidden' : ''}>
        <audio autoPlay loop ref={audioRef}>
          <source src="/bgm1.mp3" type="audio/mpeg" />
        </audio>

        {['bowl', 'spoon', 'oven', 'tin', 'candle'].map((item, index) => (
          <Image
            key={index}
            width={item === 'oven' ? 290 : item === 'tin' ? 90 : item === 'candle' ? 10 : 207}
            height={item === 'oven' ? 282 : item === 'tin' ? 70 : item === 'candle' ? 44 : 148}
            draggable={false}
            src={`/${item}.png`}
            alt={item.charAt(0).toUpperCase() + item.slice(1)}
            className='hidden'
          />
        ))}

        {renderStage(1, Stage1, { onStart: () => {
          console.log('onstart');
          setModalShow(true);
          handlePlay();
          setModalContent(stagesContent[0]);
        }})}

        {renderStage(2, Stage2, { onMixWell: () => {
          console.log('onMixWell');
          setModalShow(true);
          setModalContent(stagesContent[1]);
        }})}

        {renderStage(3, Stage3, { onBaseBake: () => {
          console.log('onBaseBake');
          setModalShow(true);
          setModalContent(stagesContent[2]);
        }})}

        {renderStage(4, Stage4, {})}
      </div>
    </main>
  );
}
