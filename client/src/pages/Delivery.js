import React, { useState } from 'react'

export default function Delivery({ products }) {
  const [userData, setUserData] = useState({
    street:'',
    privateHouse:false,
    flat:null,
    intercom:null,
    enterance:null,
    floor:null,
    comm:''

  })
  const changeForm = event=>{
    setUserData({...userData,[event.target.name]:event.target.value})
  } 
  return (
    <div className='container'>
      <div className=''>
        <span className='delivery-header'>Оформление заказа</span>
        <div className='delivery-order-block row'>
          <div className='col s5'>
            <form>
              <input id="street" name = 'street' type="search" placeholder='Город, улица, дом' required onChange={changeForm} value={userData.street} />
              <div className='delivery-address-info'>
                <div className='row delivery-span'>
                  <div className='col s4 '>
                    <span className=''>Частный дом</span>
                  </div>
                  <div className='col s4 offset-s4'>
                    <div className="switch">
                      <label>
                        <input type="checkbox" value={userData.privateHouse} onChange={changeForm}/>
                        <span className="lever"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col s6 delivery-input'>
                    <input id="flat" name='flat' type="search" placeholder='Квартира' required onChange={changeForm} value={userData.flat} />
                  </div>
                  <div className='col s6 delivery-input'>
                    <input id="intercom" name='intercom' type="search" placeholder='Домофон' required onChange={changeForm} value={userData.intercom}/>
                  </div>
                </div>
                <div className='row'>
                  <div className='col s6 delivery-input'>
                    <input id="enterance" name='enterance' type="search" placeholder='Подъезд' required onChange={changeForm} value={userData.enterance}/>
                  </div>
                  <div className='col s6 delivery-input'>
                    <input id="floor" name='floor' type="search" placeholder='Этаж' required onChange={changeForm} value={userData.floor} />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className='col s7'>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <a href="https://yandex.ru/maps/org/super_burger/194764209658/?utm_med.." style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '0px' }}>Super burger</a>
              <a href="https://yandex.ru/maps/66/omsk/category/fast_food/184106386/?.." style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '14px' }}>Быстрое питание в Омске</a>
              <a href="https://yandex.ru/maps/66/omsk/category/pub_bar/184106384/?ut.." style={{ color: '#eee', fontSize: '12px', position: 'absolute', top: '28px' }}>Бар, паб в Омске</a>
              <iframe src="https://yandex.ru/map-widget/v1/-/CCUFi2TsxC" width="560" height="400" frameBorder="1" allowFullScreen={true} style={{ position: 'relative' }}></iframe></div>
          </div>
        </div>
      </div>
    </div>
  )
}
