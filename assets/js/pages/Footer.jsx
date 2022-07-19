import React from "react";
import "./Footer.css";
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook ,
  faInstagram ,
  faTwitter
} from "@fortawesome/free-brands-svg-icons"
 
function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>Covoiturage</h4><br/>
            <p className="list-unstyled">
              <li>+212 5 36 69 09 06</li><br/>
              <li>67, Immeuble Hallou, Boulevard Med V <br/>(En face Bank Al-Maghrib) <br/> Oujda</li>
            </p>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>A Propos </h4><br/>
            <ul className="list-unstyled">
              <li >FQA</li>
              <li>L'équipe</li>
              <li>Avis des membres</li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="col">
            <div className="social-container">

           
            <h4>Contact us</h4> <br/>
            <ul className="list-unstyled"> 
              <li><a href="https://www.facebook.com/CoVoiturage-101056518766422" className="facebook social" >
                    <FontAwesomeIcon icon={faFacebook} size="3x" />
                  </a> 
              </li>
              <br/> 
              <li>
                <a href=""  className="twitter social">
                        <FontAwesomeIcon icon={faTwitter} size="3x" />
                      </a>
              </li>
              <br/> 
              <li> 
                  <a href="" className="instagram social">
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                  </a>
              
              </li>
            </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Groupe C O V O I T U R A G E | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
