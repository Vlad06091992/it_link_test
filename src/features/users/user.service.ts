import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOneById(id: string): User {
    return this.users.find((user) => user.id === id);
  }
}
