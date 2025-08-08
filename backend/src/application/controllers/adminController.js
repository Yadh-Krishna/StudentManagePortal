import { AdminValidator } from "../../validators/AdminValidator.js";

export class AdminController{
    constructor(useCase){
        this.useCase = useCase;
    }
     async login(req,res){

        // console.log("Admin COntroller",req.body);
        const data= req.body;
        
        const errors=AdminValidator.validate(data);

        if(errors.length>0)
            return res.status(400).json({errors});     

        try {
            // const allowAccess= await this.useCase.allowAdminAccess(data);
            const obj= await this.useCase.allowAdminAccess(data);   
            console.log("Result ",obj);         
            return res.status(200).json({obj});
        } catch (error) {
            return res. status(400).json({message:error.message})
        }

    }

    async getDashboard(req, res) {
    try {
        const { search } = req.query; // Get search from query params
        const data = await this.useCase.getDashboardData(search);
        return res.status(200).json({ dashboard: data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

     async createUser(req, res) {
    const data = req.body;
    const errors = StudentValidator.validate(data, 'register');
    if (errors.length > 0)
      return res.status(400).json({ errors });

    try {
      const user = await this.adminUseCase.createUser(data);
      if (user)
        return res.status(200).json({ message: "User Created", user });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}