import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { IAboutService, AboutService } from '../../../services/about.service';
import { Experience } from '../../../models/experience';
import * as $ from 'jquery';
import { BaseComponent } from '../../BaseComponent';
import { MOCK_EXPERIENCE } from 'src/app/services/mock/mock-about';

const middleMargin = 27;
const outerPadding = 36;

@Component({
  selector: 'app-about-experiences',
  templateUrl: './about-experiences.component.html',
  styleUrls: ['./about-experiences.component.css'],
  providers: [
    { provide: 'IAboutService', useClass: AboutService }
  ]
})
export class AboutExperiencesComponent extends BaseComponent implements OnInit {

  experiences: Experience[] = [];

  scrHeight: any;
  scrWidth: any;

  constructor(@Inject('IAboutService') private aboutService: IAboutService) {
    super();
    this.onResize();
  }

  ngOnInit() {
    this.getExperiences();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    $('div.experience').css('width', this.cellWidth());
  }

  cellWidth(): string {
    const outerPaddings = outerPadding * 2;
    if (this.scrWidth < 900) {
      const cellWidht = this.scrWidth - outerPaddings - 10;
      return cellWidht + 'px';
    }
    const cellWidth = ((this.scrWidth - outerPaddings - middleMargin) / 2) - 10;
    return cellWidth + 'px';
  }

  marginRightAt(index: number): string {
    if (this.scrWidth < 900) {
      return '0px';
    } if (index % 2 === 0) {
      return middleMargin + 'px';
    }
    return '0px';
  }

  getExperiences() {
    this.aboutService.getExperiences().subscribe((experiences) => {
      experiences.sort((a, b) => {
        return b.startDate - a.startDate;
      });
      this.experiences = experiences;
    },
      _ => this.experiences = MOCK_EXPERIENCE);
  }

}
