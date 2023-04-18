import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateRecipe, createRecipe , UploadImage} from '../redux/actions/recipeActions';
import { getAllRecipes, deleteRecipe } from '../redux/actions/recipeActions';
import { useParams } from 'react-router-dom';
import { TagsInput } from "react-tag-input-component";

const AddRecipe = () => {
    const { id } = useParams();
    const [image, setImage] = useState([
        "https://mdbootstrap.com/img/Photos/Others/placeholder.jpg",
      ]);
    const [pic, setPic] = useState({});
    const [selected, setSelected] = useState(["papaya"]);
console.log("hedha selected",selected)
  const dispatch = useDispatch();
  const recipes = useSelector(state => state.recipes.recipes);
  const [form, setForm] = useState({});

  const [recipe, setRecipe] = useState({
    name: '',
    image: 'https://mdbootstrap.com/img/Photos/Others/placeholder.jpg',
    preparation: '',
    cooking: '',
    quantity: '',
    ingredients: '',
    material: '',
    rating: 0
  });
    //handle and convert it in base 64
    const handleImage = (e) => {
      const file = e.target.files[0];
      setFileToBase(file);
      //console.log(file);
    };
    const setFileToBase = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    };
    
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const newErrors = {};
      if (Object.keys(newErrors).length === 0) {
         const newRecipe = await dispatch(createRecipe(recipe));
         console.log("hedhy l new recipeeeeeeeeeeeeeeeee",newRecipe);

  
       const newRecipeId = newRecipe.data._id;
        // window.alert(`Recipe ${newRecipeId} created successfully.`);

        // window.history.back();
        console.log("hedhy l new recipe",newRecipeId);
         await dispatch(UploadImage(image, newRecipeId));
      
        //dispatch(UploadImage(image, newRecipeId));
      }
    };
    console.log("zzzzz",recipes)
    
  return (
    
    <div>
        <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
          </div>

        <section className="pb-16 bg-blueGray-200 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
         
           
        </div>

        <div className="container mx-auto">
          <div className="flex flex-wrap  bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10" style={{}}>
          <h2>Add a Recipe</h2>
      
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full " type="text" value={recipe.name} onChange={(e) => setRecipe({ ...recipe, name: e.target.value })} required />
        </label>
        <br />
        <label>
          Picture:
          <div className="mb-4 d-flex">
                <img
                  src={image}
                  alt="example placeholder"
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
                       <div className="d-flex">
                 <div className="btn btn-primary btn-rounded">
                  <label
                    className="form-label text-white m-1"
                    htmlFor="customFile1"
                  >
                    Choose file
                  </label>
                  <input
                    type="file"
                    className="form-control d-none"
                    id="customFile1"
                    onChange={handleImage}
                  />
                </div> 
              </div>
        </label>

        <br />
        <label>
          Preparation:
          <textarea  class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10" value={recipe.preparation} onChange={(e) => setRecipe({ ...recipe, preparation: e.target.value })} required />
        </label>
        <br />
        <label>
          Cooking:
          <textarea class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10" value={recipe.cooking} onChange={(e) => setRecipe({ ...recipe, cooking: e.target.value })} required />
        </label>
        <br />
        <label>
          Quantity:
          <input class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10" type="text" value={recipe.quantity} onChange={(e) => setRecipe({ ...recipe, quantity: e.target.value })} />
        </label>
        <br />
        <label>
  Ingredients:
  <TagsInput
    value={recipe.ingredients.split(',')}
    onChange={(tags) => setRecipe({ ...recipe, ingredients: tags.join(',') })}
    name="ingredients"
    placeHolder="Enter ingredient and press enter"
  />
</label>
        <br />
        <label>
          Material:
          <textarea class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10" value={recipe.material} onChange={(e) => setRecipe({ ...recipe, material: e.target.value })} required />
        </label>
        <br />
        <label>
          Rating:
          <input class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10" type="number" min="0" max="5" value={recipe.rating}
            onChange={(e) => setRecipe({ ...recipe, rating: e.target.value })} required />
        </label>
        <br />
       
       
    
<button type="submit">create</button>

</form>
          </div>
        </div>
      </section> 
</div>
  );
};

export default AddRecipe
