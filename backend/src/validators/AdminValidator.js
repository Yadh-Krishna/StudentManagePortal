
export class AdminValidator{
    static validate(data){
        // console.log("Data ",data);
        const errors=[];        
        if(!data){
            errors.push("Invalid data provided");
        return errors;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!data.email|| !emailRegex.test(data.email)){
            errors.push("Valid Email is required");
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
         if(!data.password || data.password.length < 8 || !passwordRegex.test(data.password)){
            errors.push("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
         }

         return errors;
    }

  

}