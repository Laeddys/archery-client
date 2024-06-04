export interface IUserRole {
  id: number;
  email: string;
  password: string;
  banned: boolean;
  banReason: string | null;
  roles: Array<{
    id: number;
    value: string;
    description: string;
    UserRoles: {
      id: number;
      roleId: number;
      userId: number;
    };
  }>;
}
