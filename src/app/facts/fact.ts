import { Comment } from './comment';

export class Fact {
  id?: string;
  author: string;
  authorId: string;
  authorPhoto: string;
  content: string;
  image: string;
  published: Date;
  title: string;
  category: Array<string>;
  comments: Array<Comment>;
}
