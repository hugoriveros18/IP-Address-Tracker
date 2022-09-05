import './App.css';
import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import { LocationMarker } from './LeafletGeneral/LeafletGeneral';
import { LocationInformation } from './LocationInformation/LocationInformation';
import iconArrow from './app-images/icon-arrow.svg';



function App() {
  
  //STATES
  const [inputIpAddress,setInputIpAddress] = React.useState("");
  const [requestResponse,setRequestResponse] = React.useState("start"); //start,success,private range,reserved range,invalid query
  const [requetsResponseInformation,setRequetsResponseInformation] = React.useState([]);
  const [currentCoordinates, setCurrentCoordinates] = React.useState([34.0648,-118.086])
  
  //FUNCTIONS
  const setNewIpAddress = (e) => {
    setInputIpAddress(e.target.value);
  }
  const sendRequest = () => {
    if(inputIpAddress !== "") {
      const API = `http://ip-api.com/json/${inputIpAddress}`;
      fetch(API)
        .then(result => result.json())
        .then((info) => {
          if(info.status === 'success'){
            setRequestResponse(info.status);
            setRequetsResponseInformation([info.query,`${info.city}, ${info.region} ${info.zip}`,info.timezone.replace("_"," "),info.isp]);
            setCurrentCoordinates([info.lat,info.lon]);
            
          } else {
            setRequestResponse(info.message);
            setRequetsResponseInformation(inputIpAddress)
          }
        })
    }
    setInputIpAddress("");
  }


  return (
    <>
      {/* HEADER */}
      <header className='header-container'>
        <div className='header-title-container'>
          <p>IP Address Tracker</p>
        </div>
        <div className='ip-input-container'>
          <input type="text" placeholder="Enter an IP address..." onChange={setNewIpAddress} value={inputIpAddress}/>
          <div className='search-button-container' onClick={sendRequest}>
            <figure>
              <img src={iconArrow} alt='search button'/>
            </figure>
          </div>
        </div>
      </header>

      {/* MAP   */}
      <MapContainer center={currentCoordinates} zoom={16} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position='bottomleft'/>
        <LocationMarker currentCoordinates={currentCoordinates} />
      </MapContainer>

      {/* LOCATION INFORMATION */}
      <LocationInformation requestResponse={requestResponse} requetsResponseInformation={requetsResponseInformation}/>
    </>
  );
}

export default App;
