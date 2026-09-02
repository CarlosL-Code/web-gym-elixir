import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Benefits } from '../../components/benefits/benefits';
import { Plans } from '../../components/plans/plans';
import { Classes } from '../../components/classes/classes';
import { Trainers } from '../../components/trainers/trainers';
import { Gallery } from '../../components/gallery/gallery';
import { Stats } from '../../components/stats/stats';
import { Partners } from '../../components/partners/partners';
import { Testimonials } from '../../components/testimonials/testimonials';
import { Faq } from '../../components/faq/faq';
import { Contact } from '../../components/contact/contact';
import { Location } from '../../components/location/location';
import { FinalCta } from '../../components/final-cta/final-cta';
import { VideoShowcase } from '../../components/video-showcase/video-showcase';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, VideoShowcase, Benefits, Plans, Classes, Trainers, Gallery, Stats, Partners, Testimonials, Faq, Contact, Location, FinalCta],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
