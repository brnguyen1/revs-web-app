import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

/**
 * this is the google api for the google maps, it will show the location of revs and give directions
 *
 * @return will return a google maps showing revs american grill and its address
 */
function Maps() {
  return (
    <div>
      <center>
      <h4 style={{ fontSize: `${parseInt(localStorage.getItem("fontsize")) + 16}px` }}></h4>
        <iframe width = "45%" height = "350" src= "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJlb7tVZiDRoYRJ6E4_nDMyKY&key=AIzaSyDfNjTUiHor5frrxETqjmmRFPlQFbxAkro"></iframe>
      </center>
    </div>
  );
}
export default React.memo(Maps)