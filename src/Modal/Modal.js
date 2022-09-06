import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

function Modal() {
    const [modal,setModal] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => {
            setModal(true)
        },2000)
    },[])

    return ReactDOM.createPortal(
        <div className={`modal_container ${modal && 'modal-display-none'}`}>
            <lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_bl6hbsil.json"  background="transparent"  speed="1.5"  style={{width: "100%", height: "100%"}}  loop autoplay></lottie-player>
        </div>
      ,document.getElementById('modal')
    )
}

export { Modal };