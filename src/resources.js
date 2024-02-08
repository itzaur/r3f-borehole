const source = {
  top: 0,
  pages: 0,
  threshold: 4,
  mouse: [0, 0],
  bg: '#272727',
  // scrollOffset: 5.5,
  content: [
    {
      id: 0,
      tag: '0',
      text: `БУРЕНИЕ СКВАЖИН НА ВОДУ`,
      images: ['./images/1.jpg'],
    },
    {
      id: 1,
      tag: '2',
      text: 'New Text',
      images: ['./images/2.jpg', './images/3.jpg', './images/4.jpg'],
    },
    { id: 2, tag: '1', text: 'Some Text', images: ['./images/1.jpg'] },
  ],
  textures: [
    { name: 'MapColor', url: 'https://iili.io/HED0SXj.png' },
    {
      name: 'MapNormal',
      url: 'https://raw.githubusercontent.com/pizza3/asset/master/chaassets/Lava/Lava_001_NRM.webp',
    },
    {
      name: 'MapRoughness',
      url: 'https://raw.githubusercontent.com/pizza3/asset/master/chaassets/Lava/Lava_001_OCC.webp',
    },
  ],
  images: [
    {
      image: './images/1.jpg',
      id: 0,
      tag: 'Договор',
      text: `В договорную стоимость работ входят:</p>
      <> приезд к месту бурения скважины, работы по бурению, обсадные трубы, заводской скважинный фильтр. \n\nГарантия на скважину - 5 лет.`,
      depth: 0,
      color: '#cccccc',
      textColor: '#ffffff',
    },
    {
      image: './images/2.jpg',
      id: 1,
      tag: 'Рассрочка 0%',
      text: `3 МЕСЯЦА \nбез банков\nбез поручителей \n\nПри заказе 2-х и более скважин скидка - 10%`,
      depth: 0,
      color: '#cccccc',
      textColor: '#ffffff',
    },
    {
      image: './images/4.jpg',
      id: 2,
      tag: 'Оборудование',
      text: 'Бурение производится малогабаритной гидробуровой установкой без заезда крупногабаритной спецтехники на Ваш участок.',
      depth: 0,
      color: '#cccccc',
      textColor: '#ffffff',
    },
    {
      image: './images/2.jpg',
      id: 3,
      tag: 'Трубы',
      text: 'Трубы для обустройства скважин включают в себя обсадные трубы "Хемкор" из непластифицированного поливинилхлорида (НПВХ) диаметром от 90 до 125 мм. Также в комплект входит заводской скважинный фильтр длиной 2 м.',
      depth: 0,
      color: '#cccccc',
      textColor: '#ffffff',
    },
    {
      image: './images/3.jpg',
      id: 4,
      tag: 'Ремонт',
      text: `Ремонтные работы могут включать: \n- извлечение и замена насоса в случае его поломки; \n- промывка скважины`,
      depth: 0,
      color: '#cccccc',
      textColor: '#ffffff',
    },
    {
      image: './images/3.jpg',
      id: 5,
      tag: 'Обустройство скважины и подводка воды в дом',
      text: '\nУстановка насосного оборудования, кессона (колодца), подключение автоматики, ввод воды в дом.',
      depth: 0,
      color: '#cccccc',
      textColor: '#ffffff',
    },
  ],

  depthbox: [
    {
      depth: 0,
      color: '#cccccc',
      textColor: '#ffffff',
      text: 'Пример текста',
      image: '/images/4.jpg',
    },
    {
      depth: -3.99,
      textColor: '#272727',
      text: 'Связаться с нами',
      image: '/images/2.jpg',
    },
  ],
};

export default source;

// [
//   { top: 0, pages: 0 },
//   {
//     name: 'text1',
//     title: `<p>Трубы для обустройства скважин включают в себя обсадные трубы "Хемкор" из непластифицированного поливинилхлорида (НПВХ) диаметром от 90 до 125 мм, с различными толщинами стенок, определяющими глубину заложения (бурения). Также в комплект входит заводской скважинный фильтр длиной 2 м.</p>
//         <p>Трубы абсолютно инертны к компонентам состава почвы. В процессе эксплуатации не разрушаются и не выделяют вредных для окружающей среды веществ.</p>`,
//     id: 0,
//   },
//   {
//     name: 'text2',
//     title: `<p>В договорную стоимость работ входят: приезд к месту бурения скважины, работы по бурению, обсадные трубы, заводской скважинный фильтр.</p>
//         <p>Стоимость насосного оборудования и комплектующих учитывается отдельно и включается в договор отдельной строкой.</p>
//         <p>Гарантия на работы и насосное оборудование. Предусмотрена рассрочка сроком до 3-х месяцев.</p>`,
//     id: 1,
//   },
//   {
//     name: 'text3',
//     title: `<p>Бурение скважин на воду под погружной насос в Могилеве и Могилевской области.</p> <p>Бурение производится малогабаритной гидробуровой установкой без заезда крупногабаритной спецтехники на Ваш участок.</p>`,
//     id: 2,
//   },
//   {
//     name: 'text4',
//     title: `<p>Ремонтные работы могут включать: </p>
//         <p>- извлечение застрявших в скважинах насосов;</p>
//         <p>- извлечение и ремонт (замена) насоса в случае его поломки;</p>
//         <p>- извлечение насоса, промывка скважины.</p>
//         <p>Промывка старой скажины не всегда дает 100%-й результат. Если фильтр был подобран неправильно и забит слишком мелким песком, или если при монтаже скважины он просто не попал в водоносный слой в результате некачественной работы бурильщиков, эффект от промывки будет только временным.</p>`,
//     id: 3,
//   },
//   {
//     name: 'text5',
//     title: `<p>Насосное оборудование включает в себя: </p>
//         <p>- насос (винтовой, центробежный);</p>
//         <p>- тросы;</p>
//         <p>- зажимы;</p>
//         <p>- обратные клапаны;</p>
//         <p>- фитинги;</p>
//         <p>- оголовки (крышки) скважины.</p>`,
//     id: 4,
//   },
//   // {
//   //   name: 'Noise',
//   //   url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
//   // },
//   {
//     // url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/Lava_001_COLOR.png",
//     name: 'MapColor',
//     // url: "https://raw.githubusercontent.com/pizza3/asset/master/chaassets/Lava/Lava_001_COLOR.webp",
//     url: 'https://iili.io/HED0SXj.png',
//   },
//   {
//     // url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/Lava_001_NRM.png",
//     name: 'MapNormal',
//     url: 'https://raw.githubusercontent.com/pizza3/asset/master/chaassets/Lava/Lava_001_NRM.webp',
//   },
//   {
//     // url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/Lava_001_OCC.png",
//     name: 'MapRoughness',
//     url: 'https://raw.githubusercontent.com/pizza3/asset/master/chaassets/Lava/Lava_001_OCC.webp',
//   },
//   {
//     // url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/Lava_001_DISP.png",
//     name: 'MapDisplacement',
//     url: 'https://raw.githubusercontent.com/pizza3/asset/master/chaassets/Lava/Lava_001_DISP.webp',
//   },
//   {
//     name: 'Texture1',
//     url: 'https://images.pexels.com/photos/220211/pexels-photo-220211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
//   },
//   {
//     name: 'Texture2',
//     url: 'https://cdn.proactiveinvestors.com/eyJidWNrZXQiOiJwYS1jZG4iLCJrZXkiOiJ1cGxvYWRcL05ld3NcL0ltYWdlXC8yMDIxXzEwXC8xNjM0NzAyNzA1XzIwMjEtMTAtMjAtMTUtMDUtMDVfZDc2ZTdiODdkZDVlYmQ0ZmQxYTI5MWMyYWQwY2E0NWUuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo2NzIsImhlaWdodCI6MzMxLCJmaXQiOiJjb3ZlciJ9fX0=',
//   },
// ];
