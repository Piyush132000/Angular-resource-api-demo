import { Component, resource, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list'
@Component({
  selector: 'app-resource-demo',
  imports: [MatProgressSpinnerModule, MatListModule],
  templateUrl: './resource-demo.component.html',
  styleUrl: './resource-demo.component.css',
})
export class ResourceDemoComponent {
  search = signal<string>('');

  //resourse requires two generic thing first type of data, resoures api going to fetch and resutn and search parameter,
  //second it required request and loader,
  // in request it take search parameter , whenever search signal value change resourese api request function will get latest value and
  // loader function is the one who going to invoke for fetch data from server so it should be async function
  // loader function get input argument , so here we receive request
  users = resource<User[], { search: string }>({
    request: () => ({
      search: this.search(),
    }),
    
    loader: async ({ request, abortSignal }) => {
      if (request.search) {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users', {
            signal:abortSignal
          }
        );
        const json = response.json();
        return json;
      }
      return [];
    },
  });

  setSerachValue(event: string): void {
    this.search.set(event);
  }

  resetSearch(): void {
    this.search.set('');
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
