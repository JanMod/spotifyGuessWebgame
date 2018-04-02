import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../service/restApi.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  private name: string;
  constructor(private rest: RestApiService, private user: UserService, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    this.rest.createUser({ name: this.name }).subscribe(
      response => {
        this.user.setUser(response);
        console.log(response);
        this.router.navigate(['/rooms'], {replaceUrl: true});
      },
      error => {
        console.error(error);
      }
    );
  }
}
