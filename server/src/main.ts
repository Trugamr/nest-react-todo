import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.setGlobalPrefix('api')
  await app.listen(PORT, () => {
    console.log(`🌊🌸 listening on port ${PORT}`)
  })
}
bootstrap()
