import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PrimaryBtn from '@/components/PrimaryBtn';
import { NextPage } from 'next';


type ActiveView = "profile" | "profile-new"; 


const ProfilePage: NextPage = () => {
  
  const [view, setView] = useState<ActiveView>("profile");
  const [userValue, setUserValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordNewValue, setPasswordNewValue] = useState("");
  const [nameValue, setNameValue] = useState<string>("");
  const [surnameValue, setSurnameValue] = useState<string>("");;
  const [addressValue, setAddressValue] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState<string>("");


  const handleChangeView = () => {
    setView(view === 'profile' ? 'profile-new' : 'profile');
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue(event.target.value);
    localStorage.setItem("userValue", event.target.value) ;
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
    localStorage.setItem("passwordValue", event.target.value) ;
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(event.target.value);
    localStorage.setItem("nameValue", event.target.value) ;
  };
  
  const handleChangeSurname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurnameValue(event.target.value);
    localStorage.setItem("surnameValue", event.target.value) ;
  };
  
  const handleChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressValue(event.target.value);
    localStorage.setItem("addressValue", event.target.value) ;
  };
  
  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneValue(event.target.value);
    localStorage.setItem("phoneValue", event.target.value) ;
  };
  const handleChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordNewValue(event.target.value);
    localStorage.setItem("passwordNewValue", event.target.value) ;
    localStorage.setItem("passwordValue", event.target.value) ;
  };


  return (
    <>
    <Head>
      <title>Igralishte - Profile Page</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    {view === "profile" ? 

      <form className="d-flex flex-column justify-content-center">
          <div className='container-fluid mt-5 text-center'>
            <div className='row d-flex flex-column justify-content-center'>
              <div className='col-12 mt-5'>
                <Link href={"/"}><img src="../pictures/icons/Logo Igralishte final version.png" alt="logo-igralishte" /></Link>
                <div className='col-12 mt-5 mb-3 text-center'>
                  <img src="../pictures/Profile-picture.png" alt="profile picture" />
                  </div>
                  <div className='col-12 mb-3 text-center'>
                  <button className='btnProfilePicture small p-0 px-2 border-0'>Одбери слика</button>
                </div>
              </div>
              <div className='mb-3 col-11 px-4 text-left mr-auto ml-auto'>
              <div className='d-flex flex-column justify-content-left'>
                <label htmlFor="name">Име</label>
                <input type="text" id="name" className="PrimaryBtn form-input" placeholder="Ивана" value={nameValue} onChange={handleChangeName}/>
              </div>
              <div className='d-flex flex-column justify-content-left'>
                <label htmlFor="surname">Презиме</label>
                <input type="text" id="surname" className="PrimaryBtn form-input" placeholder="Голабоска" value={surnameValue} onChange={handleChangeSurname}/>
              </div>
              <div className='d-flex flex-column justify-content-left'>
                <label htmlFor="username">Email адреса</label>
                <input type="email" id="username" className="PrimaryBtn form-input" placeholder="igralishte@hotmail.com" value={userValue} onChange={handleChangeUser}/>
              </div>
              <div className='d-flex flex-column justify-content-left'>
              <label htmlFor="password">Лозинка</label>
              <input type="password" id="password" className="PrimaryBtn form-input" placeholder="12345" value={passwordValue} onChange={handleChangePassword} /> 
              </div>
              <div className='d-flex flex-column justify-content-left'>
              <button onClick={handleChangeView} className='bg-transparent border-0 p-2 text-left'><p style={{color: "#8A8328", textDecoration: "underline"}} >Промени лозинката</p></button>

                <label htmlFor="address">Адреса</label>
                <input type="text" id="address" className="PrimaryBtn form-input" placeholder="Скопје" value={addressValue} onChange={handleChangeAddress}/>
              </div>
              <div className='d-flex flex-column justify-content-left'>
                <label htmlFor="phone">Телефонски број</label>
                <input type="text" id="phone" className="PrimaryBtn form-input" placeholder="070/000-000" value={phoneValue} onChange={handleChangePhone}/>
              </div>
              <div className='d-flex flex-column justify-content-left'>
                <label htmlFor="biography">Биографија</label>
                <input type="textarea" id="biography" className="PrimaryBtn w-100 p-3 text-left" style={{fontWeight: "lighter", height: "80px" }} placeholder="Нешто за мене"/>
              </div>
               <div className="input-group my-3">
                  <div className="input-group-prepend d-flex justify-content-between align-items-center">
                    <div className="input-group-text border-0 bg-transparent px-1 mr-2">
                      <input type="checkbox" aria-label="Checkbox for following text input" checked/>
                    </div>
                    <div><p style={{fontSize: "10px", fontFamily: "Inter"}} className="p-0">Испраќај ми известувања за нови зделки и промоции.</p></div>
                  </div>
                </div>
                <Link href="/"><PrimaryBtn title="Зачувај" btnClass={"PrimaryBtn w-75"} backgroundColor={"black"} color='white' height={"40px"} border='none'/></Link>
                </div>
              </div>
            </div>
        </form>
         : null}

      {view === "profile-new" ? 
        
        <form className="flex-column justify-content-center">
          <div className='container-fluid mt-5 text-center'>
            <div className='row flex-column justify-content-center'>
              <div className='col-11 mr-auto ml-auto mt-5'>
                <Link href={"/"}><img src="../pictures/icons/Logo Igralishte final version.png" alt="logo-igralishte" /></Link>
                <div className='text-left'>
                 <div className='flex-column justify-content-left mt-5 mb-2'>
                  <label htmlFor="old-password">Стара лозинка</label>
                  <input type="password" id="old-password" className="PrimaryBtn form-input" placeholder="********" value={passwordValue} onChange={handleChangePassword} /> 
                  </div>
                  <div className='flex-column justify-content-left mb-2'>
                  <label htmlFor="new-password">Нова лозинка</label>
                  <input type="password" id="new-password" className="PrimaryBtn form-input" placeholder="********" value={passwordNewValue} onChange={handleChangeNewPassword} /> 
                  </div>
                  <div className='flex-column justify-content-left'>
                  <label htmlFor="conf-new-password">Повтори нова лозинка</label>
                  <input type="password" id="conf-new-password" className="PrimaryBtn form-input" placeholder="********" value={passwordNewValue} onChange={handleChangeNewPassword} /> 
                  </div>              
                 <PrimaryBtn  onClick={handleChangeView} title="Зачувај" btnClass={"PrimaryBtn w-75 mt-4"} backgroundColor={"black"} color='white' height={"40px"} border='none' />
                  </div>
              </div>
            </div>
          </div>
      </form> : null}
      </>
    );

}

export default ProfilePage;
