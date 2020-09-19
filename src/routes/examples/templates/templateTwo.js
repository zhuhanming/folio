const templateTwo = {
  components: {
    defaultTitle: { id: 'defaultTitle', type: 'title', text: 'Praveen Elango' },
    defaultSubtitle: {
      id: 'defaultSubtitle',
      type: 'subtitle',
      text: 'Maze Robot Navigation Project, August - November 2019',
    },
    'component-0': {
      id: 'component-0',
      type: 'image',
      images: [
        'https://res.cloudinary.com/folio-hnr/image/upload/v1600538221/blob_lijveq.jpg',
        'https://res.cloudinary.com/folio-hnr/image/upload/v1600538268/blob_m9i8yz.jpg',
        'https://res.cloudinary.com/folio-hnr/image/upload/v1600538301/blob_frqa37.jpg',
      ],
    },
    'component-1': {
      id: 'component-1',
      type: 'caption',
      text:
        'The mBot is required to navigate itself through a maze by detecting the colour of cardboards placed above it',
    },
    'component-2': {
      id: 'component-2',
      type: 'description',
      text:
        'The mBot robot is programmed with three sensors using the Arduino platform - infrared, ultrasonic, and LDR. The use of a band pass filter is also employed as an envelope detector to gauge the noise level of its immediate surroundings. The LDR sensors are used to detect the colour of the cardboard above the robot using RGB LED values, where the range of the values differs for each colour. Based on the detected colour, the mBot will execute its respective specific movements. This project enabled me to develop a greater understanding of the field of electronics and computer engineering where I learned how to develop precise algorithms (the software aspect) and to assemble functional circuits (the hardware aspect) and integrating both aspects together. You can check out how to assemble your own mBot by clicking the following GitHub picture.',
    },
    'component-3': {
      id: 'component-3',
      type: 'site',
      sites: [
        {
          title: 'Enter site title here',
          image:
            'https://res.cloudinary.com/folio-hnr/image/upload/v1600538334/blob_odu9o8.jpg',
          url: 'https://github.com/Makeblock-official/mBot',
          text: '',
        },
      ],
    },
    'component-4': {
      id: 'component-4',
      type: 'code',
      text:
        '//Function for left movement of robot\nvoid turnLeft() {\n  motor1.run(motorSpeed);\n  motor2.run(motorSpeed);\n  delay(turnDuration);\n  stopMotor();\n}',
    },
    'component-5': {
      id: 'component-5',
      type: 'subtitle',
      text: 'Learning Mandarin Chinese, January - April 2017',
    },
    'component-6': {
      id: 'component-6',
      type: 'image',
      images: [
        'https://res.cloudinary.com/folio-hnr/image/upload/v1600538383/blob_kx8z94.png',
        'https://res.cloudinary.com/folio-hnr/image/upload/v1600538419/blob_alucq8.png',
      ],
    },
    'component-7': {
      id: 'component-7',
      type: 'caption',
      text: 'Everyone warned me about the steep learning curve!',
    },
    'component-8': {
      id: 'component-8',
      type: 'description',
      text:
        "As someone proficient in only two languages, of which both have little relation in terms of grammar and linguistic structure to Mandarin, I really should have known what I was signing up for. I decided to learn the world's most spoken language not merely for economic reasons and its usefulness in day-to-day life, but also because I wanted to set a personal challenge for myself. Learning Mandarin was definitely not easy. Yet in some ways, the environment for me to accelerate my Mandarin learning process was always set up for me. Knowing Singlish meant that my Mandarin learning curve was not as steep as the grammatical structure of Singlish to Mandarin is fairly similar. Moreover, access to language-learning applications like Memrise on smartphones means that one can have an interactive learning environment. Last but not least, being surrounded by native/proficient speakers of the language helps immensely. I learned this on my trip to Beijing, whereby conversing with the locals in full-fledged Mandarin helped to reinforce my neural connections of Mandarin vocabulary. Three months in, I can now listen to and appreciate Mandarin songs!\n",
    },
    'component-9': {
      id: 'component-9',
      type: 'music',
      url:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/475205196&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
    },
    'component-10': {
      id: 'component-10',
      type: 'message',
      text: '\n但是我的普通话现在真的很糟糕!',
    },
    'component-11': {
      id: 'component-11',
      type: 'subtitle',
      text: 'Tembusu College, August 2019 - ',
    },
    'component-12': {
      id: 'component-12',
      type: 'description',
      text:
        "Most people say that staying on-campus is a life-changing experience. After coming to Tembusu, I realised that they were absolutely right. Tembusu is a highly inclusive environment that taught me the value of diversity, giving me a multitude of perspectives that I wasn't exposed to before. The intellectual environment pushed my boundaries in the way that I think as a person. The seminar-styled discussions were indispensable in achieving this outcome, along with increasing my self-awareness of the issues that concern my society and the world. In addition, attending the forum on the bilateral ties between Singapore and the UK enhanced my knowledge on how nations co-operate with each other in the modern world. I honestly can't wait to see what is in store for me during my remaining time in Tembusu College!",
    },
    'component-13': {
      id: 'component-13',
      type: 'video',
      url: 'https://www.youtube.com/embed/b82xuH9Pf8o',
    },
  },
  componentOrder: [
    'defaultTitle',
    'defaultSubtitle',
    'component-0',
    'component-1',
    'component-2',
    'component-3',
    'component-4',
    'component-5',
    'component-6',
    'component-7',
    'component-8',
    'component-9',
    'component-10',
    'component-11',
    'component-12',
    'component-13',
  ],
  componentCounter: 14,
  imageUrl:
    'https://res.cloudinary.com/folio-hnr/image/upload/v1600557198/blob_xyaa1x.png',
};

export default templateTwo;
