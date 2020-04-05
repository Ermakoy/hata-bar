import React from 'react';
import getCoords from './points';
import VEGAGO from './VEGAGO';
import { Button } from 'rendition';
import findNearest from 'geolib/es/findNearest';

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
      getCoords().then((places) => !this.state.places && this.setState({ places }));
  };

  handleApiAvaliable = (ymaps) => {
    // this.setCoords();
    this.ymaps = ymaps;
    this.setState({ ...this.state, ready: true });
  };

  findQushat = async () => {
    const {
      geoObjects: {
        position: [latitude, longitude],
      },
    } = await this.ymaps.geolocation.get();

    const destination = findNearest(
      { latitude, longitude },
      this.state.vegagoPoints.map(({ geometry: { coordinates: [latitude, longitude] } }) => ({
        latitude,
        longitude,
      }))
    );

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
    const { mapState, vegagoPoints, ready } = this.state;
    return (
      <div className="App">
        <div className="layer">
          <div style={{height:"70vh", width:"100%"}}>
            <YMaps query={{ apikey: 'a37ce737-cfc2-4b5c-b93a-a0b0b21800cd' }}>
            <Map
              state={mapState}
              instanceRef={(ref) => (this.map = ref)}
              height="70vh"
              width="100%"
              onLoad={this.handleApiAvaliable}
              modules={['geolocation', 'multiRouter.MultiRoute']}
            >
              <Clusterer options={{ preset: 'islands#darkGreenClusterIcons' }}>
                {vegagoPoints
                  .map((point) => ({ ...point, key: point.properties.balloonContent }))
                  .map(Placemark)}
              </Clusterer>
            </Map>
          </YMaps>
          </div>
          <Button disabled={!ready} my={1} primary emphasized onClick={this.findQushat}>
            Кушац
          </Button>
        </div>
      </div>
    );
  }
}
