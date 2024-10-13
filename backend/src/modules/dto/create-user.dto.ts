import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString() // String tipinde olmalı
  @IsNotEmpty() // Boş olamaz
  name: string;

  @IsString() // String tipinde olmalı
  @IsNotEmpty() // Boş olamaz
  surname: string;

  @IsEmail() // Geçerli bir e-posta olmalı
  @IsNotEmpty() // Boş olamaz
  email: string;

  @IsString() // String tipinde olmalı
  @MinLength(6) // Minimum 6 karakter
  @MaxLength(20) // Maksimum 20 karakter
  password: string;

  @IsString() // String tipinde olmalı
  @IsNotEmpty() // Boş olamaz
  phone: string;

  @IsNumber() // Sayı olmalı
  @IsOptional() // Opsiyonel alan
  age?: number;

  @IsString() // String tipinde olmalı
  @IsNotEmpty() // Boş olamaz
  country: string;

  @IsString() // String tipinde olmalı
  @IsNotEmpty() // Boş olamaz
  district: string;

  @IsString() // String tipinde olmalı
  @IsOptional() // Opsiyonel alan
  role?: string;
}
