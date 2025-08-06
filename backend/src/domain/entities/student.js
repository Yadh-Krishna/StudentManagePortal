export class Student{
    constructor({
    firstName,
    lastName,
    email_id,
    password,
    profileimageurl = '',
    phone = '',
    dob = null,
    address = ''
  }){
    this.first_name = firstName;
    this.last_name = lastName;
    this.email_id = email_id;
    this.password = password;
    this.profileimageurl = profileimageurl;
    this.phone = phone;
    this.dob = dob;
    this.address = address;
  }
}