import { Collection, ISubCollection, SubCollection } from 'fireorm';

export class User {
    id: string;

    name: string;
}

@Collection('groups')
export class Group {
    id: string;

    name: string;

    @SubCollection(User)
    users: ISubCollection<User>;
}
