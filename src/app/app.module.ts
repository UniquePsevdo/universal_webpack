import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppHomeComponent } from './components/app-home';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader } from 'localize-router';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomTranslateLoader, defaultLangFunction } from './common/translate-loader';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
// import { HeaderComponent } from './header/header.component';
// import { LangSwitcherComponent } from './header/lang-switcher/lang-switcher.component';
// import { MaterialModule } from './common/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'my-app'})
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
