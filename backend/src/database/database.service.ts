import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private client: Client;

  // constructor() {
  //   this.client = new Client({
  //     host: 'localhost',
  //     port: 5432,
  //     user: 'postgres',
  //     password: '3728',
  //     database: 'postgres',
  //   });
  // }
  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      host: this.configService.get<string>('DB_HOST'), // .env dosyasından host
      port: this.configService.get<number>('DB_PORT'), // .env dosyasından port
      user: this.configService.get<string>('DB_USER'), // .env dosyasından user
      password: this.configService.get<string>('DB_PASSWORD'), // .env dosyasından password
      database: this.configService.get<string>('DB_INIT'), // .env dosyasından veritabanı adı
    });
  }

  async onModuleInit() {
    await this.client.connect();

    // Veritabanı kontrolü
    await this.createDatabase();

    await this.client.end();

    // USERDOT veritabanına bağlan
    this.client = new Client({
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      user: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
    });

    await this.client.connect();

    // User tablosu kontrolü
    await this.createUserTable();

    // Mock data ekleme
    await this.insertMockData();

    console.log('Veritabanı ve tablo başarıyla oluşturuldu!');
  }

  async createDatabase() {
    const result = await this.client.query(
      `SELECT 1 FROM pg_database WHERE datname='${this.configService.get<string>('DB_NAME')}';`,
    );

    if (result.rows.length === 0) {
      await this.client.query(
        `CREATE DATABASE "${this.configService.get<string>('DB_NAME')}";`,
      );
      console.log(
        `Veritabanı oluşturuldu: ${this.configService.get<string>('DB_NAME')}`,
      );
    } else {
      console.log(
        `Veritabanı zaten var: ${this.configService.get<string>('DB_NAME')}`,
      );
    }
  }

  async createUserTable() {
    const tableExists = await this.client.query(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'user'
      );`,
    );

    if (!tableExists.rows[0].exists) {
      const query = `
        CREATE TABLE IF NOT EXISTS "user" (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255),
          surname VARCHAR(255),
          email VARCHAR(255) UNIQUE,
          password VARCHAR(255),
          phone VARCHAR(15),
          age INT,
          country VARCHAR(255),
          district VARCHAR(255),
          role VARCHAR(50),
          createdAt TIMESTAMPTZ DEFAULT NOW(),
          updatedAt TIMESTAMPTZ DEFAULT NOW()
        );
      `;
      await this.client.query(query);
      console.log('User tablosu oluşturuldu.');
    } else {
      console.log('User tablosu zaten var.');
    }
  }

  async insertMockData() {
    const count = await this.client.query('SELECT COUNT(*) FROM "user";');
    if (parseInt(count.rows[0].count, 10) === 0) {
      const mockUsers = [
        {
          name: 'Ahmet',
          surname: 'Yılmaz',
          email: 'ahmet.yilmaz@example.com',
          password: 'password123',
          phone: '555-1111',
          age: 29,
          country: 'Turkey',
          district: 'İstanbul',
          role: 'admin',
        },
        {
          name: 'Ayşe',
          surname: 'Demir',
          email: 'ayse.demir@example.com',
          password: 'password123',
          phone: '555-2222',
          age: 32,
          country: 'Turkey',
          district: 'Ankara',
          role: 'user',
        },
        {
          name: 'Mehmet',
          surname: 'Kaya',
          email: 'mehmet.kaya@example.com',
          password: 'password123',
          phone: '555-3333',
          age: 40,
          country: 'Turkey',
          district: 'İzmir',
          role: 'user',
        },
        {
          name: 'Fatma',
          surname: 'Çelik',
          email: 'fatma.celik@example.com',
          password: 'password123',
          phone: '555-4444',
          age: 25,
          country: 'Turkey',
          district: 'Antalya',
          role: 'user',
        },
        {
          name: 'Ali',
          surname: 'Şahin',
          email: 'ali.sahin@example.com',
          password: 'password123',
          phone: '555-5555',
          age: 35,
          country: 'Turkey',
          district: 'Bursa',
          role: 'admin',
        },
        {
          name: 'Zeynep',
          surname: 'Yıldırım',
          email: 'zeynep.yildirim@example.com',
          password: 'password123',
          phone: '555-6666',
          age: 28,
          country: 'Turkey',
          district: 'Adana',
          role: 'user',
        },
        {
          name: 'Hakan',
          surname: 'Koç',
          email: 'hakan.koc@example.com',
          password: 'password123',
          phone: '555-7777',
          age: 33,
          country: 'Turkey',
          district: 'Gaziantep',
          role: 'user',
        },
        {
          name: 'Elif',
          surname: 'Aydın',
          email: 'elif.aydin@example.com',
          password: 'password123',
          phone: '555-8888',
          age: 27,
          country: 'Turkey',
          district: 'Kayseri',
          role: 'user',
        },
        {
          name: 'Murat',
          surname: 'Öztürk',
          email: 'murat.ozturk@example.com',
          password: 'password123',
          phone: '555-9999',
          age: 42,
          country: 'Turkey',
          district: 'Samsun',
          role: 'admin',
        },
        {
          name: 'Seda',
          surname: 'Aksoy',
          email: 'seda.aksoy@example.com',
          password: 'password123',
          phone: '555-1010',
          age: 30,
          country: 'Turkey',
          district: 'Konya',
          role: 'user',
        },
      ];

      for (const user of mockUsers) {
        await this.client.query(
          `INSERT INTO "user" (name, surname, email, password, phone, age, country, district, role)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            user.name,
            user.surname,
            user.email,
            user.password,
            user.phone,
            user.age,
            user.country,
            user.district,
            user.role,
          ],
        );
      }
      console.log('Mock veriler eklendi.');
    } else {
      console.log('Tabloda zaten veri var.');
    }
  }

  async query(query: string, params?: any[]): Promise<any> {
    try {
      const result = await this.client.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Sorgu çalıştırılırken bir hata oluştu:', error);
      throw new Error(
        `Veritabanı sorgusu sırasında bir hata oluştu: ${error.message}`,
      );
    }
  }
}
