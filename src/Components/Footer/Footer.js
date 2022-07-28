import React from "react";
import "./Footer.css";
import logo from "../../img/mlh-prep.png";

const Footer = () => {
  return (
    <>
      <footer class="footer-distributed">
        <div class="footer-left">
          <h3>
            Wheather<span>App</span>
          </h3>

          <p class="footer-company-name">MLH Pod.js © 2022</p>
        </div>

        <div class="footer-center">
          <div>
            <i class="fa fa-map-marker"></i>
            <p>
              <span></span> Want to contribute?
            </p>
          </div>

          <div>
            <i class="fa fa-phone"></i>
            <p>
              <span>Feel free to raise an issue on Github.</span>
            </p>
          </div>

          <div>
            <i class="fa fa-envelope"></i>
            <p>
              <a href="https://github.com/MLH-Fellowship/prep-project-22.JUL.PREP.3">
                Github Link
              </a>
            </p>
          </div>
        </div>

        <div class="footer-right">
          <p class="footer-company-about">
            <span>
              <h3>Team Members</h3>
            </span>
            <table>
              <tr>
                <td>Sanjay Singh Rajpoot</td>
                <td>Liuba</td>
              </tr>
              <tr>
                <td>Himanshu Thakur</td>
                <td>Chidera Innocent</td>
              </tr>
              <tr>
                <td>Elmar</td>
                <td>Shehab Adel</td>
              </tr>
              <tr>
                <td>Somaditya Singh</td>
                <td>Vy Nguyen</td>
              </tr>
              <tr>
                <td>Indira Sowy</td>
                <td>Julian Willis</td>
              </tr>
              <tr>
                <td>Di Wu</td>
                <td>A.S.L.Manasa</td>
              </tr>
              <tr>
                <td>Sadiq Babalola</td>
              </tr>
            </table>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
