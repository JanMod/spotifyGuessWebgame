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
  private error: boolean;
  private groupForm: any;
  constructor(private rest: RestApiService, private user: UserService, private router: Router) {
    this.error = false;
  }

  ngOnInit() {
  }

  submit() {
    this.rest.createUser({ name: this.name }).subscribe(
      response => {
        this.user.setUser(response);
        this.rest.connectUserWs(this.user.getToken(), null);
        this.router.navigate(['/rooms'], { replaceUrl: true });
      },
      error => {
        this.error = true;
        console.error(error);
      }
    );
  }
}
