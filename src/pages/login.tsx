import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import PrimaryBtn from '@/components/PrimaryBtn';
import { useRouter } from 'next/router';
import { NextPage } from 'next';


const LoginPage: NextPage = () => {

 const router = useRouter();
 const [userValue, setUserValue] = useState("");
 const [passwordValue, setPasswordValue] = useState("");

  const handleChangeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserValue(event.target.value);
    localStorage.setItem("userValue", event.target.value) ;

  };
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
    localStorage.setItem("passwordValue", event.target.value) ;

  };

  const handleLogin = () => {
      if (userValue === "igralishte@hotmail.com" && passwordValue === "12345") {
        alert('Успешна најава. Се надеваме дека и се останато ќе функционира добро.');
        router.push("/");
      } else {
        alert('Внесените податоци за е-маил адреса и лозинка не се валидни. Ве молиме обидете се повторно.');
        router.push("/login");
      }
    };

 return (
    <>
      <Head>
        <title>Igralishte - Login Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className='container-fluid mt-5'>
          <div className='row d-flex flex-column justify-content-center'>
            <div className='col-12 mt-5 mb-4 text-center'>
              <Link href={"/"}><img src="../pictures/icons/Logo Igralishte final version.png" alt="logo-igralishte" /></Link>
            </div>
            <div className='col-10 mr-auto ml-auto mt-5'>
            <form className="d-flex flex-column justify-content-center" onSubmit={handleLogin}>
              <label htmlFor="username">Email адреса</label>
              <input type="email" id="username" className="SecondaryBtn" style={{fontWeight: "lighter"}} placeholder="igralishte@hotmail.com" value={userValue} onChange={handleChangeUser} />
              <label htmlFor="password">Лозинка</label>
              <input type="password" id="password" className="SecondaryBtn mb-3" style={{fontWeight: "lighter"}} placeholder="12345" value={passwordValue} onChange={handleChangePassword}  />
              <Link href="/register"><p style={{color: "#8A8328", textDecoration: "underline", marginBottom: '20px'}}>Ја заборави лозинката?</p></Link>

              <div className='text-center mb-5'>
                <PrimaryBtn title="Најави се" onClick={handleLogin} btnClass={"PrimaryBtn w-100"} backgroundColor={"black"} color='white' border='none' height='40px' />
                <p className='text-center my-4'>или</p>
                <PrimaryBtn btnClass={"SecondaryBtn w-100"} img="../pictures/icons/google.png" title="Најави се преку Google" backgroundColor={"transparent"} color='black' height="40px" border='3px solid #FFDBDB'/>
                <PrimaryBtn btnClass={"SecondaryBtn w-100"}  img="../pictures/icons/facebook.png" title="Најави се преку Facebook" backgroundColor={"transparent"} color='black' height="40px" border='3px solid #FFDBDB'/>
                <Link href="/register"><p className='mr-2 mt-4 mb-5 text-dark font-weight-bold'>Немаш профил? <span style={{color: "#8A8328", textDecoration: "underline"}}> Регистрирај се</span></p></Link>
                <p className='p-0 note'>Сите права задржани @ Игралиште Скопје</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
 );
}

export default LoginPage;