import { Component, OnInit, resource, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { api } from '../../environment';
@Component({
  selector: 'app-resource-demo',
  imports: [MatProgressSpinnerModule, MatListModule, CommonModule],
  templateUrl: './resource-demo.component.html',
  styleUrl: './resource-demo.component.css',
})
export class ResourceDemoComponent implements OnInit {
  search = signal<number>(0);

  users = resource<User[], { search: number }>({
    request: () => ({
      search: this.search(),
    }),

    loader: async ({ request, abortSignal }) => {
      const url = request.search ? `${api}/${request.search}` : api;

      const response = await fetch(url, {
        signal: abortSignal,
      });
    
      if(response.ok){
        const json = response.json();
        const data = await json;
        return Array.isArray(data)? data: [data]
      } else {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
    },
    
  });

  ngOnInit(): void {
   
  }

  setSerachValue(event: number): void {
    this.search.set(event);
  }

  resetSearch(): void {
    this.search.set(0);
  }
}

interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
