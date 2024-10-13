import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsInt,
} from 'class-validator';

export class UpdateUserDto {
  @IsInt() // Sayısal ve integer olmalı
  @IsNotEmpty() // Boş olamaz, güncellenecek kaydın id'si zorunludur
  id: number;

  @IsString() // String tipinde olmalı
  @IsOptional() // Opsiyonel, sadece güncellenmek istenirse gönderilir
  name?: string;

  @IsString() // String tipinde olmalı
  @IsOptional() // Opsiyonel
  surname?: string;

  @IsEmail() // Geçerli bir e-posta formatında olmalı
  @IsOptional() // Opsiyonel
  email?: string;

  @IsString() // String tipinde olmalı
  @MinLength(6) // Minimum 6 karakter
  @MaxLength(20) // Maksimum 20 karakter
  @IsOptional() // Opsiyonel
  password?: string;

  @IsString() // String tipinde olmalı
  @IsOptional() // Opsiyonel
  phone?: string;

  @IsNumber() // Sayı olmalı
  @IsOptional() // Opsiyonel
  age?: number;

  @IsString() // String tipinde olmalı
  @IsOptional() // Opsiyonel
  country?: string;

  @IsString() // String tipinde olmalı
  @IsOptional() // Opsiyonel
  district?: string;

  @IsString() // String tipinde olmalı
  @IsOptional() // Opsiyonel
  role?: string;
}
