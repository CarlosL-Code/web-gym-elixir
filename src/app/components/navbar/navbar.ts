import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html'
})
export class Navbar {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeTheme = 'theme-orange';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  setTheme(themeName: string) {
    this.activeTheme = themeName;
    document.body.classList.remove('theme-blue', 'theme-orange', 'theme-purple');
    document.body.classList.add(themeName);
  }
}
