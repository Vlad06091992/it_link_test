import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsEntity } from 'src/features/colors/entity/colors.entity';
import { ColorsModule } from 'src/features/colors/colors.module';

type ErrorMessage = {
  code: string;
  message: string;
};

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      formatError: (error): ErrorMessage => {
        const originalError = error.extensions?.originalError as Error;

        if (!originalError) {
          return {
            message: error.message,
            code: error.extensions?.code as string,
          };
        }
        return {
          message: originalError.message,
          code: error.extensions?.code as string,
        };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'it_link',
      password: '12345',
      database: 'it_link',
      entities: [ColorsEntity],
      autoLoadEntities: false,
      synchronize: true,
      logging: true,
    }),
    ColorsModule,
  ],
})
export class AppModule {}
