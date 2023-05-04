import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express/multer';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartModule } from './cart/cart.module';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { Category } from './categories/entities/category.entity';
import { Cart } from './cart/entities/cart.entity';
import { AuthModule } from './auth/auth.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { CartItem } from './cart-item/entities/cart-item.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME, 
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Product, Category, Cart, CartItem,],
      synchronize: true,
      logging: false,
    }),
     MulterModule.register({
        dest: './upload',
    }),
    
     ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
    }), 
    
    UsersModule,
    
    ProductsModule,
    
    CategoriesModule,
    
    CartModule,
    
    AuthModule,
    
    CartItemModule,
     
  ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_PIPE, useClass: ValidationPipe}
  
  ]
})
export class AppModule {}
