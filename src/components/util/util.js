export const getTemplateItem = () => {
  return {
    lang: 'sv',
    name: 'Stockholm Pizza',
    address: 'Scheelegatan 6, 112 23 Stockholm',
    hours: ["11.00", "23.00"],
    tags: ["Pizza", "Kebab", "Sallad"],
    images: {
      gallery : 'img/gallery1.png',
      banner : 'img/banner1.png',
    },
    menu: [{
      name: 'Kyckling',
      items: [{
        name: 'Kycklingrulle',
        desc: 'Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
        price: '90 SEK'
      }, {
        name: 'Kycklingtallrik',
        desc: 'Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
        price: '90 SEK'
      }, {
        name: 'Kycklingsallad',
        desc: 'Kyckling, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
        price: '90 SEK'
      }]
    }, {
      name: 'Kebab',
      items: [{
        name: 'Kebabrulle',
        desc: 'Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
        price: '90 SEK'
      }, {
        name: 'Kebabtallrik',
        desc: 'Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
        price: '90 SEK'
      }, {
        name: 'Kebabsallad',
        desc: 'Kebab, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
        price: '90 SEK'
      }]
    }, {
      name: 'Gyros',
      items: [{
        name: 'Gyrosrulle',
        desc: 'Gyros, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
        price: '90 SEK'
      }, {
        name: 'Gyrostallrik',
        desc: 'Gyros, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
        price: '90 SEK'
      }, {
        name: 'Gyrossallad',
        desc: 'Gyros, isbergssallad, tomat, lök, fefferoni, tomatsås och vitlökssås',
        price: '90 SEK'
      }]
    }],
    modified: new Date().toISOString()
  };
}
