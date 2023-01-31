import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from 'src/app/core/services/loading.service';
import { LoginService } from 'src/app/services/login/login.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public error: any = {}

  public form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  
  public faLock = faLock
  constructor(
    private loginService: LoginService, 
    private router: Router,
    private loadingSerive: LoadingService,
    private userDataService: UserDataService
    ) { }

  ngOnInit(): void {
  }

  checkLogin(){
    this.loadingSerive.show()
    this.loginService.checkUserLogin(this.form.value).subscribe(res => {
      if(res.error){
        this.error = res
      }else{
        localStorage.clear()
        
        if(res.perfilImage){
          this.userDataService.getPerfilImage(res.perfilImage._id).subscribe((data:any) => {
            res.perfilImage.url = data.url
            let user = JSON.stringify(res)
            localStorage.setItem('userData', user );
            localStorage.setItem('crp', res.crp)
            this.router.navigate(['/'])
            this.loadingSerive.hide()
          })
        }else{
            if(!res.hasOwnProperty('perfilImage')){
              res.perfilImage = {url: 'https://img.freepik.com/psd-gratuitas/ilustracao-3d-de-pessoa_23-2149436179.jpg?w=740&t=st=1674842842~exp=1674843442~hmac=71c9f6e8c2d5680117177008f965b4a9c78abc254ab376363fc6a8f26375e055'}
            }
            
            console.log(res )
            let user = JSON.stringify(res)
            localStorage.setItem('userData', user );
            localStorage.setItem('crp', res.crp)
            this.router.navigate(['/'])
            this.loadingSerive.hide()
        } 
      }
      
    })
  }

}
