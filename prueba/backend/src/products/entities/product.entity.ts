import { Category } from 'src/categories/entities/category.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()   
    id: number;

    @Column()
    name: string;

    @Column('float')
    price: number;

    @Column() 
    description: string;

    @Column()
    stock: number;

    @Column()
    image: string;  

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
    
    @CreateDateColumn()
    deletedAt: Date;
    
    @ManyToOne(() => Category, (category) => category.id, {eager: true})
    category: Category;
}
