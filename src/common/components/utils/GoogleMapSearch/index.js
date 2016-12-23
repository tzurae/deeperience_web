import React, { PropTypes } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps/lib'
import SearchBox from 'react-google-maps/lib/places/SearchBox'
import styles from './styles.scss'

class GoogleMapSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bounds: null,
      center: {
        lat: 24.7859146,
        lng: 120.996735,
      },
    }

    this.handleBoundsChanged = ::this.handleBoundsChanged
    this.handlePlacesChanged = ::this.handlePlacesChanged
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this.map.getBounds(),
      center: this.map.getCenter(),
    })
  }

  handlePlacesChanged() {
    const markers = this.searchBox.getPlaces()

    if (markers.length > 0) {
      this.setState({
        center: markers[0].geometry.location,
      })
      this.props.onChangeMarkers(this.convertPlace2Data(markers[0]))
    }
  }

  convertPlace2Data(place) {
    return {
      name: place.name,
      address: place.formatted_address,
      website: place.website,
      phone: place.international_phone_number,
      placeId: place.place_id,
      position: place.geometry.location,
      openPeriod:
        place.opening_hours &&
        place.opening_hours.periods  ?
          place.opening_hours.periods
            .map(({ close, open }) => ({
              close: {
                time: close.time,
                day: close.day,
              },
              open: {
                time: open.time,
                day: open.day,
              },
            })) :
          null,
      types: place.types,
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <GoogleMapSearchHOR
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          center={this.state.center}
          onMapMounted={map => { this.map = map }}
          onBoundsChanged={this.handleBoundsChanged}
          onSearchBoxMounted={searchBox => { this.searchBox = searchBox }}
          bounds={this.state.bounds}
          onPlacesChanged={this.handlePlacesChanged}
          markers={this.props.markers}
        />
      </div>
    )
  }
}

GoogleMapSearch.propTypes = {
  className: PropTypes.string,
  // markers: PropTypes.array.isRequired,
  onChangeMarkers: PropTypes.func.isRequired,
}

const GoogleMapSearchHOR = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      controlPosition={1} // google.maps.ControlPosition.TOP_LEFT
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Search..."
      inputClassName={styles.input}
    />
    {props.markers.map((marker, index) => (
      <Marker position={marker.position} key={index} />
    ))}
  </GoogleMap>
))

export default GoogleMapSearch
