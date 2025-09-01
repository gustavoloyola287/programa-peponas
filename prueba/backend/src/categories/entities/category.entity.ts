import { Product } from 'src/products/entities/product.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    deletedAt: Date;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}
