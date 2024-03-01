const source = {
  top: 0,
  pages: 0,
  mouse: [0, 0],
  bg: '#000000',

  content: [
    {
      images: [
        './images/depth1.jpg',
        './images/depth3.jpg',
        './images/depth5.jpg',
      ],
      underImages: [
        './images/depth2.jpg',
        './images/depth4.jpg',
        './images/depth6.jpg',
      ],
    },
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
      id: 0,
      image: './images/1.jpg',
    },
    {
      id: 1,
      image: './images/2.jpg',
    },
    {
      id: 2,
      image: './images/3.jpg',
    },
    {
      id: 3,
      image: './images/5.jpg',
    },
  ],

  depthbox: [
    {
      depth: 0,
      textColor: '#ffffff',
      texture: '/images/4.jpg',
    },
    {
      depth: -3.99,
      textColor: '#272727',
      title: 'ПРИМЕРЫ',
      subtitle: 'работ по результатам бурения и обустройства скважины',
    },
  ],
};

export default source;
