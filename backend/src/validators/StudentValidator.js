
export class StudentValidator{
    static validate(data,mode='register'){
        // console.log("Entered Validator");
        const errors=[];        
        if(!data){
            errors.push("Invalid data provided");
        return errors;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!data.email_id || !emailRegex.test(data.email_id)){
            errors.push("Valid Email is required");
        }
        
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
         if(!data.password || data.password.length < 8 || !passwordRegex.test(data.password)){
            errors.push("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character");
         }

         if(mode==='register'){

        if(!data.first_name|| typeof data.first_name !=='string'|| data.first_name.trim()==='')
            errors.push("First Name is Required");

        if(!data.last_name|| typeof data.last_name !=='string'|| data.last_name.trim()==='')
            errors.push("Last Name is Required");
        
        if(!data.phone || data.phone.trim().length < 10)
            errors.push("Phone Number should have 10 digits");

        if(!data.address || data.address.length <= 5)
            errors.push("Provide a valid address");

        // if(!data.dob < new Date())
        //     errors.push("Enter a date before the current date");        

    }

         return errors;
    }

  

}