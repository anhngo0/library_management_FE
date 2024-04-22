export const validateExistValue=(value)=>{
    return value ? true:false;
}

export const validateEmail=(value)=>{
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value) ? true:false;
}

export const validateMinLength=(value, min)=>{
   return value.length >= min ? true:false;
}