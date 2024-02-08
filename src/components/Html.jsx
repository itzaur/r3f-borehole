import { useRef } from 'react';
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
  const MARGIN_LEFT = 32;
  const fontSizeTitle = 'min(6vw, 8rem)';
  const fontSizeText = 'min(5vw, 2.6rem)';

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
          opacity: scroll.range(0.29, 0.08),
        },
        '<0'
      )
      .to(
        outfitInfo.current,
        {
          opacity: scroll.range(0.31, 0.08),
        },
        '<-0.3'
      )
      .to(
        pipes.current,
        {
          opacity: scroll.range(0.4, 0.15),
        },
        '<0'
      )
      .to(
        pipesInfo.current,
        {
          y: `${scroll.offset * -450}`,
          opacity: scroll.range(0.43, 0.15),
        },
        '<-0.5'
      )
      .to(
        repair.current,
        {
          opacity: scroll.range(0.51, 0.15),
        },
        '<0'
      )
      .to(
        repairInfo.current,
        {
          y: `${scroll.offset * -450}`,
          opacity: scroll.range(0.54, 0.15),
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
        width: 'min(95vw, 35ch)',

        fontFamily: 'Arial, sans-serif',
        fontSize: fontSizeTitle,

        color: '#ffffff',
      }}
    >
      {/* <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 'min(95vw, 35ch)',

          fontFamily: 'Arial, sans-serif',
          fontSize: fontSizeTitle,

          color: '#ffffff',
        }}
      >
        <a href='tel:+375 29 247-55-66'>+375 29 247-55-66</a>
        <a href='tel:+375 29 627-23-72'>+375 29 627-23-72</a>
      </div> */}
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
            fontFamily: 'DelaGothicOne, sans-serif',
            textTransform: 'uppercase',
          }}
        >
          {source.images[0].tag}
        </h1>
        <div
          ref={subtitle}
          style={{
            width: 'min(100%, 42ch)',

            paddingTop: isMobile ? '0' : '4rem',

            fontSize: fontSizeText,
            lineHeight: 1.2,
          }}
        >
          <p style={{ paddingBottom: '1rem', textTransform: 'uppercase' }}>
            В договорную стоимость работ входят:
          </p>
          <ul style={{ listStylePosition: 'inside' }}>
            <li>приезд к месту бурения скважины;</li>
            <li>работы по бурению;</li>
            <li>обсадные трубы;</li>
            <li>заводской скважинный фильтр;</li>
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
            width: '12ch',
            maxWidth: '14ch',

            fontFamily: 'DelaGothicOne, sans-serif',
            fontSize: fontSizeTitle,
            textTransform: 'uppercase',
          }}
        >
          Рассрочка 0%
        </h2>

        <div
          ref={installmentInfo}
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '2vw',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ fontSize: fontSizeText }}>
            <p>без банков</p>
            <p>без поручителей</p>
          </div>
          <div
            style={{
              fontFamily: 'DelaGothicOne, sans-serif',
              fontSize: fontSizeTitle,
              textTransform: 'uppercase',
            }}
          >
            3 месяца
          </div>
        </div>
        <div ref={installmentDiscount}>
          <p style={{ fontSize: fontSizeText }}>
            При заказе 2-х и более скважин
          </p>
          <p
            style={{
              fontFamily: 'DelaGothicOne, sans-serif',
              fontSize: 'min(6.5vw, 5rem)',
              textTransform: 'uppercase',
            }}
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
          gap: isMobile ? '0' : '2rem',

          paddingLeft: '2rem',
        }}
      >
        <h2
          ref={outfit}
          style={{
            fontFamily: 'DelaGothicOne, sans-serif',
            fontSize: fontSizeTitle,
            textTransform: 'uppercase',
          }}
        >
          Техника
        </h2>
        <p
          ref={outfitInfo}
          style={{
            width: 'min(100%, 45ch)',

            fontSize: fontSizeText,
            textAlign: 'left',
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
          gap: isMobile ? '0' : '2rem',

          paddingLeft: '2rem',
        }}
      >
        <h2
          ref={pipes}
          style={{
            fontFamily: 'DelaGothicOne, sans-serif',
            fontSize: fontSizeTitle,
            textTransform: 'uppercase',
            textAlign: 'right',
          }}
        >
          Трубы
        </h2>
        <p
          ref={pipesInfo}
          style={{ fontSize: fontSizeText, textAlign: 'right' }}
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
            fontFamily: 'DelaGothicOne, sans-serif',
            fontSize: fontSizeTitle,

            textTransform: 'uppercase',
          }}
        >
          Ремонт
        </h2>
        <div
          ref={repairInfo}
          style={{
            fontSize: fontSizeText,
            lineHeight: 1.2,

            paddingTop: isMobile ? '0' : '2rem',
          }}
        >
          <p style={{ paddingBottom: '1rem', textTransform: 'uppercase' }}>
            Ремонтные работы могут включать:
          </p>
          <ul style={{ listStylePosition: 'inside' }}>
            <li>извлечение и замена насоса в случае его поломки;</li>
            <li>промывка скважины</li>
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
          gap: isMobile ? '0' : '2rem',

          paddingLeft: '2rem',
        }}
      >
        <h2
          ref={arrangement}
          style={{
            fontFamily: 'DelaGothicOne, sans-serif',
            fontSize: fontSizeTitle,

            textTransform: 'uppercase',
          }}
        >
          Обустройство
        </h2>
        <div
          ref={arrangementInfo}
          style={{
            width: 'min(100%, 40ch)',

            fontSize: fontSizeText,
            lineHeight: 1.2,

            paddingTop: isMobile ? '0' : '2rem',
          }}
        >
          <p style={{ paddingBottom: '1rem', textTransform: 'uppercase' }}>
            Обустройство скважины и подводка воды в дом включают:
          </p>
          <ul style={{ listStylePosition: 'inside' }}>
            <li>установка насосного оборудования;</li>
            <li>монтаж кессона (колодца);</li>
            <li>подключение автоматики;</li>
            <li>ввод воды в дом</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
