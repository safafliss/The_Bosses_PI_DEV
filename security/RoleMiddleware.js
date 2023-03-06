// const ROLES = {
//     "USER": "USER",
//     "ADMIN": "ADMIN"
// }

// const inRole  = (...roles)=>(req, res, next)=>{
//     const role =  roles.find(role=> req.user.role === role)
//     if(!role){
//       return res.status(401).json({message: "no access"})
//     }
//     next()
// }

// module.exports = {
//     inRole,
//     ROLES
// }
const ROLES = {
    "USER": {
        "PARTICULIER":"PARTICULIER",
        "PROFESSIONAL":"PROFESSIONAL",
        "ASSOCIATION":"ASSOCIATION",
        "LIVREUR":"LIVREUR",
        "TRASHSPOTTER":"TRASHSPOTTER",
    },
    "ADMIN": {
        "ADMIN":"ADMIN"},

    "PARTICULIER":{"PARTICULIER":"PARTICULIER"},
    "PROFESSIONAL":{"PROFESSIONAL":"PROFESSIONAL"},
    "ASSOCIATION":{"ASSOCIATION":"ASSOCIATION"},
    "LIVREUR":{"LIVREUR":"LIVREUR"},
    "TRASHSPOTTER":{"TRASHSPOTTER":"TRASHSPOTTER"},
}

const inRole  = (...roles)=>(req, res, next)=>{
    console.log(req.user.role)
    var role = false    
    for (let check of roles){
        role = role || (Object.keys(check).indexOf(req.user.role )!=-1)
        if (role)
        break
    }
    if(!role){
      return res.status(401).json({message: "Unauthorized"})
    }
    next()
}

module.exports = {
    inRole,
    ROLES
}