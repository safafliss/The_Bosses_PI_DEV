import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GetProfile, UpdateProfile } from '../redux/actions/profileActions';

//------------- imports

import Navbar from '../components/ReusableComponents/components/Navbars/AuthNavbar';
import Footer from '../components/ReusableComponents/components/Footers/Footer';

function Profile() {
  let userId = useSelector((state) => state.auth.user.id);
  let connectedUserId = useSelector((state) => state.auth.user.id);
  let { id } = useParams();
  id = id ? id : '';
  userId = id !== '' ? id : userId;
  const dispatch = useDispatch();
  const test = async () => {
    await dispatch(GetProfile(userId));
  };
  useEffect(() => {
    test();
  }, []);

  const user = useSelector((state) => state.profiles.profile);

  // reformat date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  let date = new Date(user.birthDate);
  const formattedDate = date.toLocaleDateString('fr-FR', options);

  //edit profile
  const [showText, setShowText] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [organisationName, setOrganisationName] = useState('');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleOrganisationNameChange = (event) => {
    setOrganisationName(event.target.value);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };

  const handlePostalCodeChange = (event) => {
    setPostalCode(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleShowText = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setPhoneNumber(user.phoneNumber);
    setOrganisationName(user.organisationName);
    setStreet(user.street);
    setPostalCode(user.postalCode);
    setCity(user.city);
    setState(user.state);
    setGender(user.gender);
    setBio(user.bio);

    setShowText(!showText);
  };

  const saveChanges = async () => {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.organisationName = organisationName;
    user.street = street;
    user.postalCode = postalCode;
    user.city = city;
    user.state = state;
    user.gender = gender;
    user.bio = bio;
    await dispatch(UpdateProfile(user));
  };

  return (
    <>
      <Navbar transparent />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={user.image != null ? user.image.url : ''}
                        className="shadow-xl rounded-full h-auto align-middle border-none flex -m-10 -ml-20 lg:-ml-16 max-w-100-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Connect
                      </button>
                      {connectedUserId === userId ? (
                        <>
                          {!showText ? (
                            <>
                              <button
                                className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleShowText}
                              >
                                Edit
                              </button>
                            </>
                          ) : (
                            <button
                              className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                handleShowText();
                                saveChanges();
                              }}
                            >
                              Save changes
                            </button>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          22
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Friends
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          10
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Photos
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          89
                        </span>
                        <span className="text-sm text-blueGray-400">
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  {/* FIRST NAME & LAST NAME */}
                  {!showText ? (
                    <>
                      <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                        {user.firstName} {user.lastName}
                      </h3>
                      {/* EMAIL */}
                      <div className="mb-2 text-blueGray-600 mt-10">
                        {user.organisationName}
                      </div>
                      <div className="mb-2 text-blueGray-600 mt-10">
                        {user.email}
                      </div>
                      <div className="mb-2 text-blueGray-600 mt-10">
                        +{user.phoneNumber}
                      </div>
                      <div className="mb-2 text-blueGray-600 mt-10">
                        {user.city} {user.state},{user.street} :{' '}
                        {user.postalCode}
                      </div>
                      <div className="mb-2 text-blueGray-600 mt-10">
                        {user.gender}
                      </div>
                      <div className="mb-2 text-blueGray-600 mt-10">
                        {formattedDate}
                      </div>
                      <div className="mb-2 text-blueGray-600 mt-10">
                        {user.email}
                      </div>
                      <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full lg:w-9/12 px-4">
                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                              {user.bio}
                            </p>
                            <a
                              href="#pablo"
                              className="font-normal text-lightBlue-500"
                              onClick={(e) => e.preventDefault()}
                            >
                              Show more
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <label>
                        First Name:
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="text"
                          value={firstName}
                          onChange={handleFirstNameChange}
                        />
                      </label>
                      <label>
                        Last Name:
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="text"
                          value={lastName}
                          onChange={handleLastNameChange}
                        />
                      </label>
                      <label>
                        Email:
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                        />
                      </label>
                      <label>
                        Phone Number:
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="number"
                          value={phoneNumber}
                          onChange={handlePhoneNumberChange}
                        />
                      </label>
                      <label>
                        Name of Organisation:
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="text"
                          value={organisationName}
                          onChange={handleOrganisationNameChange}
                        />
                      </label>
                      <label>
                        City:
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="text"
                          value={city}
                          onChange={handleCityChange}
                        />
                      </label>
                      <label>
                        State:
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="text"
                          value={state}
                          onChange={handleStateChange}
                        />
                      </label>
                      <label>
                        Street:
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="text"
                          value={street}
                          onChange={handleStreetChange}
                        />
                      </label>
                      <label>
                        Postal Code:
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="text"
                          value={postalCode}
                          onChange={handlePostalCodeChange}
                        />
                      </label>
                      <label>
                        Gender:
                        <input
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="text"
                          value={gender}
                          onChange={handleGenderChange}
                        />
                      </label>
                      <label>
                        Bio:
                        <textarea
                          name="bio"
                          rows="5"
                          cols="40"
                          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                          type="text"
                          value={bio}
                          onChange={handleBioChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Profile;
