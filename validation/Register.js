const isEmpty = require('./isEmpty');
const validator = require('validator')
const axios = require('axios');


module.exports = function validatorRegister(data){
    let errors ={};
    data.firstName = !isEmpty(data.firstName) ? data.firstName : ""
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.confirm = !isEmpty(data.confirm) ? data.confirm : ""
    
    if (validator.isEmpty(data.firstName)){
        errors.firstName = "Required firstName";
    }
    if (validator.isEmpty(data.lastName)){
        errors.lastName = "Required lastName";
    }   
    if (!validator.isEmail(data.email)){
        errors.email = "Required format email";
    }
    if (validator.isEmpty(data.email)){
        errors.email = "Required email";
    }else{
        axios.get('https://emailvalidation.abstractapi.com/v1/?api_key=bf2c0a7fa84f4172a35e9dc5ca7f378e&email='+data.email)
            .then(response => {
                if (response.data["deliverability"]!="DELIVERABLE"){
                    errors.email = "Email is not found";
                }
                
            })
            .catch(error => {
                // console.log(error);
    });
    }
    if (validator.isEmpty(data.password)){
        errors.password = "Required password";
    }
    if(!validator.equals(data.password, data.confirm)){
        errors.confirm = "passwords doesn't match";
    }
    if (validator.isEmpty(data.confirm)){
        errors.confirm = "Required confirm";
    }
    
    return{
        errors,
        isValid : isEmpty(errors)
    }
}