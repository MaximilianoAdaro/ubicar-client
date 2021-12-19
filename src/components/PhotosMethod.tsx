const photos = [
  "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aG91c2UlMjBleHRlcmlvcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  "https://media.istockphoto.com/photos/modern-custom-suburban-home-exterior-picture-id1255835529?b=1&k=20&m=1255835529&s=170667a&w=0&h=Z-RskiXf6fx_c0s64LAuCWhmS-cJ5Nli4p7lZtqa7R4=",
  "https://assets.themortgagereports.com/wp-content/uploads/2020/12/Buy-A-Home-With-Low-No-Down-Payment-First-Time-Home-Buyer.jpg",
  "https://cdn-5.urmy.net/images/uploads/HousePlan-Hero-080921-NewPlans-DFD-m.jpg",
  "https://static.onecms.io/wp-content/uploads/sites/37/2016/02/15230656/white-modern-house-curved-patio-archway-c0a4a3b3.jpg",
  "https://cdn.vox-cdn.com/thumbor/frFQQhOsxl8DctGjkR8OLHpdKMs=/0x0:3686x2073/1200x800/filters:focal(1549x743:2137x1331)/cdn.vox-cdn.com/uploads/chorus_image/image/68976842/House_Tour_Liverman_3D6A3138_tour.0.jpg",
  "https://media.istockphoto.com/photos/luxurious-beautiful-modern-villa-with-front-yard-garden-at-sunset-picture-id1283532082?b=1&k=20&m=1283532082&s=170667a&w=0&h=KxQ3cfMs-Xi7FL2TXfrgFbi9pwtBOdjSEc4-ufAeVlo=",
  "https://i.pinimg.com/originals/a1/c7/10/a1c710b599e8b83e74fef1371653987b.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYqRGPTy4Vo1p4KoQuEemxSeQVAK0yELoxQw&usqp=CAU",
  "https://i.ytimg.com/vi/axzlYeeWKWU/maxresdefault.jpg",
  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
];

function getRandomIntInclusive(min: any, max: any) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export const selectPhotos = () => {
  return photos[getRandomIntInclusive(0, photos.length - 1)];
};
