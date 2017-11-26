import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { AppModule, routes } from './app.module';
import { AppComponent } from './app.component';
import { Globals } from './globals';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader } from 'localize-router';
import { RouterModule, Routes } from '@angular/router';
import * as fs from 'fs';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { defaultLangFunction } from './common/translate-loader';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
Globals.setEnvironment('prod');

export class LocalizeUniversalLoader extends LocalizeParser {
    /**
     * Gets config from the server
     * @param routes
     */
    public load (routes: Routes): Promise<any> {
        return new Promise((resolve: any) => {
            let data: any = JSON.parse(fs.readFileSync( ( 'src/app/assets/locales.json'), 'utf8'));
            this.locales = data.locales;
            this.prefix = data.prefix;
            this.init(routes).then(resolve);
        });
    }
}

export function localizeLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
    return new LocalizeUniversalLoader(translate, location, settings);
}

export class TranslateUniversalLoader implements TranslateLoader {
    /**
     * Gets the translations from the server
     * @param lang
     * @returns {any}
     */
    public getTranslation(lang: string): Observable<any> {
        return Observable.create(observer => {
            observer.next(JSON.parse(fs.readFileSync(( 'src/app/assets/locales/' + lang + '.json'), 'utf8')));
            observer.complete();
        });
    }
}
export function translateLoaderFactory() {
    return new TranslateUniversalLoader();
}


@NgModule({
    imports: [TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: translateLoaderFactory
        }
    }),
        RouterModule.forRoot(routes),
        LocalizeRouterModule.forRoot(routes, {
            parser: {
                provide: LocalizeParser,
                useFactory: (translate, location, settings) =>
                    new ManualParserLoader(translate, location, settings, ['ua', 'en'], 'ROUTES'),
                deps: [TranslateService, Location, LocalizeRouterSettings]
            },
            alwaysSetPrefix: false,
            useCachedLang: false,
            defaultLangFunction: defaultLangFunction
        }),
        AppModule,
        ServerModule,
        ModuleMapLoaderModule
    ],
    bootstrap: [AppComponent]
})
export class AppServerModule {
}
