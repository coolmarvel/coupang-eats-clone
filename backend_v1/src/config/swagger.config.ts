import { registerAs } from '@nestjs/config';

export default registerAs('swagger', async () => ({
  user: process.env.SWAGGER_USER,
  pass: process.env.SWAGGER_PASS,
}));
