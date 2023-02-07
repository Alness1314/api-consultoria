import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigKeys } from './utils/keys/config.keys';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { CitiesModule } from './cities/cities.module';
import { AddressModule } from './address/address.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    ProfilesModule,
    DatabaseModule,
    AuthModule,
    CompanyModule,
    CountryModule,
    StateModule,
    CitiesModule,
    AddressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _config: ConfigService) {
    AppModule.port = this._config.get(ConfigKeys.PORT_APP);
  }
}
