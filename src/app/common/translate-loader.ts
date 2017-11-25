import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../globals';
// import { environment } from '../../environments/environment';
// import {LocalizeRouterHttpLoader} from 'localize-router-http-loader';
// import {LocalizeRouterSettings} from 'localize-router';
// import {Location} from '@angular/common';

// implements TranslateLoader
@Injectable()
export class CustomTranslateLoader implements TranslateLoader {

    constructor(public http: HttpClient, private globals: Globals ) {
        this.globals.setEnvData();
    }

    public getTranslation(lang: string): Observable<any> {
        console.log('getTranslation', lang);
        return this.http.get(`${this.globals.environment.apiUrl}/translations?language=${lang}`,
            {
                headers: new HttpHeaders().set('Accept-Language', lang),
            }
        )
    }
}

/*export function HttpLoaderFactory(translate: TranslateService, location: Location, settings: LocalizeRouterSettings, http: HttpClient) {
    return new LocalizeRouterHttpLoader(translate, location, settings, http, 'assets/locales.json');
}*/

export function defaultLangFunction() {
    return 'ua';
}
