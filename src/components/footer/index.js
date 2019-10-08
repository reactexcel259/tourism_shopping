import React from "react";
import "./footer.scss";
import Logo from "../../images/logo.gif";
import Menu from "../../images/icon/menu.svg";
import Close from "../../images/icon/cross.svg";
import f1 from "../../images/footer/f11.png";
import f2 from "../../images/footer/f22.png";
import f3 from "../../images/footer/f33.png";
import f4 from "../../images/footer/f44.png";
import f5 from "../../images/footer/f55.png";
import f6 from "../../images/footer/f66.png";
import f7 from "../../images/footer/f77.png";
import f8 from "../../images/footer/f88.png";
import f9 from "../../images/footer/f99.jpg";
import fb from "../../images/icon/fb.svg";
import f11 from "../../images/f11.png";
import f12 from "../../images/f12.jpg";
import twitter from "../../images/icon/twitter/blue_b.svg";
import insta from "../../images/icon/insta.svg";
import { Link } from "react-router-dom";
import mapMain from "../../images/map-main-color_g.svg";
import phone from "../../images/phone_g.svg";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const oThis = this;
    let d = new Date();
    let currentYear = d.getFullYear();
    return (
  
      <footer className="container-fluid">
        <div className="detail-footer row">
          <div className="col-md-8 offset-md-2 col-10 offset-1 footer-col">
            <div className="row">
              <div className="col-md-4 col-12  contact-section">
                <div className="content">
                  <div className="top-img">
                    <img src={mapMain} />
                  </div>
                  <span className="top">
                  Tourism Enhancement Fund 
                  <br/>
                  60  Knutford Boulevard 
                  <br/>
                  Kingston 5
                  <br/>
                  Jamaica, West Indies
                  </span>
                </div>
                <div className="content contact">
                  <img src={phone} />
                  <div className="numbers">
                    <a href="tel:(876) 920-4926-30" className="phone">(876) 920-4926-30</a>
                    <a href="tel:(876) 920-4944" className="phone"> (876) 920-4944</a> 
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-12 ">
                <div className="row">
                  <div className="col-md-3 col-6">
                    <div className="">
                      <div className="category-section">
                        <Link to="/duty_free">Duty Free</Link>
                        <Link to="/artisan">Artisan</Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div className="">
                      <div className="category-section">
                        <Link to="/crafts">Crafts</Link>
                        <Link to="/retails">Retails</Link>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4 col-6 footer-links">
                    <div className="row">
                      <div className="social-icons  col-md-12 col-xs-6">
                        <a
                          href="https://www.facebook.com/tefjamaica/"
                          target="_BLANK"
                        >
                          <img src={fb} />
                        </a>
                        <a
                          href="https://www.instagram.com/tefjamaica/"
                          target="_BLANK"
                        >
                          <img src={insta} />
                        </a>
                        <a href="https://twitter.com/TEFJamaica?s=17" target="_BLANK">
                          <img src={twitter} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
            <div className="row footerLogos">
            <div className="footerlinks">
                <div className = "row1">
                    <a href="https://www.visitjamaica.com" target="_BLANK">
                        <img src={f1} />
                    </a>
                    <a
                          href="https://www.mot.gov.jm/agency/tourism-enhancement-fund"
                          target="_BLANK"
                    >
                        <img src={f5} />
                    </a>
                    <a href="https://www.tpdco.org/" target="_BLANKddd"target="_BLANK">
                          <img src={f6} />
                    </a>
                    <a href="http://www.jtbonline.org/" target="_BLANK">
                          <img src={f11} />
                        </a>
                      
                        </div>

                        <div className="row2">
                        <a
                          href="http://www.jamaicatradeandinvest.org"
                          target="_BLANK"
                        >
                          <img
                            className="f9image"
                            src={f9}
                            // style={{ filter: "saturate(8) " }}
                          />
                        </a>
                        <a
                          href="https://www.jmea.org/"
                          target="_BLANK"
                        >
                          <img src={f3} />
                        </a>
                        <a href="https://www.jbdc.net/" target="_BLANK">
                          <img src={f4} />
                        </a>
                        <a href="http://www.jhta.org/" target="_BLANK">
                          <img src={f7} />
                        </a>
                        <a href="https://rada.gov.jm/" target="_BLANK">
                          <img src={f12}/>
                        </a> 

                            
                        </div>                                            
                      </div>

                  <div className="mobile-copyright col-md-12 col-12">                                                          
                    <div className="copyright-text text-center">
                      Copyright © {currentYear}. Developed by the Tourism Linkages Network, 
                      a division of the Tourism Enhancement Fund
                    </div>
                  </div>
                </div>
          </div>
        </div>

        <div className=" row" id ="mobile-footer">
          <div className="col-12 footer-col">
            <div className="row">
              <div className="col-9 m-auto contact-section">
                <div className="content">
                  <div className="top-img">
                    <img src={mapMain} />
                  </div>
                  <span className="top">
                  Tourism Enhancement Fund 
                  <br/>
                  60  Knutford Boulevard 
                  <br/>
                  Kingston 5
                  <br/>
                  Jamaica, West Indies
                  </span>
                </div>
                <div className="content contact">
                  <img src={phone} />
                  <div className="numbers">
                    <a href="tel:(876) 920-4926-30" className="phone">(876) 920-4926-30</a>
                    <a href="tel:(876) 920-4944" className="phone"> (876) 920-4944</a> 
                  </div>
                </div>
              </div>
            </div>
            <div className="row"> 
                <div className="col-9 m-auto ">
                    <div className="row">
                      <div className="col-md-3 col-6">
                        <div className="">
                          <div className="category-section">
                            <Link to="/duty_free">Duty Free</Link>
                            <Link to="/artisan">Artisan</Link>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3 col-6">
                        <div className="">
                          <div className="category-section">
                            <Link to="/crafts">Crafts</Link>
                            <Link to="/retails">Retails</Link>
                          </div>
                        </div>
                      </div>                 
                </div>
            </div>
            </div>

          <div className="mob-footerlinks">
                <div className = "row1">
                    <a href="https://www.visitjamaica.com" target="_BLANK">
                        <img src={f1} />
                    </a>
                    <a
                          href="https://www.mot.gov.jm/agency/tourism-enhancement-fund"
                          target="_BLANK"
                    >
                        <img src={f5} />
                    </a>
                    <a href="https://www.tpdco.org/" target="_BLANKrrr"target="_BLANK">
                          <img src={f6} />
                    </a>
                    <a href="http://www.jtbonline.org/" target="_BLANK">
                          <img src={f11} />
                        </a>
                    <a href="https://rada.gov.jm/" target="_BLANK">
                      <img src={f12}/>
                    </a> 
                </div>

                <div className="row2">
                        <a
                          href="http://www.jamaicatradeandinvest.org"
                          target="_BLANKrrr"
                        >
                          <img
                            className="f9image"
                            src={f9}
                            // style={{ filter: "saturate(8) " }}
                          />
                        </a>
                        <a
                          href="https://www.jmea.org/"
                          target="_BLANK"
                        >
                          <img src={f3} />
                        </a>
                        <a href="https://www.jbdc.net/" target="_BLANK">
                          <img src={f4} />
                        </a>
                        <a href="http://www.jhta.org/" target="_BLANK">
                          <img src={f7} />
                        </a>                                                    
                </div> 
                <div className="row3">
                        <a href="https://www.facebook.com/tefjamaica/"
                         target="_BLANK"
                        >
                            <img src={fb} />
                        </a>
                        <a href="https://www.instagram.com/tefjamaica/"
                           target="_BLANK"
                        >
                            <img src={insta} />
                        </a>
                        <a href="https://twitter.com/TEFJamaica?s=17" target="_BLANK">
                            <img src={twitter} />
                        </a>
                </div>                                           
            </div>

               
            <div className="row">
              <div className="row-2 col-12">
                        </div>
                        <div className="mobile-copyright col-12">                    
                            Copyright © {currentYear}. Developed by the Tourism Linkages Network, 
                            a division of the Tourism Enhancement Fund                                                                   
                        </div>                        
            </div> 
          </div>
        </div>
      </footer>
    );
  }
}
