import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly translate = inject(TranslateService);

  switchLanguage() {
    const lang = this.translate.getCurrentLang() === 'en' ? 'ru' : 'en';
    this.translate.use(lang);
  }
}
