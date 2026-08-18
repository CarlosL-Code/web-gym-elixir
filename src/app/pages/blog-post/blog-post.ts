import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BlogService, BlogPost } from '../../services/blog.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.css',
  encapsulation: ViewEncapsulation.None
})
export class BlogPostComponent implements OnInit {
  post: BlogPost | undefined;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private meta: Meta,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.post = this.blogService.getPostBySlug(slug);
      
      if (this.post) {
        // Dynamic SEO injection - this is what Google loves
        this.titleService.setTitle(`${this.post.title} | Elixir Gym Temuco`);
        this.meta.updateTag({ name: 'description', content: this.post.summary });
        this.meta.updateTag({ property: 'og:title', content: this.post.title });
        this.meta.updateTag({ property: 'og:description', content: this.post.summary });
        this.meta.updateTag({ property: 'og:image', content: `https://elixirgym.cl${this.post.imageUrl}` });
      }
    }
    
    // Smooth scroll to top
    window.scrollTo(0, 0);
  }
}
