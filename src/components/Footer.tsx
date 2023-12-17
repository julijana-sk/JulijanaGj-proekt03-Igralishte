import React, { useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import Link from "next/link";

const Footer = () => {

 const [username, setUsername] = useState<string>("");
 
  return (
    <footer>
	<div className="container-fluid footer">
		<div className="row d-flex flex-wrap flex-column">
			<p className="m-0">Следи ги нашите новости!</p>
			<div className="col-11 mr-auto ml-auto">
				<div className="footer-text">
			    <p className="mb-4">Биди дел од нашиот newsletter и дознавај прва за промоции, попусти и нови колекции.</p>
					<label htmlFor="username">Email адреса:</label>
					<input type="email" id="username" className="PrimaryBtn mb-3 text-left pl-3 w-100" style={{fontWeight: "lighter", height: "50px"}} placeholder="" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
						setUsername(event.target.value);
						}}/>
					<Link href={"/register"}>
						<PrimaryBtn title="Зачлени се!" btnClass={"PrimaryBtn w-100 btn-gold btn-gold-text"} backgroundColor={"btn-gold"} color='black' border='none' height="51px"/></Link>
				</div>
			    <hr className="w-100 my-5 border border-dark"/>
				<div className="row d-flex flex-wrap flex-column justify-content-left">
					<div className="col-12 mr-auto ml-auto">
						<Link href={"/about"} className="footer-link">За нас</Link>
						<Link href={"/contact"} className="footer-link">Контакт</Link>
						<Link href={"https://maps.app.goo.gl/c6RUfhjcp3Eyehz26"} className="footer-link">Локатор на продавницата</Link>
						<Link href={"/faq"} className="footer-link">Често поставувани прашања (FAQ)</Link>
						<Link href={"/login"} className="footer-link">Регистрирај се / логирај се</Link>
					</div>
					<div className="col-12 text-left mt-4">
					<h3 className="color-olive mb-3" style={{fontSize: '20px', fontStyle: 'italic'}}>Следи не на:</h3>
					  <div className="row d-flex flex-column footer-link">
						<div className="col-12">
						<Link href={"https://www.instagram.com/igraliste.sk/"} className="link">
							<div className="d-flex flex-row justify-content-start align-items-center align-self-center mb-2">
								<img src="../pictures/icons/instagram.png" alt="instagram"className="mr-3" />
								<p className="align-self-center m-0">igralishte.sk</p>
							</div>
							</Link>
							<Link href={"https://www.tiktok.com/@igraliste.sk?lang=en"} className="link">
							<div className="d-flex flex-row justify-content-start align-items-center align-self-center mb-5">
								<img src="../pictures/icons/tik-tok.png" className="mr-3" alt="tik-tok" />
								<p className="align-self-center m-0">igralishte.sk</p>
							</div>
						</Link>
						<p style={{fontSize: '12px'}}>Сите права задржани © 2023 igralishtesk.mk</p>
						</div>
					  </div>
					</div> 
				</div>
			</div>
		</div>
	  </div>
	</footer>
  );
};

export default Footer;
