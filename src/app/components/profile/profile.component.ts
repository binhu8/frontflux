import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login/login.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public downChevron = faCircleChevronDown

  public response: any = {
    img: 'https://i.ibb.co/PZBSyT5/carol.png',
    name: 'Carol Amaral'
  }

  constructor(
    private loginService: LoginService,
    private userDataService: UserDataService,
    private router: Router) { }

  ngOnInit(): void {
   let item: any  = localStorage.getItem('userData')

   this.response = JSON.parse(item)
   this.response.hasOwnProperty('perfilImage') ? false : this.response.perfilImage.url = "https://i.ibb.co/PZBSyT5/carol.png"
   console.log(this.response)
  
  }

  logout(){
    this.router.navigate(['/login']);
    localStorage.clear()
  }

 

}
