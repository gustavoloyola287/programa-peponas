import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'rovin',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    CategoriesModule,
    AuthModule,
     
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60_000, limit: 10, }],})],  //60 segundos, 10 solicitudes

  controllers: [AppController],
  providers: [
    { provide: 'APP_GUARD', useClass: ThrottlerModule },
    AppService], 
 
})

export class AppModule {}
  