import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


function Maps() {
  return (
    <div className="h-100 mt-4">
      <center>
      <h4 style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 16}px` }}>Google Maps API</h4>
        <iframe width = "75%" height = "65%" src= "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJlb7tVZiDRoYRJ6E4_nDMyKY&key=AIzaSyDfNjTUiHor5frrxETqjmmRFPlQFbxAkro"></iframe>
      </center>
    </div>
  );
}
export default React.memo(Maps)