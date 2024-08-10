export interface UserListResponse {
  id: number;
  name: string;
}

export interface UserBook {
  name: string;
  userScore?: number;
}

export interface UserDetailResponse {
  id: number;
  name: string;
  books: {
    past: UserBook[];
    present: UserBook[];
  };
}
