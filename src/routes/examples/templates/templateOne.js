/*
  JOHN DOE TEMPLATE
*/
const templateOne = {
  components: {
    defaultTitle: {
      id: 'defaultTitle',
      type: 'title',
      text: 'John Doe',
    },
    defaultSubtitle: {
      id: 'defaultSubtitle',
      type: 'subtitle',
      text:
        '1st Year Communications & New Media Student at the National University of Singapore',
    },
    'component-0': {
      id: 'component-0',
      type: 'message',
      text:
        'Am a student that is passionate about media, technology, and the arts. Although I am an Arts student, I am interested in learning about technology and in my free time, I do dabble in programming\n// Beyond my interest in mastering technology as a tool in business, I also love photography and making YouTube videos!',
    },
    'component-1': {
      id: 'component-1',
      type: 'image',
      images: [
        'https://res.cloudinary.com/folio-hnr/image/upload/v1600537496/blob_rg5peh.jpg',
        'https://res.cloudinary.com/folio-hnr/image/upload/v1600537547/blob_j2rckb.jpg',
        'https://res.cloudinary.com/folio-hnr/image/upload/v1600537588/blob_pci1vh.jpg',
      ],
    },
    'component-2': {
      id: 'component-2',
      type: 'caption',
      text: 'Some of the photos I took!',
    },
    'component-3': {
      id: 'component-3',
      type: 'subtitle',
      text: 'Relevant Professional Experience',
    },
    'component-4': {
      id: 'component-4',
      type: 'description',
      text:
        'Freelance Photographer  - July 2018 - present\nDid some freelance photography work for businesses and for weddings. Business clients included Marriott Singapore, Singapore Tourism Board\n\nForeign Service Intern, Ministry of Foreign Affairs Singapore  - Jan 2018 - Jun 2018\nOrganised and coordinated logistics for diplomatic visits and events involving high-ranking officials from Southeast Asia\n\nHigh School Internship at The Metropolitan Museum of Art, New York City  - Aug 2017 - Dec 2017\nHelped in the publicity of the Christmas Museum Visit Campaign, where we encouraged students to come to visit the museum during the festive season. Learnt some basic Excel functions as well.',
    },
    'component-5': {
      id: 'component-5',
      type: 'site',
      sites: [
        {
          title: 'Enter site title here',
          image:
            'https://res.cloudinary.com/folio-hnr/image/upload/v1600537605/blob_qesb2k.png',
          url: 'https://github.com/charoi',
          text: 'Github profile',
        },
      ],
    },
    'component-6': {
      id: 'component-6',
      type: 'video',
      url: 'https://www.youtube.com/embed/CzQEF-z6H_U',
    },
    'component-7': {
      id: 'component-7',
      type: 'caption',
      text: 'A video I made on my Youtube Channel',
    },
    'component-8': {
      id: 'component-8',
      type: 'music',
      url:
        'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/207977015&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true',
    },
    'component-9': {
      id: 'component-9',
      type: 'caption',
      text: 'Some of the songs I sang and uploaded - (not in the shower)',
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
  ],
  componentCounter: 10,
  imageUrl:
    'https://res.cloudinary.com/folio-hnr/image/upload/v1600557075/blob_uv5mnv.png',
};

export default templateOne;
