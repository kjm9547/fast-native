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
    CHATS = 'chats',
    MESSAGES = 'messages'
}

export interface Chat {
    id:string; //채팅방 아이디
    userIds:string[];   //채팅방에서 대화중인 유저들의 아이디
    users:User[]    // 유저의 정보
}

export interface Message{
    id: string;
    user:User;
    text:string;
    createdAt:Date;
}

export interface FirestoreMessageData{
    text:string;
    user:User;
    createdAt: Date;
}