import React, { useRef, useState } from "react";
import "./footer.css";
import Phone from "../../img/phone.png";
import Email from "../../img/email.png";
import Location from "../../img/location.png";
import Linkedin from "../../img/linkedin.png";
import emailjs from "@emailjs/browser";

const Footer = () => {
  const formRef = useRef();
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_fg5ki4b",
        "template_4e4932l",
        formRef.current,
        "bpb_sK-IxTZtzfkPF"
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div className="c">
      <div className="c-bg"></div>
      <div className="c-wrapper">
        <div className="c-left">
          <h1 className="c-title">Contact me</h1>
          <div className="c-info">
            <div className="c-info-item">
              <img src={Phone} alt="" className="c-icon" />
              681-804-141
            </div>
            <div className="c-info-item">
              <img src={Email} alt="" className="c-icon" />
              gaco.g4@gmail.com
            </div>
            <div className="c-info-item">
              <img src={Linkedin} alt="" className="c-icon" />
              <a href="https://www.linkedin.com/in/tomasz-gacek-bb5815a4">
                Tomasz gacek
              </a>
            </div>
            <div className="c-info-item">
              <img src={Location} alt="" className="c-icon" />
              Malaga
            </div>
          </div>
        </div>
        <div className="c-right">
          <div className="c-desc">
            <h1>Whats your story?</h1>
            <h2>
              Get in touch with me. I'm always intrested in new oportunietes and
              projects.
            </h2>
          </div>
          <form className="footerform" ref={formRef} onSubmit={handleSubmit}>
            <input
              className="footerinput"
              type="text"
              placeholder="Name"
              name="user_name"
            />
            <input
              className="footerinput"
              type="text"
              placeholder="Subject"
              name="user_subject"
            />
            <input
              className="footerinput"
              type="text"
              placeholder="Email"
              name="user_email"
            />
            <textarea
              className="footertextarea"
              rows="5"
              placeholder="Message"
              name="message"
            />
            <button className="footerbutton">Submit</button>
            {done && "Thanks!"}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
