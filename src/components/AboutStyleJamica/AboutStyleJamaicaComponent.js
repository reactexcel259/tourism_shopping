import React, { Component } from 'react'
import placeholder_img from "../../images/placeholder.jpg";
import { Link } from "react-router-dom";
import "./aboutStyleJamica.scss";

export default class AboutStyleJamaicaComponent extends Component {
    render() {
        
        return (
                <div className="events-list row">
                <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12  offset-md-1 offset-lg-2  event-img">
                <div
                    className="img"
                    style={{
                    backgroundImage: `url(${this.props.artists && this.props.artists.image ? this.props.artists.image.secure_url:placeholder_img})`,
                    backgroundSize: "cover"
                    }}
                />
                </div>
                <div className="col-lg-5 col-md-8 col-sm-6 col-sm-12 col-xs-12  event-detail">
                    <div>
                        <div className="artistName">
                            <span>Name:</span>
                            <p>{this.props.artists &&  ( this.props.artists.title || this.props.artists.name )}</p>
                        </div>
                       <div className="description">
                             <span>description:</span>
                            <p>{this.props.artists && ( this.props.artists.description || (this.props.artists.content && this.props.artists.content.brief))}</p>
                       </div>
                        <div className="shopLink">
                        {this.props.artists && (this.props.artists.websiteurl || this.props.artists.website)
                        ?
                            <>
                                <span>Shop:</span>
                                <a href={this.props.artists && (this.props.artists.websiteurl || this.props.artists.website)} target="_blank">{this.props.artists && (this.props.artists.websiteurl || this.props.artists.website)}</a>
                            </>
                        :
                        <>
                            <span>Shop:</span>
                            <span>NA</span>                        
                        </>
                        }
                        </div>

                    </div>
                </div>

                
            </div>
        )
    }
}
