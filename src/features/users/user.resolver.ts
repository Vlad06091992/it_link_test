import { Resolver, Query, Args } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  users(): User[] {
    return this.userService.findAll();
  }

  @Query(() => User)
  user(@Args('id') id: string): User {
    return this.userService.findOneById(id);
  }
}
