import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps/lib'
import SearchBox from 'react-google-maps/lib/places/SearchBox'
import styles from './styles.scss'

class GoogleMapSearch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bounds: null,
      center: {
        lat: 47.6205588,
        lng: -122.3212725,
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
    const places = this.searchBox.getPlaces()

    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }))

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center

    this.setState({
      center: mapCenter,
    })
  }

  render() {
    return (
      <div className={this.props.className}>
        <GoogleMapSearchHOR
          containerElement={<div style={{ height: '100%' }} />}
          mapElement={<div style={{ height: '100%' }} />}
          center={this.state.center}
          onMapMounted={map => this.map = map}
          onBoundsChanged={this.handleBoundsChanged}
          onSearchBoxMounted={searchBox => this.searchBox = searchBox}
          bounds={this.state.bounds}
          onPlacesChanged={this.handlePlacesChanged}
          markers={this.props.markers}
        />
      </div>
    )
  }
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
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="請輸入地點"
      inputClassName={styles.input}
    />
    {props.markers.map((marker, index) => (
      <Marker position={marker.position} key={index} />
    ))}
  </GoogleMap>
))

export default GoogleMapSearch
