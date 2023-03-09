import React from "react";
import Classnames from 'classnames'

function Inputs({name, label, type, onChangeHandler,errors}) {
  return (
    <div class=" mb-3">
      <label class="form-label">{label}</label>
      <div class="input-group">
        <input type={type}  name={name} class={Classnames("form-control", {"is-invalid": errors})} onChange={onChangeHandler} placeholder={name}/>
        {
          errors && (<div  className="invalid-feedback">
          {errors}
        </div>)
        }
      </div>
    </div>
  );
}

export default Inputs;
