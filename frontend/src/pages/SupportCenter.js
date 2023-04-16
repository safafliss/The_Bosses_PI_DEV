import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar  from'../components/ReusableComponents/components/Navbars/UserNavbar'
import { useTranslation } from 'react-i18next';
function SupportCenter({user1}) {

  const { t } = useTranslation()
  
  console.log(user1)
  const [formData, setFormData] = useState({
    email:user1?.email,
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/support/addReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
 <>
        <Navbar user1={user1}/>
        
<section className="relative block py-24  bg-green-800	">
          <div className="container my-6 px-4 ">
            <div className="">
             
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-green-50		">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold ">
                     {t('feel free to report  us any bugs or  Reports!') }
                    </h4>
                    <br></br>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                    { t('Complete this form and we will get back to you in 24hours')}
                    </p>
                    <form onSubmit={handleSubmit}>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                       {t('email')}
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        value={user1?.email}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        {t('Subject')}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Subject"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                       {t( 'Message')}
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        cols="155"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white"

                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSubmit}
                      >
                        {t('Send Message')}
                      </button>
                  
                    </div>
                    </form>
                  </div>
                </div>
             
            </div>
          </div>
        </section>
 </>
  )
}

export default SupportCenter
