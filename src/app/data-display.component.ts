// src/app/data-display.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { Post } from './post.interface';

@Component({
    selector: 'app-data-display',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="container">
      <h2 class="title">Posts from API</h2>
      
      <div class="button-group">
        <button (click)="sortData('id')" class="button">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 15V9m0 0l3-3m-3 3L4 6"/>
            <path d="M17 9v6m0 0l3 3m-3-3l-3 3"/>
          </svg>
          Sort by ID
        </button>
        <button (click)="sortData('title')" class="button">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M7 15V9m0 0l3-3m-3 3L4 6"/>
            <path d="M17 9v6m0 0l3 3m-3-3l-3 3"/>
          </svg>
          Sort by Title
        </button>
      </div>

      <div *ngIf="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>

      <div *ngIf="error" class="error" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>{{ error }}</span>
      </div>

      <div *ngIf="data && data.length > 0" class="post-list">
        <div *ngFor="let post of data" class="post">
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-body">{{ post.body }}</p>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .button-group {
      margin-bottom: 20px;
    }
    .button {
      background-color: #f0f0f0;
      border: none;
      padding: 10px 15px;
      margin-right: 10px;
      border-radius: 5px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
    }
    .button:hover {
      background-color: #e0e0e0;
    }
    .icon {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    .loading {
      text-align: center;
      padding: 20px;
    }
    .spinner {
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
      margin: 0 auto;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .error {
      background-color: #ffebee;
      border: 1px solid #ffcdd2;
      color: #b71c1c;
      padding: 10px;
      border-radius: 5px;
      display: flex;
      align-items: center;
    }
    .post-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .post {
      background-color: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
    }
    .post-title {
      font-size: 18px;
      font-weight: bold;
      margin-top: 0;
      margin-bottom: 10px;
    }
    .post-body {
      font-size: 14px;
      margin: 0;
    }
  `]
})
export class DataDisplayComponent implements OnInit {
    data: Post[] = [];
    loading = false;
    error = '';

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.fetchData();
    }

    async fetchData() {
        this.loading = true;
        this.error = '';
        try {
            this.data = await this.dataService.getData();
        } catch (error) {
            this.error = 'Error fetching data. Please try again later.';
        } finally {
            this.loading = false;
        }
    }

    sortData(key: 'id' | 'title') {
        this.data.sort((a, b) => {
            if (key === 'id') {
                return a.id - b.id;
            } else {
                return a.title.localeCompare(b.title);
            }
        });
    }
}