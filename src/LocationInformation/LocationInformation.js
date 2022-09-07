import './LocationInformation.css';
import React from 'react';
import errorIcon from '../app-images/icon-error.png';
import iconWarning from '../app-images/icon-warning.png'

function LocationInformation({requestResponse,requetsResponseInformation}) {

    const [loading,setLoading] = React.useState(false);
    const [responseStatus,setResponseStatus] = React.useState(requestResponse[0]);
    const [isMounted,setIsMounted] = React.useState(false);

    React.useEffect(() => {
        if(isMounted) {
            setResponseStatus("");
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setResponseStatus(requestResponse[0]);
            },2500)
        } else {
            setIsMounted(true);
        }
    },[requestResponse])
  
    return(
        <div className='location-general-container'>
            <div className={`location-information-container ${(requestResponse[0] === "private range" || requestResponse[0] === "reserved range" || requestResponse[0] === "invalid query") && 'error-location-container'}`}>

                {/* REQUETS RESPONSE LOADING */}
                {loading &&
                    <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_p8bfn5to.json"  background="transparent"  speed="1.5"  style={{width: "100%", height: "100%"}}  loop autoplay></lottie-player>
                }
                {/* REQUEST RESPONSE SUCCESS */}
                {responseStatus === "success" &&
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

                {/* REQUEST RESPONSE PRIVATE */}
                {responseStatus === "private range" &&
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

                {/* REQUEST REPONSE INVALID */}
                {responseStatus === "invalid query" &&
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