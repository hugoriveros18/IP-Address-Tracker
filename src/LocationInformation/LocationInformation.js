import './LocationInformation.css';
import React from 'react';
import errorIcon from '../app-images/icon-error.png';
import iconWarning from '../app-images/icon-warning.png'

function LocationInformation({requestResponse,requetsResponseInformation}) {
  
    return(
        <div className='location-general-container'>
            <div className={`location-information-container ${(requestResponse === "private range" || requestResponse === "reserved range" || requestResponse === "invalid query") && 'error-location-container'}`}>
                {(requestResponse === "start" && window.innerWidth < 1200) && 
                    <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_b1imuadj.json"  background="transparent"  speed="2"  style={{width:"450px", height:"450px"}} loop autoplay></lottie-player>
                }
                {(requestResponse === "start" && window.innerWidth >= 1200) && 
                    <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_b1imuadj.json"  background="transparent"  speed="2"  style={{width:"250px", height:"250px"}} loop autoplay></lottie-player>
                }
                {requestResponse === "success" &&
                <>
                    <div className='information-box border-right'>
                        <p className='box-title'>IP ADDRESS</p>
                        <p className='box-description'>{requetsResponseInformation[0]}</p>
                    </div>
                    <div className='information-box border-right'>
                        <p className='box-title'>LOCATION</p>
                        <p className='box-description'>{requetsResponseInformation[1]}</p>
                    </div>
                    <div className='information-box border-right'>
                        <p className='box-title'>TIMEZONE</p>
                        <p className='box-description'>{requetsResponseInformation[2]}</p>
                    </div>
                    <div className='information-box'>
                        <p className='box-title'>ISP</p>
                        <p className='box-description'>{requetsResponseInformation[3]}</p>
                    </div>
                </> 
                }
                {(requestResponse === "private range" || requestResponse === "reserved range") &&
                <>
                    {window.innerWidth < 1200 && 
                    <div className='error-icon-container'>
                        <img src={iconWarning} alt="error icon"/>
                    </div>
                    }
                    <div className='error-text-container'>
                        <p>You have entered reserved IP Address {requetsResponseInformation} for private internet use and IP lookup for these will return not results, try with a public IP Address.</p>
                    </div>
                </>
                }
                {requestResponse === "invalid query" &&
                <>
                    {window.innerWidth < 1200 && 
                    <div className='error-icon-container'>
                        <img src={errorIcon} alt="error icon"/>
                    </div>
                    }
                    <div className='error-text-container'>
                        <p>You have entered invalid IP address, not existed domain or registered domain that is still not set up. Please enter valid domain.</p>
                    </div>
                </>
                }
            </div>
      </div>
    );
}

export { LocationInformation };