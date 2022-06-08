import React, { Component } from "react";
import { connect } from "react-redux";

import IntroPart from "./IntroPart";

import "./Intro.scss";

import CommonButton from "../button/CommonButton";

import homepageImage from "../../../image/homepage.png";
import vaccinestationImage from "../../../image/vaccinestation.png";
import vaccinationImage from "../../../image/vaccination.png";
import diagnosisImage from "../../../image/diagnosis.png";
import symptomsImage from "../../../image/symptoms.png";

class Intro extends Component {
  render() {
    return (
      <div className="intro-container">
        <div className="intro-start-container">
          <div className="intro-start-text-container">
            <div className="intro-start-title">
              Get Vaccinated Now Easily With Vaccine App
            </div>
            <div className="intro-start-info">
              Participate in vaccinations to prevent COVID-19.
            </div>
            {!this.props.isHomePage && (
              <div className="intro-start-button-container">
                <div className="intro-start-button">
                  <CommonButton linkTo={"/login"} text={"Login"} />
                </div>
              </div>
            )}
          </div>
          <img
            className="intro-start-image"
            src={homepageImage}
            alt="Home page"
          ></img>
        </div>
        <div className="intro-container-child">
          <IntroPart
            image={vaccinestationImage}
            imageAlt="Vaccinestation"
            linkTo="/vaccinestations"
            linkActive={this.props.isHomePage}
            title="Vaccinestation"
          >
            Vaccinestation is a place where you can go to get vaccinated
            according to the vaccination you have registered.
          </IntroPart>
        </div>
        <div className="intro-container-child">
          <IntroPart
            image={vaccinationImage}
            imageAlt="Vaccination"
            linkTo="/vaccinations"
            linkActive={this.props.isHomePage}
            title="Vaccination"
            rightAlign
          >
            Vaccination is a shift in which vaccination takes place at the time
            and place of the vaccination shift you have registered.
          </IntroPart>
        </div>
        <div className="intro-container-child">
          <IntroPart
            image={diagnosisImage}
            imageAlt="Diagnosis"
            linkTo="/diagnosis"
            linkActive={this.props.isHomePage}
            title="Diagnosis"
          >
            A diagnosis is a medical diagnosis about you made by our doctor.
            Diagnosis indicates symptoms affecting vaccination.
          </IntroPart>
        </div>
        <div className="intro-container-child">
          <IntroPart
            image={symptomsImage}
            imageAlt="Symptoms"
            linkTo="/symptoms"
            linkActive={this.props.isHomePage}
            title="Symptoms"
            rightAlign
          >
            Symptoms are diseases or symptoms that affect your vaccinations.
          </IntroPart>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
