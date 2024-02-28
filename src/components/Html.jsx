import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import gsap from 'gsap';

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
          opacity: scroll.range(isMobile ? 0.02 : 0.07, 0.1),
        },
        '<0'
      )
      .to(
        installment.current,
        {
          opacity: scroll.range(0.17, 0.1),
        },
        '<0'
      )
      .to(
        [
          subtitle.current,
          installmentInfo.current,
          outfitInfo.current,
          pipesInfo.current,
          repairInfo.current,
          arrangementInfo.current,
        ],
        {
          y: `${scroll.offset * -450}`,
        },
        '<0.2'
      )
      .to(
        subtitle.current,
        {
          opacity: scroll.range(isMobile ? 0.03 : 0.08, 0.08),
        },
        '<0'
      )
      .to(
        installmentInfo.current,
        {
          opacity: scroll.range(0.18, 0.1),
        },
        '<0.2'
      )
      .to(
        installmentDiscount.current,
        {
          y: `${scroll.offset * -350}`,
          opacity: scroll.range(0.2, 0.1),
        },
        '<-0.2'
      )
      .to(
        outfit.current,
        {
          opacity: scroll.range(isMobile ? 0.25 : 0.29, 0.06),
        },
        '<0'
      )
      .to(
        outfitInfo.current,
        {
          opacity: scroll.range(isMobile ? 0.27 : 0.32, 0.1),
        },
        '<-0.3'
      )
      .to(
        pipes.current,
        {
          opacity: scroll.range(0.4, 0.1),
        },
        '<0'
      )
      .to(
        pipesInfo.current,
        {
          // y: `${scroll.offset * -450}`,
          opacity: scroll.range(0.43, 0.06),
        },
        '<-0.5'
      )
      .to(
        repair.current,
        {
          opacity: scroll.range(isMobile ? 0.48 : 0.51, 0.1),
        },
        '<0'
      )
      .to(
        repairInfo.current,
        {
          // y: `${scroll.offset * -450}`,
          opacity: scroll.range(isMobile ? 0.5 : 0.54, 0.1),
        },
        '<-0.5'
      )
      .to(
        arrangement.current,
        {
          opacity: scroll.range(isMobile ? 0.63 : 0.66, 0.1),
        },
        '<-0.5'
      )
      .to(
        arrangementInfo.current,
        {
          // y: `${scroll.offset * -450}`,
          opacity: scroll.range(isMobile ? 0.65 : 0.68, 0.1),
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

        pointerEvents: 'none',
      }}
    >
      <section
        // className='text-block'
        style={{
          position: 'absolute',
          top: isMobile ? '115vh' : '135vh',
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
          Договор
        </h1>
        <div
          ref={subtitle}
          style={{
            width: 'min(100%, 42ch)',

            paddingTop: isMobile ? '1.5rem' : '2rem',

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
            <li>заводской скважинный фильтр.</li>
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
          top: isMobile ? '275vh' : '283vh',
          left: isMobile ? '0' : `${MARGIN_LEFT}vw`,

          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'flex-start',
          justifySelf: 'flex-start',
          alignItems: 'flex-start',

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
          крупногабаритной спецтехники на Ваш участок.
        </p>
      </section>

      <section
        style={{
          position: 'absolute',
          top: isMobile ? '350vh' : '355vh',
          left: isMobile ? '0' : `${MARGIN_LEFT}vw`,

          display: 'flex',
          flexDirection: 'column',

          paddingLeft: '2rem',
        }}
      >
        <h2
          ref={pipes}
          style={{
            fontFamily: 'DelaGothicOne, sans-serif',
            fontSize: fontSizeTitle,
            textTransform: 'uppercase',
          }}
        >
          Трубы
        </h2>
        <p
          ref={pipesInfo}
          style={{
            width: 'min(100%, 47ch)',
            fontSize: fontSizeText,
          }}
        >
          Трубы для обустройства скважин включают в себя обсадные трубы
          &lsquo;Хемкор&rsquo; из непластифицированного поливинилхлорида (НПВХ)
          диаметром от 90 до 125 мм. Также в комплект входит заводской
          скважинный фильтр длиной 2 м.
        </p>
      </section>

      <section
        style={{
          position: 'absolute',
          top: isMobile ? '420vh' : '430vh',
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
          }}
        >
          <p style={{ paddingBottom: '1rem', textTransform: 'uppercase' }}>
            Ремонтные работы могут включать:
          </p>
          <ul style={{ listStylePosition: 'inside' }}>
            <li>извлечение и замена насоса в случае его поломки;</li>
            <li>промывка скважины.</li>
          </ul>
        </div>
      </section>

      <section
        style={{
          position: 'absolute',
          top: isMobile ? '520vh' : '525vh',
          left: isMobile ? '0' : `${MARGIN_LEFT}vw`,

          display: 'flex',
          flexDirection: 'column',

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
          }}
        >
          <p style={{ paddingBottom: '1rem', textTransform: 'uppercase' }}>
            Обустройство скважины и подводка воды в дом включают:
          </p>
          <ul style={{ listStylePosition: 'inside' }}>
            <li>установка насосного оборудования;</li>
            <li>монтаж кессона (колодца);</li>
            <li>подключение автоматики;</li>
            <li>ввод воды в дом.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
