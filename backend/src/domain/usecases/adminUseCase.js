export class AdminUseCase{
    constructor(adminRepository,passwordHasher){
        this.adminRepository=adminRepository;
        this.passwordHasher=passwordHasher;
    }
    async allowAdminAccess(data){
        const admin= await this.adminRepository.findByEmail(data.email);
        // console.log("AllowAccess ",admin.password);
        const isMatch= await this.passwordHasher.compare(data.password,admin.password);
         console.log("Allow Access ", isMatch);
        // return isMatch;

        if(!isMatch){
            throw new Error('Invalid Credentials');            
        }
        const obj= await this.passwordHasher.createToken(data);
        return obj;
    }

    async createUser(data){
        
    }
}