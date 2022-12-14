export interface User {
    name: string,
    lastName: string,
    email: string,
    password: string,
}

export interface RegisterReturn {
    message: string
}

export interface Login {
    email: string,
    password: string,
}

export interface Auth {
    isAuth: boolean,
}

export interface LoggedUser {
    email: string,
    name: string,
    lastName: string,
    id: string
}

export interface UserList {
    $id: string,
    $values:string[]
}
