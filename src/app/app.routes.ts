import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Blog } from './pages/blog/blog';
import { BlogPostComponent } from './pages/blog-post/blog-post';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: Blog },
  { path: 'blog/:slug', component: BlogPostComponent },
  { path: '**', redirectTo: '' }
];
