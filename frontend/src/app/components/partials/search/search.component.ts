import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchValue: string = '';
  constructor(activatedRoute: ActivatedRoute, private router: Router) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchValue) {
        this.searchValue = params.searchValue;
      }
    });
  }
  submitSearch(value: string): void {
    if (value) {
      this.router.navigateByUrl('/search/' + value);
    }
  }
}
