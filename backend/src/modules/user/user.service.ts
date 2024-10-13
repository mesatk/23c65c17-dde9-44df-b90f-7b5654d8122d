import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getUsersWithPagination(
    page: number,
    pageSize: number,
    search?: string,
  ) {
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // Temel sorgu
    let query = `SELECT * FROM "user" `;
    let countQuery = `SELECT COUNT(*) FROM "user"`;

    // search parametresi
    if (search) {
      query += `WHERE name ILIKE $1 OR surname ILIKE $1 `;
      countQuery += `WHERE name ILIKE $1 OR surname ILIKE $1 OR email ILIKE $1 `;
      query += `ORDER BY createdAt DESC LIMIT $2 OFFSET $3`;

      // Search varsa parametre olarak kullan
      const params = [`%${search}%`, limit, offset];
      const countParams = [`%${search}%`];

      const users = await this.databaseService.query(query, params);
      const total = await this.databaseService.query(countQuery, countParams);

      return {
        data: users,
        total: parseInt(total[0].count, 10),
        page,
        pageSize,
      };
    } else {
      query += `ORDER BY createdAt DESC LIMIT $1 OFFSET $2`;

      // Parametreler sadece limit ve offset olacak
      const params = [limit, offset];
      const countQuery = 'SELECT COUNT(*) FROM "user"';

      const users = await this.databaseService.query(query, params);
      const total = await this.databaseService.query(countQuery);

      return {
        data: users,
        total: parseInt(total[0].count, 10),
        page,
        pageSize,
      };
    }
  }

  async getUserById(id: number) {
    const query = `SELECT * FROM "user" WHERE id = $1`;
    const result = await this.databaseService.query(query, [id]);

    if (result.length === 0) {
      return null;
    }

    return result[0];
  }

  async createUser(createUserDto: CreateUserDto) {
    const {
      name,
      surname,
      email,
      password,
      phone,
      age,
      country,
      district,
      role,
    } = createUserDto;

    // Password hash
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO "user" (name, surname, email, password, phone, age, country, district, role, createdAt, updatedAt)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      RETURNING id;
    `;

    const params = [
      name,
      surname,
      email,
      hashedPassword,
      phone,
      age,
      country,
      district,
      role,
    ];

    const result = await this.databaseService.query(query, params);
    return { message: 'Kullanıcı başarıyla kaydedildi', userId: result[0].id };
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const {
      id,
      name,
      surname,
      email,
      password,
      phone,
      age,
      country,
      district,
      role,
    } = updateUserDto;

    // Mevcut kullanıcıyı bul
    const userQuery = `SELECT * FROM "user" WHERE id = $1`;
    const user = await this.databaseService.query(userQuery, [id]);

    if (user.length === 0) {
      return null; // Kullanıcı bulunamadı
    }

    // Güncellenmesi gereken SQL sorgusunu dinamik olarak oluşturuyoruz
    const updates = [];
    const params = [];
    let paramIndex = 1;

    if (name) {
      updates.push(`name = $${paramIndex++}`);
      params.push(name);
    }
    if (surname) {
      updates.push(`surname = $${paramIndex++}`);
      params.push(surname);
    }
    if (email) {
      updates.push(`email = $${paramIndex++}`);
      params.push(email);
    }
    if (password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      updates.push(`password = $${paramIndex++}`);
      params.push(hashedPassword);
    }
    if (phone) {
      updates.push(`phone = $${paramIndex++}`);
      params.push(phone);
    }
    if (age) {
      updates.push(`age = $${paramIndex++}`);
      params.push(age);
    }
    if (country) {
      updates.push(`country = $${paramIndex++}`);
      params.push(country);
    }
    if (district) {
      updates.push(`district = $${paramIndex++}`);
      params.push(district);
    }
    if (role) {
      updates.push(`role = $${paramIndex++}`);
      params.push(role);
    }

    // Eğer güncellenecek veri varsa update işlemi yap
    if (updates.length > 0) {
      const query = `
        UPDATE "user"
        SET ${updates.join(', ')}, updatedAt = NOW()
        WHERE id = $${paramIndex}
        RETURNING *;
      `;
      params.push(id);

      const result = await this.databaseService.query(query, params);
      return result[0]; // Güncellenmiş kullanıcı
    }

    // Güncellenecek veri yoksa mevcut kullanıcıyı döndür
    return user[0];
  }
}
