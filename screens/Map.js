import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function Map(props) {

    const [marker, setMarker] = useState([])

    const [location, setLocation] = useState({
        latitude: 65.0800,
        longitude: 25.4800,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    const showMarker = (e) => {
        const coords = e.nativeEvent.coordinate
        setMarker([...marker, { latitude: coords.latitude, longitude: coords.longitude }])
    }

    useEffect(() => {
        (async () => {
            getUserPosition()
        })()
    }, [])


    const getUserPosition = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()

        try {
            if (status !== 'granted') {
                console.log('Geolocation failed')
                return
            }
            const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High })
            setLocation({ ...location, "latitude": position.coords.latitude, "longitude": position.coords.longitude })
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <MapView
            style={styles.map}
            region={location}
            onLongPress={showMarker}>

            {marker.length > 0 &&
                marker.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                    />
                ))
            }
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
})