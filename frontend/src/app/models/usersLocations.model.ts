export class UsersLocationsModel {

  constructor(
    public location: string,
    public userName: string
  ) {

    this.location = location;
    this.userName = userName;
  }
}
