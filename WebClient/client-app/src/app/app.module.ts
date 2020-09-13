import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import * as oauth from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';
import { JwtModule } from '@auth0/angular-jwt';

/*
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('275522551146-4iqrvuhvldejge2o4el77ia22gs2l2pb.apps.googleusercontent.com')
  }
]);

export function provideConfig() {
  return config;
}

PROVIDERS:
 oauth.AuthService, {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }

*/


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      AppRoutingModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      BrowserModule,
      NgbModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      HighchartsChartModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: () => {
             return localStorage.getItem('token');
          },
          whitelistedDomains: ['localhost:4200', 'localhost:44374'],
        }
      })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
