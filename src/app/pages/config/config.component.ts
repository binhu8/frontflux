import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/core/services/loading.service';
import { CepService } from 'src/app/services/cep/cep.service';
import { SignOutService } from 'src/app/services/sign-out/sign-out.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  public userData: any = {}
  public readonly: boolean = true
  constructor(
    private userDataService: UserDataService, 
    private signOutservice: SignOutService,
    private cepService: CepService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.userData = this.userDataService.getUserData()
  }

  updateUser(): void{
    this.loadingService.show()
    this.userDataService.updateUser(this.userData).subscribe((res: any) => {
      let user = JSON.stringify(res)
      localStorage.setItem('userData', user)
      this.userData = this.userDataService.getUserData()
      this.readonly = true
      this.loadingService.hide()
    })
  }

  getCep(cep: string): void{
    this.loadingService.show()
    let newCep = cep.replace('-', '')
    this.cepService.getCep(newCep).subscribe(res => {
      this.userData.endereco = res
      this.loadingService.hide()
    })
  }

}
