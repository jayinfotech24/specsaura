import React from 'react'
import { CCarousel, CCarouselCaption, CCarouselItem, CImage } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'

export const CarouselDarkVariantExample = ({ handleSlideChange }) => {


    return (
        <CCarousel controls indicators dark interval={3000} onSlid={(eventKey, direction) => handleSlideChange(eventKey, direction)}>
            {/* Auto-play every 3 seconds (3000ms) */}
            <CCarouselItem>
                <CImage className="d-block w-100" src="/Images/poster.webp" alt="slide 1" />
                {/* <CCarouselCaption className="d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>Some representative placeholder content for the first slide.</p>
                </CCarouselCaption> */}
            </CCarouselItem>

            <CCarouselItem>
                <CImage className="d-block w-100" src="/Images/poster2.webp" alt="slide 2" />
                {/* <CCarouselCaption className="d-none d-md-block">
                    <h5>Second slide label</h5>
                    <p>Some representative placeholder content for the second slide.</p>
                </CCarouselCaption> */}
            </CCarouselItem>
        </CCarousel>
    )
}
