import getDistance from 'geolib/es/getDistance';
import orderByDistance from 'geolib/es/orderByDistance';
import React from 'react';
import {
  YMaps, Map, Placemark, Clusterer,
} from 'react-yandex-maps';
import {
  Button, List, Txt,
} from 'rendition';
import VEGAGO from './VEGAGO';
import getCoords from './points';

export default class App extends React.Component {
  state = {
    mapState: {
      center: [59.935_451_487_626_39, 30.327_131_323_242_163],
      controls: [],
      zoom: 11,
    },
    places: null,
    vegagoPoints: VEGAGO,
  };

  map = null;

  ymaps = null;

  route = null;

  setCoords = () => {
    if (!this.state.places) {
      getCoords().then(
        (places) => !this.state.places && this.setState({places}),
      );
    }
  };

  handleApiAvaliable = (ymaps) => {
    // this.setCoords();
    this.ymaps = ymaps;
    this.setState({...this.state,
      ready: true});
  };

  findQushat = async () => {
    this.setState({isSearching: true});
    const {
      geoObjects: {
        position: [latitude, longitude],
      },
    } = await this.ymaps.geolocation.get();
    this.setState({isSearching: false});
    const nearestPoints = orderByDistance(
      {latitude,
        longitude},
      this.state.vegagoPoints.map(
        ({
          geometry: {
            coordinates: [latitude, longitude],
          },
          ...rest
        }) => ({
          latitude,
          longitude,
          ...rest,
        }),
      ),
    ).slice(0, 3);

    this.setState({nearestPoints,
      userPosition: {latitude,
        longitude}});

    const [destination] = nearestPoints;

    const route = new this.ymaps.multiRouter.MultiRoute(
      {
        params: {
          // Тип маршрутизации - пешеходная маршрутизация.
          routingMode: 'pedestrian',
        },
        referencePoints: [
          [latitude, longitude],
          [destination.latitude, destination.longitude],
        ],
      },
      {
        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        boundsAutoApply: true,
      },
    );

    this.route = route;
    this.map.geoObjects.add(route);
  };

  render () {
    const {
      mapState,
      vegagoPoints,
      nearestPoints,
      userPosition,
      isSearching,
    } = this.state;

    return (
      <div className='App'>
        <div className='layer'>
          <div style={{height: '70vh',
            width: '100%'}}>
            <YMaps query={{apikey: 'a37ce737-cfc2-4b5c-b93a-a0b0b21800cd'}}>
              <Map
                height='70vh'
                instanceRef={(ref) => this.map = ref}
                modules={['geolocation', 'multiRouter.MultiRoute']}
                onLoad={this.handleApiAvaliable}
                state={mapState}
                width='100%'
              >
                <Clusterer
                  options={{preset: 'islands#darkGreenClusterIcons'}}
                >
                  {vegagoPoints
                    .map((point) => ({
                      ...point,
                      key: point.properties.balloonContent,
                    }))
                    .map(Placemark)}
                </Clusterer>
              </Map>
            </YMaps>
          </div>
          <Button
            disabled={isSearching}
            emphasized
            my={1}
            onClick={this.findQushat}
            primary
          >
            {isSearching ? 'Ищем' : 'Кушац'}
          </Button>
          {nearestPoints &&
          <>
            <Txt>Ближайшие к вам заведения:</Txt>
            <List m={1} ordered>
              {nearestPoints.map((place) => <Txt>
                <div
                  dangerouslySetInnerHTML={{
                    __html: place.properties.balloonContent,
                  }}
                />
                <Txt>
                  {[getDistance(userPosition, place, 10)].map((distance) => (distance > 1_000
                        ? distance / 1_000 + ' километров' :
                          distance + ' метров'),)}{' '}
                  от вас
                </Txt>
              </Txt>)}
            </List>
          </>}
        </div>
      </div>
    );
  }
}
