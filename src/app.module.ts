import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorsEntity } from 'src/features/colors/entity/colors.entity';
import { ColorsModule } from 'src/features/colors/colors.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
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
