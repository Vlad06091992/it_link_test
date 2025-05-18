import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { DataSource } from 'typeorm';

describe('e2e', () => {
  let app: INestApplication;

  const appDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'it_link',
    password: '12345',
    database: 'it_link_dev',
  });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    await appDataSource.initialize();
    await appDataSource.query(
      'INSERT INTO v_color (c_name, c_hex, c_rgb, created_at) VALUES\n' +
        "('Yellow', '#FFFF00', 'rgb(255, 255, 0)', NOW()),\n" +
        "('Red', '#FF0000', 'rgb(255, 0, 0)', NOW()),\n" +
        "('Green', '#00FF00', 'rgb(0, 255, 0)', NOW()),\n" +
        "('Blue', '#0000FF', 'rgb(0, 0, 255)', NOW()),\n" +
        "('Orange', '#FFA500', 'rgb(255, 165, 0)', NOW()),\n" +
        "('Purple', '#800080', 'rgb(128, 0, 128)', NOW()),\n" +
        "('Black', '#000000', 'rgb(0, 0, 0)', NOW()),\n" +
        "('White', '#FFFFFF', 'rgb(255, 255, 255)', NOW()),\n" +
        "('Gray', '#808080', 'rgb(128, 128, 128)', NOW()),\n" +
        "('Cyan', '#00FFFF', 'rgb(0, 255, 255)', NOW());",
    );

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
      await appDataSource.query('TRUNCATE TABLE v_color');
      await appDataSource.destroy();
    }
  });

  it('should get all colors without paginated', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getAllColors {
              name
              rgb
              hex
            }
          }
        `,
      });

    const result = response.body.data;
    expect(result.getAllColors.length).toBe(10);
    expect(result.getAllColors).toEqual([
      { name: 'Yellow', rgb: 'rgb(255, 255, 0)', hex: '#FFFF00' },
      { name: 'Red', rgb: 'rgb(255, 0, 0)', hex: '#FF0000' },
      { name: 'Green', rgb: 'rgb(0, 255, 0)', hex: '#00FF00' },
      { name: 'Blue', rgb: 'rgb(0, 0, 255)', hex: '#0000FF' },
      { name: 'Orange', rgb: 'rgb(255, 165, 0)', hex: '#FFA500' },
      { name: 'Purple', rgb: 'rgb(128, 0, 128)', hex: '#800080' },
      { name: 'Black', rgb: 'rgb(0, 0, 0)', hex: '#000000' },
      { name: 'White', rgb: 'rgb(255, 255, 255)', hex: '#FFFFFF' },
      { name: 'Gray', rgb: 'rgb(128, 128, 128)', hex: '#808080' },
      { name: 'Cyan', rgb: 'rgb(0, 255, 255)', hex: '#00FFFF' },
    ]);
  });

  it('should get first page colors', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getAllColors(pageNumber: 1) {
              name
              rgb
              hex
            }
          }
        `,
      });

    const result = response.body.data;
    expect(result.getAllColors.length).toBe(5);
    expect(result.getAllColors).toEqual([
      { name: 'Yellow', rgb: 'rgb(255, 255, 0)', hex: '#FFFF00' },
      { name: 'Red', rgb: 'rgb(255, 0, 0)', hex: '#FF0000' },
      { name: 'Green', rgb: 'rgb(0, 255, 0)', hex: '#00FF00' },
      { name: 'Blue', rgb: 'rgb(0, 0, 255)', hex: '#0000FF' },
      { name: 'Orange', rgb: 'rgb(255, 165, 0)', hex: '#FFA500' },
    ]);
  });

  it('should get second page colors', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            getAllColors(pageNumber: 2) {
              name
              rgb
              hex
            }
          }
        `,
      });

    const result = response.body.data;
    expect(result.getAllColors.length).toBe(5);
    expect(result.getAllColors).toEqual([
      { name: 'Purple', rgb: 'rgb(128, 0, 128)', hex: '#800080' },
      { name: 'Black', rgb: 'rgb(0, 0, 0)', hex: '#000000' },
      { name: 'White', rgb: 'rgb(255, 255, 255)', hex: '#FFFFFF' },
      { name: 'Gray', rgb: 'rgb(128, 128, 128)', hex: '#808080' },
      { name: 'Cyan', rgb: 'rgb(0, 255, 255)', hex: '#00FFFF' },
    ]);
  });

  it('should find exist color by name', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          query {
            findColorByName(name: "Red") {
              id
              name
              rgb
              hex
            }
          }
        `,
      })
      .expect(200);

    const result = response.body.data.findColorByName;
    expect(result).toEqual({
      id: expect.any(Number),
      name: 'Red',
      rgb: 'rgb(255, 0, 0)',
      hex: '#FF0000',
    });
  });

  it('should not add new color with invalid data', async () => {
    const colorData = {
      name: 'Какой-то тестовый цвет',
      hex: 'Какой-то тествый hex',
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        mutation AddColor {
          addColor(colorData: {
            name: "${colorData.name}",
            hex: "${colorData.hex}",
          }) {
            id
            name
            rgb
            hex
            created_at
          }
        }
      `,
      });

    expect(response.body).toEqual({
      errors: [
        {
          code: 'GRAPHQL_VALIDATION_FAILED',
          message:
            'Field "ColorCreateOrUpdateDTO.rgb" of required type "String!" was not provided.',
        },
      ],
    });
  });

  it('should add a new color', async () => {
    const colorData = {
      name: 'Какой-то тестовый цвет',
      hex: 'Какой-то тествый hex',
      rgb: 'Какой-то тествый rgb',
    };

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        mutation AddColor {
          addColor(colorData: {
            name: "${colorData.name}",
            hex: "${colorData.hex}",
            rgb: "${colorData.rgb}"
          }) {
            id
            name
            rgb
            hex
            created_at
          }
        }
      `,
      });
    expect(response.body.data.addColor).toEqual({
      ...colorData,
      id: expect.any(Number),
      created_at: expect.any(String),
    });
  });

  it('should update a color by id', async () => {
    const colorForUpdate = (
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          query {
            findColorByName(name: "Red") {
              id
              name
              rgb
              hex
            }
          }
        `,
        })
    ).body.data.findColorByName;

    const id = colorForUpdate.id;
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
      mutation {
        updateColorById(
          id: ${id},
          colorUpdateDTO: {
            name: "Новый тестовый цвет",
            hex: "новый тестовый hex",
            rgb: "новый тестовый rgb"
          }
        ) 
      }
    `,
      });
    expect(response.body.data.updateColorById).toBeTruthy();

    const updatedColor = (
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          query {
            findColorByName(name: "Новый тестовый цвет") {
              id
              name
              rgb
              hex
            }
          }
        `,
        })
    ).body.data.findColorByName;

    expect(updatedColor).toEqual({
      id: expect.any(Number),
      name: 'Новый тестовый цвет',
      hex: 'новый тестовый hex',
      rgb: 'новый тестовый rgb',
    });
  });

  let colorForRemoveId;

  it('should remove a color by id', async () => {
    const colorData = {
      name: 'тестовый цвет для удаления',
      hex: 'Какой-то тествый hex',
      rgb: 'Какой-то тествый rgb',
    };

    const newColor = (
      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
        mutation AddColor {
          addColor(colorData: {
            name: "${colorData.name}",
            hex: "${colorData.hex}",
            rgb: "${colorData.rgb}"
          }) {
            id
            name
            rgb
            hex
            created_at
          }
        }
      `,
        })
    ).body.data.addColor;
    colorForRemoveId = newColor.id;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            removeColorById(id: ${newColor.id})
          }
        `,
      });
    expect(response.body.data.removeColorById).toBeTruthy();
  });

  it('should dont remove not existed color', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            removeColorById(id: ${colorForRemoveId})
          }
        `,
      });
    expect(response.body.data.removeColorById).toBeFalsy();
  });
});
