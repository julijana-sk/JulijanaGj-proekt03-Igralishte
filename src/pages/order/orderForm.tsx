import Link from 'next/link';
import React, { useState } from 'react'
import PrimaryBtn from '@/components/PrimaryBtn';
import { useRouter } from 'next/router';
import OrderAlert from '@/components/OrderAlert';
import { NextPage } from 'next';


const OrderForm: NextPage = () => {

  const router = useRouter();
  const [userValue, setUserValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [nameValue, setNameValue] = useState<string>("");
  const [surnameValue, setSurnameValue] = useState<string>("");;
  const [addressValue, setAddressValue] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [confirmationPopUp, setConfirmationPopUp] = useState('d-none');
  const [isConfirmationVisible, setisConfirmationVisible] = useState<boolean>(false);

  function handleOrderConfirmation() {
        setisConfirmationVisible(!isConfirmationVisible);
        setConfirmationPopUp('d-flex');
    }
   
  function handleCloseBtn () {
      router.push({
      pathname: "/order",
      });
    }

  function autoFillForm () {
    const user = localStorage.getItem("userValue") ?? "";
    const password = localStorage.getItem("passwordValue") ?? "";
    const name = localStorage.getItem("nameValue") ?? "";
    const surname = localStorage.getItem("surnameValue") ?? "";
    const address = localStorage.getItem("addressValue") ?? "";
    const phone = localStorage.getItem("phoneValue") ?? "";
      setUserValue(user);
      setPasswordValue(password);
      setNameValue(name);
      setSurnameValue(surname);
      setAddressValue(address);
      setPhoneValue(phone);
  }

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue(event.target.value);
    localStorage.setItem("userValue", event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
    localStorage.setItem("passwordValue", event.target.value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
    localStorage.setItem("nameValue", event.target.value);
  };
  
  const handleChangeSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurnameValue(event.target.value);
    localStorage.setItem("surnameValue", event.target.value);
  };
  
  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(event.target.value);
    localStorage.setItem("addressValue", event.target.value);
  };
  
  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(event.target.value);
    localStorage.setItem("phoneValue", event.target.value);
  };

return (
    <div>
      {isConfirmationVisible && ( <OrderAlert /> ) }
        <form className="d-flex flex-column justify-content-center"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleOrderConfirmation()
          }}>

          <div className='container-fluid mt-5 text-center'>
            <div className='row d-flex flex-column justify-content-center'>
              <div className='col-11 mr-auto ml-auto'>
                <div className='close-btn'><img src="../../pictures/icons/close-btn.png" alt="minus" onClick={handleCloseBtn}/></div>
                <img src="../pictures/icons/sparks-elements.png" alt="sparks" className='mt-5'/>
                <h2 className='mt-3' style={{fontSize: '20px'}}>Ве молиме внесете ги потребните информации</h2>
                <div className="flex-row justify-content-start align-items-center pl-1 ml-2">
                    <p><input type='checkbox' onClick={autoFillForm} className='my-4 mr-1'/>вметни ги информациите од мојот профил</p>
                </div>
              </div>
              <div className='mb-3 col-11 px-4 text-left mr-auto ml-auto'>
              <div className='d-flex flex-column justify-content-left mb-3'>
                <label htmlFor="name">Име<span className='text-red'>*</span></label>
                <input type="text" id="name" className="PrimaryBtn form-input" placeholder="Ивана" value={nameValue} onChange={handleChangeName}/>
              </div>
              <div className='d-flex flex-column justify-content-left mb-3'>
                <label htmlFor="surname">Презиме<span className='text-red'>*</span></label>
                <input type="text" id="surname" className="PrimaryBtn form-input" placeholder="Голабоска" value={surnameValue} onChange={handleChangeSurname}/>
              </div>
              <div className='d-flex flex-column justify-content-left mb-3'>
                <label htmlFor="address">Адреса<span className='text-red'>*</span></label>
                <input type="text" id="address" className="PrimaryBtn form-input" placeholder="example@example.com" value={addressValue} onChange={handleChangeAddress}/>
              </div>
              <div className='d-flex flex-column justify-content-left mb-3'>
                <label htmlFor="phone">Телефонски број<span className='text-red'>*</span></label>
                <input type="text" id="phone" className="PrimaryBtn form-input" placeholder="example@example.com" value={phoneValue} onChange={handleChangePhone}/>
              </div>
              <div className='d-flex flex-column justify-content-left mb-5'>
                <label htmlFor="username">Email адреса<span className='text-red'>*</span></label>
                <input type="email" id="username" className="PrimaryBtn form-input" placeholder="example@example.com" value={userValue} onChange={handleChangeUser}/>
              </div>
               <div className="input-group mt-3">
                  <div className="input-group-prepend d-flex justify-content-between align-items-baseline">
                    <div className="input-group-text border-0 bg-transparent px-1 pt-2 mr-2">
                      <input type="checkbox" aria-label="Checkbox for following text input"/>
                    </div>
                    <p style={{color: 'darkgrey'}} className="about-text p-0 align-self-center">сакам да добивам новости за идни попусти, нови колекции и промоции на мојата емаил адреса.</p>
                  </div>
                </div>
                <div className="flex-row justify-content-start align-items-center my-5">
                <div className='col-12 p-0'>
                  <PrimaryBtn title="Нарачај" onClick={handleOrderConfirmation} btnClass={"PrimaryBtn w-75 mr-2 btn-gold btn-gold-text"} backgroundColor={"btn-gold"} color='black' border='none' height="51px"/>
                   <Link href={'/order'} className='border-0 bg-transparent w-50'><u>Откажи</u></Link>
                </div>  
              </div>
            </div>
           </div>
         </div>
       </form>
    </div>
  )
}

export default OrderForm;