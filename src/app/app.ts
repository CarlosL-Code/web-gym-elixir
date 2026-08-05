import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Hero } from './components/hero/hero';
import { Benefits } from './components/benefits/benefits';
import { Plans } from './components/plans/plans';
import { Classes } from './components/classes/classes';
import { Trainers } from './components/trainers/trainers';
import { Gallery } from './components/gallery/gallery';
import { Stats } from './components/stats/stats';
import { Testimonials } from './components/testimonials/testimonials';
import { Faq } from './components/faq/faq';
import { Contact } from './components/contact/contact';
import { Location } from './components/location/location';
import { FinalCta } from './components/final-cta/final-cta';
import { Footer } from './components/footer/footer';
import { WhatsappButton } from './components/whatsapp-button/whatsapp-button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Navbar, Hero, Benefits, Plans, Classes, Trainers, Gallery, Stats, Testimonials, Faq, Contact, Location, FinalCta, Footer, WhatsappButton
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'web-gym';
}
