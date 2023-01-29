import { UserInfo } from './types';

declare namespace Express {
    interface CustomSessionFields {
        user: UserInfo
    }

    export interface Request {
        session: Session & Partial<SessionData> & CustomSessionFields
    }
}