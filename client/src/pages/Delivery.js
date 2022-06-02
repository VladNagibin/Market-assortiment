import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export default function Delivery() {
  const [userData, setUserData] = useState({
    street: '',
    privateHouse: false,
    flat: '',
    intercom: '',
    enterance: '',
    floor: '',
    comm: '',
    buyer_status: 'individual',
    fio: '',
    email: '',
    phone: ''

  })
  const message = useMessage()
  const auth = useContext(AuthContext)
  const {request,loading} = useHttp()
  const changeForm = event => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }
  async function createOrder(){
    var data = await request('/api/createOrder','POST',{
      userId:auth.userId,
      userData:userData,
      products:auth.cart
    })
    if(data.message =='success'){
      message('Заказ создан')
      auth.cart=[]
    }else{
      message('Произошла ошибка')
    }
  }

  function setPrivateHouse(){
    if(userData.privateHouse){
      setUserData({...userData,privateHouse:false})
    }else{
      setUserData({...userData,privateHouse:true}) 
    }
  }
  return (
    <div className='container'>
      <div className='delivery-address'>
        <span className='delivery-header'>Оформление заказа</span>
        <div className='delivery-order-block row'>
          <div className='col s5'>
            <form>
              <input id="street" name='street' type="search" placeholder='Город, улица, дом' required onChange={changeForm} value={userData.street} />
              <div className='delivery-address-info'>
                <div className='row delivery-span'>
                  <div className='col s4 '>
                    <span className=''>Частный дом</span>
                  </div>
                  <div className='col s4 offset-s4'>
                    <div className="switch">
                      <label>
                        <input type="checkbox" checked={userData.privateHouse} name='privateHouse' onChange={setPrivateHouse} />
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
                    <input id="intercom" name='intercom' type="search" placeholder='Домофон' required onChange={changeForm} value={userData.intercom} />
                  </div>
                </div>
                <div className='row'>
                  <div className='col s6 delivery-input'>
                    <input id="enterance" name='enterance' type="search" placeholder='Подъезд' required onChange={changeForm} value={userData.enterance} />
                  </div>
                  <div className='col s6 delivery-input'>
                    <input id="floor" name='floor' type="search" placeholder='Этаж' required onChange={changeForm} value={userData.floor} />
                  </div>
                </div>
              </div>
              <div className='delivery-comment'>
                <textarea name='comm' placeholder='Комментарий' onChange={changeForm} value={userData.comm} className='delivery-comment-textarea' />
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
      <div className='delivery-address'>
        <span className='delivery-header'>Кому доставим</span>
        <div className='delivery-order-block'>
          <div className='row'>
            <div className="form_radio_btn">
              <input id="radio-1" type="radio" name="buyer_status" checked={userData.buyer_status == 'individual' ? true : false} onChange={changeForm} value='individual' />
              <label htmlFor="radio-1">Физ. лицо</label>
            </div>

            <div className="form_radio_btn">
              <input id="radio-2" type="radio" name="buyer_status" checked={userData.buyer_status == 'entity' ? true : false} onChange={changeForm} value='entity' />
              <label htmlFor="radio-2">Юр. лицо</label>
            </div>
            <div className='row delivery-whom-data'>
              <div className="col s4">
                <div className='delivery-whom-inputs'>
                  <input id="fio" name='fio' type="text" placeholder='Фамилия и имя' value={userData.fio} onChange={changeForm} />
                </div>

              </div>
              <div className='col s4'>
                <div className="delivery-whom-inputs">
                  <input id="phone" name='phone' type="text" placeholder='Номер телефона' value={userData.phone} onChange={changeForm} />
                </div>
              </div>
              <div className='col s4'>
                <div className="delivery-whom-inputs">
                  <input id="email" name='email' type="text"  placeholder='E-mail' value={userData.email} onChange={changeForm} />
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col s8 delivery-whom-footer'>
              Нажимая кнопку «Подтвердить заказ», вы подтверждаете выбранный способ доставки и оплаты, ознакомились и согласны со всеми условиями покупки товаров на данном сайте, в том числе, но не ограничиваясь, со всей информацией в разделах «Клиентам» и «Помощь покупателям», принимаете соглашение на обработку персональных данных, соглашаетесь на использование простой электронной подписи при получении товара, а также соглашаетесь на получение новинок и акций.
              </div>    
              <div className='col s4'>
                <div className='delivery-whom-button' onClick={createOrder}>
                  <a className='delivery-whom-button-text'>Перейти к оплате</a>
                </div>

              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}
