export interface IUser {
    _id: string;
    cohort: string;
    name: string;
    about: string;
    avatar: string;
}

export interface ICard {
    _id: string;
    createdAt: string;
    likes: IUser[];
    link: string;
    name: string;
    owner: {
        _id: string;
        about: string;
        avatar: string;
        cohort: string;
        name: string;
    }
}

