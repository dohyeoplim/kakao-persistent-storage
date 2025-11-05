export interface SessionUser {
    name: string;
    phoneNumber: string;
}

export interface SessionPayload {
    user: SessionUser;
    iat?: number;
    exp?: number;
}
