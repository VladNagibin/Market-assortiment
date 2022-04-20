import React from 'react'
import Slider from 'react-slick'
import Product from '../stuff/Product'
export default function ProductSlider({ products }) {
    const windowInnerWidth = window.innerWidth
    const slidesToShow = countSlides()
    function countSlides() {
        if (windowInnerWidth > 992) {
            return 3
        } else if (windowInnerWidth > 600) {
            return 2
        } else {
            return 1
        }
    }
    function PrevArrow(props) {
        const { className, style, onClick } = props
        return (
            <div
                className={className}
                style={{ ...style, display: 'block', color: 'blue' }}
                onClick={onClick}
            ><i className="material-icons">chevron_left</i></div>
        )
    }
    function NextArrow(props) {
        const { className, style, onClick } = props
        return (
            //
            <div
                className={className}
                style={{ ...style, display: 'block', color: 'blue' }}
                onClick={onClick}
            ><i className="material-icons">chevron_right</i></div>
        )

    }
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        //autoplay: true,
        nextArrow: <NextArrow />,

        //,

        prevArrow: <PrevArrow />
    }

    return (
        <Slider {...settings}>
            {
                products.map(product => {
                    return (
                        <div key={product._id} className='carousel-card'>
                            <Product product={product} cart={false} />
                        </div>
                        //<a className="carousel-item" href={'#'+product._id} key={product._id}><img src={product.image}/></a>
                    )
                })
            }
        </Slider>
    )
}
