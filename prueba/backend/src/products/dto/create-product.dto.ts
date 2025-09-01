import { IsString, IsNumber, IsNotEmpty } from 'class-validator';   

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()   
    price: number;

    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsNumber()
    @IsNotEmpty()   
    stock: number; 

    @IsString()
    @IsNotEmpty()
    image: string;
}
