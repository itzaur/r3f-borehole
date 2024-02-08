import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import gsap from 'gsap';
import source from '../resources';

export default function Html() {
  const title = useRef();
  const subtitle = useRef();
  const installment = useRef();
  const installmentInfo = useRef();
  const installmentDiscount = useRef();
  const outfit = useRef();
  const outfitInfo = useRef();
  const pipes = useRef();
  const pipesInfo = useRef();
  const repair = useRef();
  const repairInfo = useRef();
  const arrangement = useRef();
  const arrangementInfo = useRef();

  const isMobile = window.innerWidth < 768;
  const MARGIN_LEFT = 35;

  const scroll = useScroll();
  const timeline = useRef();

  useFrame(() => {
    timeline.current = gsap.timeline();

    timeline.current
      .to(
        [
          title.current,
          installment.current,
          outfit.current,
          pipes.current,
          repair.current,
          arrangement.current,
        ],
        {
          y: `${scroll.offset * -500}`,
        }
      )
      .to(
        title.current,
        {
          opacity: scroll.range(0.07, 0.1),
        },
        '<0'
      )
      .to(
        installment.current,
        {
          opacity: scroll.range(0.17, 0.15),
        },
        '<0'
      )
      .to(
        [subtitle.current, installmentInfo.current, outfitInfo.current],
        {
          y: `${scroll.offset * -400}`,
        },
        '<0.2'
      )
      .to(
        subtitle.current,
        {
          opacity: scroll.range(0.08, 0.1),
        },
        '<0'
      )
      .to(
        installmentInfo.current,
        {
          opacity: scroll.range(0.18, 0.15),
        },
        '<0.2'
      )
      .to(
        installmentDiscount.current,
        {
          y: `${scroll.offset * -350}`,
          opacity: scroll.range(0.2, 0.15),
        },
        '<-0.2'
      )
      .to(
        outfit.current,
        {
          opacity: scroll.range(0.28, 0.08),
        },
        '<0'
      )
      .to(
        outfitInfo.current,
        {
          opacity: scroll.range(0.3, 0.08),
        },
        '<-0.3'
      )
      .to(
        pipes.current,
        {
          opacity: scroll.range(0.39, 0.15),
        },
        '<0'
      )
      .to(
        pipesInfo.current,
        {
          y: `${scroll.offset * -450}`,
          opacity: scroll.range(0.41, 0.15),
        },
        '<-0.5'
      )
      .to(
        repair.current,
        {
          opacity: scroll.range(0.5, 0.15),
        },
        '<0'
      )
      .to(
        repairInfo.current,
        {
          y: `${scroll.offset * -450}`,
          opacity: scroll.range(0.52, 0.15),
        },
        '<-0.5'
      )
      .to(
        arrangement.current,
        {
          opacity: scroll.range(0.66, 0.1),
        },
        '<-0.5'
      )
      .to(
        arrangementInfo.current,
        {
          y: `${scroll.offset * -450}`,
          opacity: scroll.range(0.68, 0.1),
        },
        '<-0.5'
      );
  }, []);

  return (
    <main
      style={{
        width: 'min(95vw, 30ch)',
        fontFamily: 'IgraSans, sans-serif',
        fontSize: 'min(6.5vw, 8rem)',
        color: '#ffffff',
      }}
    >
      <section
        className='text-block'
        style={{
          position: 'absolute',
          top: '140vh',
          left: isMobile ? '0' : `${MARGIN_LEFT}vw`,

          paddingLeft: '2rem',
        }}
      >
        <h1
          ref={title}
          style={{
            textTransform: 'uppercase',
          }}
        >
          {source.images[0].tag}
        </h1>
        <div
          ref={subtitle}
          style={{
            width: 'min(100%, 40ch)',
            paddingTop: isMobile ? '0' : '4rem',
            fontSize: 'min(5vw, 2.6rem)',
            lineHeight: 1.2,
          }}
        >
          <p style={{ paddingBottom: '2rem', textTransform: 'uppercase' }}>
            В договорную стоимость работ входят:
          </p>
          <ul>
            <li>- приезд к месту бурения скважины;</li>
            <li>- работы по бурению;</li>
            <li>- обсадные трубы;</li>
            <li>- заводской скважинный фильтр;</li>
            <li>Гарантия на скважину - 5 лет.</li>
          </ul>
        </div>
      </section>
      <section
        style={{
          position: 'absolute',
          top: '210vh',
          left: isMobile ? '0' : `${MARGIN_LEFT}vw`,
          display: 'flex',
          flexDirection: 'column',

          paddingLeft: '2rem',
        }}
      >
        <h2
          ref={installment}
          style={{
            minWidth: '14ch',
            fontSize: 'min(6.5vw, 8rem)',
            textTransform: 'uppercase',
          }}
        >
          Рассрочка 0%
        </h2>

        <div
          ref={installmentInfo}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2vw',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ fontSize: 'min(5vw, 2.6rem)' }}>
            <p>без банков</p>
            <p>без поручителей</p>
          </div>
          <div
            style={{ fontSize: 'min(6.5vw, 8rem)', textTransform: 'uppercase' }}
          >
            3 месяца
          </div>
        </div>
        <div ref={installmentDiscount}>
          <p style={{ fontSize: 'min(5vw, 2.6rem)' }}>
            При заказе 2-х и более скважин
          </p>
          <p
            style={{ fontSize: 'min(6.5vw, 5rem)', textTransform: 'uppercase' }}
          >
            скидка - 10%
          </p>
        </div>
      </section>

      <section
        style={{
          position: 'absolute',
          top: '283vh',
          left: isMobile ? '0' : `${MARGIN_LEFT}vw`,

          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',

          paddingLeft: '2rem',
        }}
      >
        <h2
          ref={outfit}
          style={{
            fontSize: 'min(6.5vw, 8rem)',
            textTransform: 'uppercase',
          }}
        >
          Техника
        </h2>
        <p
          ref={outfitInfo}
          style={{
            fontSize: 'min(5vw, 2.6rem)',
            textAlign: 'left',

            width: 'min(100%, 45ch)',
          }}
        >
          Бурение производится малогабаритной гидробуровой установкой без заезда
          крупногабаритной спецтехники на Ваш участок
        </p>
      </section>

      <section
        style={{
          position: 'absolute',
          top: '355vh',
          left: isMobile ? '0' : `${MARGIN_LEFT}vw`,
          display: 'flex',
          flexDirection: 'column',

          paddingLeft: '2rem',
        }}
      >
        <h2
          ref={pipes}
          style={{
            fontSize: 'min(6.5vw, 8rem)',
            textTransform: 'uppercase',
            textAlign: 'right',
          }}
        >
          Трубы
        </h2>
        <p
          ref={pipesInfo}
          style={{ fontSize: 'min(5vw, 2.6rem)', textAlign: 'right' }}
        >
          Трубы для обустройства скважин включают в себя обсадные трубы
          &lsquo;Хемкор&rsquo; из непластифицированного поливинилхлорида (НПВХ)
          диаметром от 90 до 125 мм. Также в комплект входит заводской
          скважинный фильтр длиной 2 м
        </p>
      </section>

      <section
        style={{
          position: 'absolute',
          top: '430vh',
          left: isMobile ? '0' : `${MARGIN_LEFT}vw`,
          paddingLeft: '2rem',
        }}
      >
        <h2
          ref={repair}
          style={{
            fontSize: 'min(6.5vw, 8rem)',
            textTransform: 'uppercase',
          }}
        >
          Ремонт
        </h2>
        <div
          ref={repairInfo}
          style={{
            paddingTop: isMobile ? '0' : '2rem',
            fontSize: 'min(5vw, 2.6rem)',
            lineHeight: 1.2,
          }}
        >
          <p style={{ paddingBottom: '2rem', textTransform: 'uppercase' }}>
            Ремонтные работы могут включать:
          </p>
          <ul>
            <li>- извлечение и замена насоса в случае его поломки;</li>
            <li>- промывка скважины</li>
          </ul>
        </div>
      </section>

      <section
        style={{
          position: 'absolute',
          top: '525vh',
          left: isMobile ? '0' : `${MARGIN_LEFT}vw`,

          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',

          paddingLeft: '2rem',
        }}
      >
        <h2
          ref={arrangement}
          style={{
            fontSize: 'min(6.5vw, 8rem)',
            textTransform: 'uppercase',
          }}
        >
          Обустройство
        </h2>
        <div
          ref={arrangementInfo}
          style={{
            width: 'min(100%, 40ch)',

            paddingTop: isMobile ? '0' : '2rem',
            fontSize: 'min(6vw, 2.6rem)',
            lineHeight: 1.2,
          }}
        >
          <p style={{ paddingBottom: '2rem', textTransform: 'uppercase' }}>
            Обустройство скважины и подводка воды в дом включают:
          </p>
          <ul>
            <li>- установка насосного оборудования;</li>
            <li>- монтаж кессона (колодца);</li>
            <li>- подключение автоматики;</li>
            <li>- ввод воды в дом</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
