export type RootStackParamList = {
    Signup: undefined;
    Signin: undefined;
    Home: undefined;
    Loading:undefined;
    Chat: {
        userIds:string[]; //어떤 유저들이 포함되어 있는가?
        other: User;
    };
}

export interface User{
    userId: string,
    email: string,
    name: string
}

export enum Collections {
    USERS = 'users',
}