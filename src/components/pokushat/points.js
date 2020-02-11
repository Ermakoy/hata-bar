import wretch from 'wretch';

const rawCoords = [
  { adress: 'Санкт-Петербург, ул. Казанская, 10', title: 'Кафе «Samadeva»' },
  {
    adress: 'Санкт-Петербург, ул. Думская ул. 5/22, кв. 68',
    title: 'Кафе «Дядя Фади»',
  },
  {
    adress: 'Cанкт-Петербург, Большая Морская, 10',
    title: 'Вегетарианское кафе БРАТ',
  },
  {
    adress: 'Санкт-Петербург, ул.Марата д.74',
    title: 'Lazy Vegan',
    description: 'Вход через арку, код 239#',
  },
  {
    adress: 'Санкт-Петербург, Лиговский проспект, 50',
    title: 'Veggie box food&bakery',
  },
  {
    title: 'Ресторан «RA Family»',
    adress: 'Санкт-Петербург, Кузнечный пер. 6',
  },
  { title: '"Кафе-бистро"', adress: 'Санкт-Петербург, улица Марата, 23' },
  {
    title: 'Индийское вегетарианское кафе ЛАОР',
    adress: 'Санкт-Петербург, Прачечный пер. д.10',
  },
  {
    title: 'БобКульт',
    adress: 'Санкт-Петербург, 7-ая линия В.О, д.40',
  },
  {
    title: 'Кафе & Арт пространство «Ауровилль»',
    adress: 'ул.Радищева 5',
  },
];

export const getVegagoPlaces = () =>
  wretch('https://vegago.ru/cafe/')
    .options({ credentials: 'include', mode: 'cors' })
    .query({ ymJSON: 1 })
    .get()
    .json();

const baseRequest = wretch('https://geocode-maps.yandex.ru/1.x/').query({
  apikey: 'a37ce737-cfc2-4b5c-b93a-a0b0b21800cd',
  format: 'json',
});

const getCoords = () =>
  Promise.all(
    rawCoords.map(place =>
      baseRequest
        .query({ geocode: place.adress })
        .get()
        .json()
        .then(({ response }) =>
          response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
            ' '
          )
        )
        .then(([longitude, latitude]) => ({
          ...place,
          coords: {
            latitude: Number(latitude),
            longitude: Number(longitude),
          },
        }))
    )
  );

export default getCoords;
