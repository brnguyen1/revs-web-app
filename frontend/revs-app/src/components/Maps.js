function Maps() {
    let map_src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDfNjTUiHor5frrxETqjmmRFPlQFbxAkro&callback=initMap'
    return (
        <div className="maps">
        <script async src={map_src}></script>
        <h1> Im the map</h1>
        </div>
    );
}

export default Maps;