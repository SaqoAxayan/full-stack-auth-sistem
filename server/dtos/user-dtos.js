class UserDto {
  email;
  id;

  constructor(module) {
    this.email = module.email;
    this.id = module._id;
  }
}

export default UserDto;
