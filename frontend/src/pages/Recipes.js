/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import patternReact from "../assets/img/recipelandinggg.png";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllRecipes, deleteRecipe } from '../redux/actions/recipeActions';
import Navbar from '../components/ReusableComponents/components/Navbars/UserNavbar';
import allrecipes from "../assets/img/recipes.png";
import doc from "../assets/img/doc.png";

export default function Recipes() {
  const recipes = useSelector(state => state.recipes.recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
console.log("all",recipes)
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      dispatch(deleteRecipe(id)).then(() => {
        dispatch(getAllRecipes());
      });
    }
  };

  if (!recipes) {
    return <div>Loading...</div>
  }
  return (
    
    <>
        <Navbar  /> 
      <section className="header relative pt-16 items-center flex h-screen max-h-860-px"style={{backgroundImage: `url(${patternReact})`,backgroundRepeat: "no-repeat", backgroundSize:"1520px"}}>
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
            <div
          className="" style={{backgroundImage: `url(${patternReact})`}}
          
        ></div>
            </div>
          </div>
        </div>

       
        <Link to={"/recipes/recipesList"}>  <Button style={{marginLeft:"-450%",width:"200px" ,backgroundColor:"#3a9a61",border:"#3a9a61"}} >Discover All Recipes  </Button></Link>
      </section>
      

      <section className="mt-48 md:mt-40 pb-40 relative " style={{marginTop:"-10rem" ,  backgroundImage: `url(${allrecipes})`, backgroundRepeat: "no-repeat", backgroundSize:"1520px",}}>
      
     
        <div style={{ display: "flex", justifyContent: "space-between" }}>

          <ul style={{ display: "flex", justifyContent: "space-between" }}>
        {recipes.map((recipe, index) => (
          <div md={2} key={index} style={{ display: "flex", justifyContent: "space-between" }}>
            
        <div className="container mx-auto" style={{marginTop:"300px",width:"300px" }} >
          <div className="flex flex-wrap ">
            <div className=" px-12 md:px-4 mr-auto ml-auto -mt-32">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ">
  <div style={{ height: "300px", width: "100%" }}>
    <img
      alt="tsawer"
      src={recipe.image}
      className="w-full h-full object-cover align-middle rounded-t-lg"
    />
  </div>
  <blockquote className="relative p-8 mb-4">
    <svg
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 583 95"
      className="absolute left-0 w-full block h-95-px -top-94-px"
    >
      <polygon
        points="-30,95 583,95 583,65"
        className=" fill-current"style={{color: '#24b765'}}
      ></polygon>
    </svg>
    <h4 className="text-xl font-bold text-black">
      <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
    </h4>
    <p className="text-md font-light mt-2 text-black">
      {recipe.preparation}
    </p>
  </blockquote>
</div>

            
            </div>

       
          </div>
        </div>
        </div>

        ))}
  </ul>
</div>
        
<section style={{backgroundImage: `url(${doc})`, backgroundRepeat: "no-repeat",backgroundSize:"1530px",marginTop:"-19%"}}>
        <div className="container mx-auto px-4 pb-32 pt-48">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-5/12 ml-auto px-12 md:px-4">
              <div className="md:pr-12" style={{    marginTop: "40%"}}>
                <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-file-alt text-xl"></i>
                </div>
                <h3 className="text-3xl font-semibold text-white">
                Food waste in Tunisia

                </h3>
                <p className="mt-4 text-lg leading-relaxed text-white">
                According to official figures dating back to 2020, nearly 572 million dinars worth of food products are wasted each year by Tunisian households.
                </p>
                <ul className="list-none mt-6">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                      
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white">
                        You + me + everyone who wants it, we are capable of reducing this number!
                        </h4>
                      </div>
                    </div>
                  </li>
               
                </ul>
              </div>
            </div>

            <div className="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-xl"
                style={{
                  transform:
                    "scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)",
                }}
                src={require("../assets/img/documentation.png").default}
              />
            </div>
          </div>
        </div>

        <div className="justify-center text-center flex flex-wrap mt-24" >
          <div className="w-full md:w-6/12 px-12 md:px-4">
            <h2 className="font-semibold text-4xl">Beautiful Example Pages</h2>
            <p className="text-lg leading-relaxed mt-4 mb-4 ">
        
            </p>
          </div>
        </div>
        </section>
      </section>

      {/* {/* <section className="block relative z-1 bg-blueGray-600">
        <div className="container mx-auto">
          <div className="justify-center flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4  -mt-24">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Login Page
                  </h5>
                  <Link to="/auth/login">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("../assets/img/login.jpg").default}
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Profile Page
                  </h5>
                  <Link to="/profile">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("../assets/img/profile.jpg").default}
                      />
                    </div>
                  </Link>
                </div>

                <div className="w-full lg:w-4/12 px-4">
                  <h5 className="text-xl font-semibold pb-4 text-center">
                    Landing Page
                  </h5>
                  <Link to="/landing">
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={require("../assets/img/landing.jpg").default}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="py-20 bg-blueGray-600 overflow-hidden">
        <div className="container mx-auto pb-64">
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-64">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <i className="fas fa-code-branch text-xl"></i>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal text-white">
                Open Source
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400">
                Since{" "}
                <a
                  href="https://tailwindcss.com/?ref=creativetim"
                  className="text-blueGray-300"
                  target="_blank"
                >
                  Tailwind CSS
                </a>{" "}
                is an open source project we wanted to continue this movement
                too. You can give this version a try to feel the design and also
                test the quality of the code!
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-400">
                Get it free on Github and please help us spread the news with a
                Star!
              </p>
              <a
                href="https://github.com/creativetimofficial/notus-react?ref=nr-index"
                target="_blank"
                className="github-star mt-4 inline-block text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg"
              >
                Github Star
              </a>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative">
              <i className="fab fa-github text-blueGray-700 absolute -top-150-px -right-100 left-auto opacity-80 text-55"></i>
            </div>
          </div>
        </div>
      </section> */}

   

    </>
  );
}
