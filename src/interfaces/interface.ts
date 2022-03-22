interface Image {
  png: string;
  webp: string;
}
interface CurrentUser {
  image: Image;
  username: string;
}

export interface Comment {
  content: string;
  createdAt: string;
  id: number;
  replies: Reply[];
  score: number;
  user: CurrentUser;
}

export interface Reply {
  content: string;
  createdAt: string;
  id: number;
  replyingTo: string;
  score: number;
  user: CurrentUser;
}

export interface Data {
  comments: Comment[];
  currentUser: CurrentUser;
}
