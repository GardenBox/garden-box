import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  header: string = '';

  constructor(public router: Router, public location: Location) { }

  ngOnInit(): void {
    this.header = this.extractChildUrl(this.location.path())

    this.router.events
    .pipe(
      filter((event: any) => event instanceof NavigationEnd)
    )
    .subscribe((data) => {
      console.log(data)
      this.header = this.extractChildUrl(data.url)
    })
  }

  extractChildUrl(path: string): string {
    let newPath = path.substring(1);
    const slashIndex = newPath.indexOf('/');
    newPath = newPath.substring(slashIndex + 1);
    return decodeURI(newPath);
  }
}
