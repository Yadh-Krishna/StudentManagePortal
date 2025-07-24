export class Student{
    constructor({
    first_name,
    last_name,
    email_id,
    password,
    profileimageurl = '',
    phone = '',
    dob = null,
    address = ''
  }){
    this.first_name = first_name;
    this.last_name = last_name;
    this.email_id = email_id;
    this.password = password;
    this.profileimageurl = profileimageurl;
    this.phone = phone;
    this.dob = dob;
    this.address = address;
  }
}