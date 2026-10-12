export interface User {
  id: number;
  name: string;
    email: string;
    password?: string;
}

export interface UserResponse {
    code: number;
    message: string;
    data?: User;
}

export type UserAcreditationResult =
    | { ok: true, data: UserResponse; }
    | { ok: false, message: string; }

export type UserDeletionResult =
    | { ok: true }
    | { ok: false; message: string };

    // "code": 200,
	// "message": "User data retrieved successfully",
	// "data": {
	// 	"id": 1,
	// 	"name": "John Doe",
	// 	"email": "johnDoe@mail.com"
	// }