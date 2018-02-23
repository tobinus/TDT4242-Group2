import { Component, OnInit } from '@angular/core';

import { UserAuthService } from "../_shared/services/user-auth.service";
import { UserModel } from "../_shared/app.models";

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css']
})
export class MypageComponent implements OnInit {

  private currentUser: UserModel;

  constructor(
    private userAuthService: UserAuthService,
  ) { }

  ngOnInit() {
    this.userAuthService.getCurrentUser().subscribe(
      user => this.currentUser = user,
      error => {/*Not logged in*/}
    );
  }

}
