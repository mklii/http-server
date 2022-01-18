export interface IProfile {
  userid: number;
  avatar: string;
  username: string;
  email: string;
  role: string;
  team: string;
}

export interface IProfilesObject {
  users: IProfile[];
  total: number;
}
