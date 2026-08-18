import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogService, BlogPost } from '../../services/blog.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog.html',
  styleUrl: './blog.css'
})
export class Blog implements OnInit {
  posts: BlogPost[] = [];

  constructor(
    private blogService: BlogService,
    private meta: Meta,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.posts = this.blogService.getPosts();
    
    // SEO for Blog index
    this.titleService.setTitle('Blog Fitness y Entrenamiento en Temuco | Elixir Gym');
    this.meta.updateTag({ name: 'description', content: 'Descubre los mejores consejos de entrenamiento, rutinas y noticias sobre el mundo del fitness en nuestro gimnasio en Temuco Centro.' });
    
    // Smooth scroll to top
    window.scrollTo(0, 0);
  }
}
