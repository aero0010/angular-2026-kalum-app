export class User {
    id?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    identityUser?: string;
    roles: string[] = [];
}