import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Formulaire.css";
function FormParticulier() {
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  return (
    <form
      className="jotform-form"
      action="https://submit.jotform.com/submit/230723810993559"
      method="post"
      name="form_230723810993559"
      id="230723810993559"
      accept-charset="utf-8"
      autocomplete="on"
    >
      <div role="main" className="form-all">
        <ul className="form-section page-section">
          <li id="cid_1" className="form-input-wide" data-type="control_head">
            <div className="form-header-group header-large">
              <div className="header-text httal htvam">
                <h1
                  id="header_1"
                  className="form-header"
                  data-component="header"
                >
                  Registration Form
                </h1>
                <br/>
                <div id="subHeader_1" className="form-subHeader">
                  Fill out the form carefully for registration
                </div>
              </div>
            </div>
          </li>
          <li className="form-line" data-type="control_fullname" id="id_4">
            <label
              className="form-label form-label-top form-label-extended form-label-auto"
              id="label_4"
              for="first_4"
            >
              Name
            </label>
            <div id="cid_4" className="form-input-wide" data-layout="full">
              <div data-wrapper-react="true" className="extended">
                <span
                  className="form-sub-label-container"
                  style={{ verticalAlign: "top" }}
                  data-input-type="first"
                >
                  <input
                   type="text"
                   id="last_4"
                   name="firstName"
                   className="form-textbox"
                   size="15"
                   value={data.firstName || ""}
                   onChange={(e) =>
                      setData((prev) => ({ ...prev, firstName: e.target.value }))
                   }
                //    defaultValue={data.firstName}
                  />
                  <label
                    className="form-sub-label"
                    for="first_4"
                    id="sublabel_4_first"
                    style={{ minHeight: "13px" }}
                    aria-hidden="false"
                  >
                    First Name
                  </label>{" "}
                </span>
                <span
                  className="form-sub-label-container"
                  style={{ verticalAlign: "top" }}
                  data-input-type="last"
                >
                  <input
                    type="text"
                    id="last_4"
                    name="lastName"
                    className="form-textbox"
                    size="15"
                    // defaultValue={data.lastName}
                  />
                  <label
                    className="form-sub-label"
                    for="last_4"
                    id="sublabel_4_last"
                    style={{ minHeight: "13px" }}
                    aria-hidden="false"
                  >
                    Last Name
                  </label>
                </span>
              </div>
            </div>
          </li>
          <li
            className="form-line form-line-column form-col-1"
            data-type="control_birthdate"
            id="id_24"
          >
            <label
              className="form-label form-label-top"
              id="label_24"
              for="input_24"
            >
              Birth Date
            </label>
            <div id="cid_24" className="form-input-wide" data-layout="full">
              <div data-wrapper-react="true">
                <span
                  className="form-sub-label-container"
                  style={{ verticalAlign: "top" }}
                >
                  <input
                    type="date"
                    className="form-textbox"
                    // onChange={(e) => setExpiryDate(e.target.value)}
                    // value={expiry_date}
                    // className={
                    //   emptyFields.includes("expiry_date") ? "error" : ""
                    // }
                  />
                </span>
              </div>
            </div>
          </li>
          <li
            className="form-line form-line-column form-col-2"
            data-type="control_dropdown"
            id="id_3"
          >
            <label
              className="form-label form-label-top"
              id="label_3"
              for="input_3"
            >
              Gender
            </label>
            <div id="cid_3" className="form-input-wide" data-layout="half">
              <select
                className="form-dropdown"
                id="input_3"
                name="q3_gender"
                style={{ width: "310px" }}
                data-component="dropdown"
                aria-label="Gender"
              >
                <option value="">Please Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
          </li>
          <li className="form-line" data-type="control_address" id="id_23">
            <label
              className="form-label form-label-top form-label-auto"
              id="label_23"
              for="input_23_addr_line1"
            >
              Address
            </label>
            <div id="cid_23" className="form-input-wide" data-layout="full">
              <div
                summary=""
                className="form-address-table jsTest-addressField"
              >
                <div className="form-address-line-wrapper jsTest-address-line-wrapperField">
                  <span className="form-address-line form-address-street-line jsTest-address-lineField">
                    <span
                      className="form-sub-label-container"
                      style={{ verticalAlign: "top" }}
                    >
                      <input
                        type="text"
                        id="input_23_addr_line1"
                        name="address"
                        className="form-textbox form-address-line"
                        size="30"
                      />
                      <label
                        className="form-sub-label"
                        for="input_23_addr_line1"
                        id="sublabel_23_addr_line1"
                        style={{ minHeight: "13px" }}
                        aria-hidden="false"
                      >
                        Street Address
                      </label>
                    </span>
                  </span>
                </div>
                <div className="form-address-line-wrapper jsTest-address-line-wrapperField">
                  <span className="form-address-line form-address-city-line jsTest-address-lineField">
                    <span
                      className="form-sub-label-container"
                      style={{ verticalAlign: "top" }}
                    >
                      <input
                        type="text"
                        id="input_23_city"
                        name="city"
                        className="form-textbox form-address-city"
                      />
                      <label
                        className="form-sub-label"
                        for="input_23_city"
                        id="sublabel_23_city"
                        style={{ minHeight: "13px" }}
                        aria-hidden="false"
                      >
                        City
                      </label>
                    </span>
                  </span>
                  <span className="form-address-line form-address-state-line jsTest-address-lineField">
                    <span
                      className="form-sub-label-container"
                      style={{ verticalAlign: "top" }}
                    >
                      <input
                        type="text"
                        id="input_23_state"
                        name="state"
                        className="form-textbox form-address-state"
                      />
                      <label
                        className="form-sub-label"
                        for="input_23_state"
                        id="sublabel_23_state"
                        style={{ minHeight: "13px" }}
                        aria-hidden="false"
                      >
                        State / Province
                      </label>
                    </span>
                  </span>
                </div>
                <div className="form-address-line-wrapper jsTest-address-line-wrapperField">
                  <span className="form-address-line form-address-zip-line jsTest-address-lineField">
                    <span
                      className="form-sub-label-container"
                      style={{ verticalAlign: "top" }}
                    >
                      <input
                        type="text"
                        id="input_23_postal"
                        name="postal"
                        className="form-textbox form-address-postal"
                      />
                      <label
                        className="form-sub-label"
                        for="input_23_postal"
                        id="sublabel_23_postal"
                        style={{ minHeight: "13px" }}
                        aria-hidden="false"
                      >
                        Postal / Zip Code
                      </label>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </li>
          <li
            className="form-line form-line-column form-col-1"
            data-type="control_email"
            id="id_6"
          >
            <label
              className="form-label form-label-top"
              id="label_6"
              for="input_6"
            >
              E-mail
            </label>
            <div id="cid_6" className="form-input-wide" data-layout="half">
              <span
                className="form-sub-label-container"
                style={{ verticalAlign: "top" }}
              >
                <input
                  type="email"
                  id="input_6"
                  name="email"
                  className="form-textbox validate[Email]"
                  style={{ width: "310px" }}
                  size="310"
                  placeholder="ex: myname@example.com"
                />
                <label
                  className="form-sub-label"
                  for="input_6"
                  id="sublabel_input_6"
                  style={{ minHeight: "13px" }}
                  aria-hidden="false"
                >
                  example@example.com
                </label>
              </span>
            </div>
          </li>
          <li
            className="form-line form-line-column form-col-2"
            data-type="control_phone"
            id="id_27"
          >
            <label
              className="form-label form-label-top"
              id="label_27"
              for="input_27_full"
            >
              Mobile Number
            </label>
            <div id="cid_27" className="form-input-wide" data-layout="half">
              <span
                className="form-sub-label-container"
                style={{ verticalAlign: "top" }}
              >
                <input
                  type="tel"
                  id="input_27_full"
                  name="phone"
                  className="mask-phone-number form-textbox validate[Fill Mask]"
                  style={{ width: "310px" }}
                  placeholder="(000) 00-000-000"
                />
              </span>
            </div>
          </li>

          <li className="form-line" data-type="control_textarea" id="id_45">
            <label
              className="form-label form-label-top form-label-auto"
              id="label_45"
              for="input_45"
            >
              Profile Image
            </label>
            <div className="form-outline mb-4">
              <input
                onChange={handleImage}
                type="file"
                id="formupload"
                name="image"
                className="form-control"
              />
            </div>
            <img className="img-fluid" src={image} alt="" />
          </li>

          <li className="form-line" data-type="control_textarea" id="id_45">
            <label
              className="form-label form-label-top form-label-auto"
              id="label_45"
              for="input_45"
            >
              Bio
            </label>
            <div id="cid_45" className="form-input-wide" data-layout="full">
              <textarea
                id="input_45"
                className="form-textarea"
                name="bio"
                style={{ width: "648px", height: "163px" }}
              ></textarea>
            </div>
          </li>
          <li className="form-line" data-type="control_button" id="id_48">
            <div id="cid_48" className="form-input-wide" data-layout="full">
              <div
                data-align="auto"
                className="form-buttons-wrapper form-buttons-auto jsTest-button-wrapperField"
              >
                <button
                  id="input_48"
                  type="submit"
                  className="form-submit-button submit-button jf-form-buttons jsTest-submitField"
                >
                  Submit
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </form>
  );
}

export default FormParticulier;
