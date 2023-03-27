import React from "react";
import Classnames from 'classnames'

function Inputs({name, label,  type, icon, onChangeHandler,errors}) {
  return (
    <>
      <div >
       
        <input type={type}  name={name} class={Classnames("form-control", {"is-invalid": errors})} onChange={onChangeHandler} placeholder={name}/>
        {
          errors && (<div  className="invalid-feedback">
          {errors}
        </div>)
        }
      </div>
    </>
  );
}

export default Inputs;
