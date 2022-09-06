import './App.css';
import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import { LocationMarker } from './LeafletGeneral/LeafletGeneral';
import { LocationInformation } from './LocationInformation/LocationInformation';
import { Modal } from './Modal/Modal';
import iconArrow from './app-images/icon-arrow.svg';



function App() {
  
  //STATES
  const [inputIpAddress,setInputIpAddress] = React.useState("");
  const [requestResponse,setRequestResponse] = React.useState("success"); //success,private range,reserved range,invalid query
  const [requetsResponseInformation,setRequetsResponseInformation] = React.useState(["192.212.174.101","Garvey, United States 91770-3713","America/Los Angeles","Southern California Edison"]);
  const [currentCoordinates, setCurrentCoordinates] = React.useState([34.05430,-118.08212])
  
  //FUNCTIONS
  const setNewIpAddress = (e) => {
    setInputIpAddress(e.target.value);
  }
  const sendRequest = () => {
    if(inputIpAddress !== "") {
      const API = `https://api.ipgeolocation.io/ipgeo?apiKey=f0d22b3cfb464a14a9f3994742a3e2f6&ip=${inputIpAddress}`;
      fetch(API)
        .then(result => result.json())
        .then((info) => {
          console.log(info)
          console.log(info.status)
          if(info.message === undefined){
            setRequestResponse("success");
            setRequetsResponseInformation([info.ip,`${info.district === "" ? info.state_prov : info.district}, ${info.country_name} ${info.zipcode}`,info.time_zone.name.replace("_"," "),info.isp]);
            setCurrentCoordinates([info.latitude,info.longitude]);
            
          } else {
            if(info.message === "IP to geolocation lookup for domain or service name is not supported on your free subscription. This feature is available to all paid subscriptions only.") {
              setRequestResponse("invalid query");
            } else {
              setRequestResponse("private range");
              setRequetsResponseInformation(inputIpAddress)
            }
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
      <MapContainer center={currentCoordinates} zoom={14} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position='bottomleft'/>
        <LocationMarker currentCoordinates={currentCoordinates} />
      </MapContainer>

      {/* LOCATION INFORMATION */}
      <LocationInformation requestResponse={requestResponse} requetsResponseInformation={requetsResponseInformation}/>

      {/* MODAL */}
      <Modal/>
    </>
  );
}

export default App;
