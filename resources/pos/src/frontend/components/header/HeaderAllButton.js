import React, {useState} from 'react';
import {Nav, Col} from 'react-bootstrap-v5';
import PosCalculator from './PosCalculator';

const HeaderAllButton = (props) => {
    const {setOpneCalculator, opneCalculator, goToDetailScreen} = props
    const [isFullscreen, setIsFullscreen] = useState(false);
    const fullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    const opneCalculatorModel = () => {
        if(opneCalculator){
            setOpneCalculator(false)
        } else {
            setOpneCalculator(true)
        }
    }
    return (
        <>
        <Nav className='align-items-center header-btn-grp justify-content-end flex-nowrap mb-3 mb-sm-0'>
            <Nav.Item className='d-flex align-items-center justify-content-center ms-3 nav-green'>
                <Nav.Link className='pe-0 ps-1 text-white' onClick={(e) => {
                            e.stopPropagation();
                            goToDetailScreen()
                        }}>
                    <i className="bi bi-bag fa-2x"/>
                </Nav.Link>
            </Nav.Item>
            {/*full screen icon*/}
            <Nav.Item className='ms-3 d-flex align-items-center justify-content-center'>
                {isFullscreen === true ?
                    <i className="bi bi-fullscreen-exit cursor-pointer text-white fs-1"
                       onClick={() => fullScreen()}/>
                    :
                    <i className="bi bi-arrows-fullscreen cursor-pointer text-white con fs-1"
                       onClick={() => fullScreen()}/>
                }
            </Nav.Item>
            {/* {Calculator} */}
            <Nav.Item className='d-flex align-items-center justify-content-center ms-3'>
                <i class="bi bi-calculator cursor-pointer text-white fa-2x"
                   onClick={opneCalculatorModel}/>
            </Nav.Item>
            {/*{dashboard redirect icon}*/}
            <Nav.Item className='d-flex align-items-center justify-content-center ms-3'>
                <Nav.Link href='/#/' className='pe-0 ps-1 text-white'>
                    <i className="bi bi-speedometer2 cursor-pointer fa-2x"/>
                </Nav.Link>
            </Nav.Item>
        </Nav>
        {opneCalculator && <PosCalculator />}
        </>

    )
};

export default HeaderAllButton;
