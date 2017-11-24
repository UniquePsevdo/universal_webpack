import './styles';
import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app/app.module';
//set api url here

platformBrowserDynamic().bootstrapModule(AppModule);
