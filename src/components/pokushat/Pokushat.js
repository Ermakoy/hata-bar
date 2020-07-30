import React from 'react';
import getCoords from './points';
import VEGAGO from './VEGAGO';
import { Button, List, Txt } from 'rendition';
import orderByDistance from 'geolib/es/orderByDistance';
import getDistance from 'geolib/es/getDistance';

import { YMaps, Map, Placemark, Clusterer } from 'react-yandex-maps';

export default class App extends React.Component {
  state = {
    places: null,
    mapState: {
      center: [59.93545148762639, 30.327131323242163],
      zoom: 11,
      controls: [],
    },
    vegagoPoints: VEGAGO,
  };
  map = null;
  ymaps = null;
  route = null;

  setCoords = () => {
    if (!this.state.places)
      getCoords().then(
        places => !this.state.places && this.setState({ places })
      );
  };

  handleApiAvaliable = ymaps => {
    // this.setCoords();
    this.ymaps = ymaps;
    this.setState({ ...this.state, ready: true });
  };

  findQushat = async () => {
    this.setState({ isSearching: true });
    const {
      geoObjects: {
        position: [latitude, longitude],
      },
    } = await this.ymaps.geolocation.get();
    this.setState({ isSearching: false });
    const nearestPoints = orderByDistance(
      { latitude, longitude },
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
        })
      )
    ).slice(0, 3);

    this.setState({ nearestPoints, userPosition: { latitude, longitude } });

    const [destination] = nearestPoints;

    const route = new this.ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [
          [latitude, longitude],
          [destination.latitude, destination.longitude],
        ],
        params: {
          //Тип маршрутизации - пешеходная маршрутизация.
          routingMode: 'pedestrian',
        },
      },
      {
        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        boundsAutoApply: true,
      }
    );

    this.route = route;
    this.map.geoObjects.add(route);
  };

  render() {
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
          <div style={{ height: '70vh', width: '100%' }}>
            <YMaps query={{ apikey: 'a37ce737-cfc2-4b5c-b93a-a0b0b21800cd' }}>
              <Map
                state={mapState}
                instanceRef={ref => (this.map = ref)}
                height='70vh'
                width='100%'
                onLoad={this.handleApiAvaliable}
                modules={['geolocation', 'multiRouter.MultiRoute']}
              >
                <Clusterer
                  options={{ preset: 'islands#darkGreenClusterIcons' }}
                >
                  {vegagoPoints
                    .map(point => ({
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
            my={1}
            primary
            emphasized
            onClick={this.findQushat}
          >
            {isSearching ? 'Ищем' : 'Кушац'}
          </Button>
          {nearestPoints && (
            <>
              <Txt>Ближайшие к вам заведения:</Txt>
              <List m={1} ordered>
                {nearestPoints.map(place => (
                  <Txt>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: place.properties.balloonContent,
                      }}
                    />
                    <Txt>
                      {[getDistance(userPosition, place, 10)].map(distance =>
                        distance > 1000
                          ? distance / 1000 + ' километров'
                          : distance + ' метров'
                      )}{' '}
                      от вас
                    </Txt>
                  </Txt>
                ))}
              </List>
            </>
          )}
        </div>
      </div>
    );
  }
}
