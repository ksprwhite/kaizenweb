
export type Role = {
    id: number;
    name: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type UserForm = {
    username: string;
    password: string;
    password2: string;
    email: string;
    birthDate: string;
}

export type User = {
    id: number;
    username: string;
    email: string;
    role: Role;
}