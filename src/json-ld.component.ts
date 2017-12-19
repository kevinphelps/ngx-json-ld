import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ngx-json-ld',
  template: ''
})
export class JsonLdComponent implements OnChanges {
  @Input() json;
  @HostBinding('innerHTML') jsonLD: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges) {
    this.jsonLD = this.getSafeHTML(changes.json.currentValue);
  }

  getSafeHTML(value: {}) {
    const json = JSON.stringify(value, null, 2).replace(/\//g, '\\/');
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
