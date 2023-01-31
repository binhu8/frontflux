import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Endereco } from 'src/app/models/endereco';
import { CepService } from 'src/app/services/cep/cep.service';
import { SignOutService } from 'src/app/services/sign-out/sign-out.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {
  public error: any = {}
  public form: FormGroup = new FormGroup({
    perfilImage: new FormGroup({
      createdAt: new FormControl(''),
      key: new FormControl(''),
      name: new FormControl(''),
      size: new FormControl(''),
      url: new FormControl('https://cdn-icons-png.flaticon.com/512/5965/5965613.png'),
      __v: new FormControl(''),
      _id: new FormControl('')
    }),
    nome: new FormControl('', Validators.required),
    sobrenome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    crp: new FormControl('', Validators.required),
    dataNascimento: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    confirmSenha: new FormControl('', Validators.required),
    valorConsultaPadrao: new FormControl('', Validators.required),
    chavePix: new FormControl('', Validators.required),
    endereco: new FormGroup({
      numero: new FormControl(''),
      cep:  new FormControl(''),
      logradouro:  new FormControl(''),
      complemento:  new FormControl(''),
      bairro:  new FormControl(''),
      localidade:  new FormControl(''),
      uf:  new FormControl(''),
     
    })

    
  })

  constructor(
    private router: Router, 
    private cepService: CepService, 
    private signOutService: SignOutService,
    private loadingService: LoadingService,
    private userDataService: UserDataService,
    ) { }

  ngOnInit(): void {
  }

  public getEndereco(cep: any): void {
    this.loadingService.show()
    let newCep = cep.replace('-', '').replace('.', '');

    this.cepService.getCep(newCep).subscribe((res: Endereco) => {
      this.form.patchValue({endereco: res})
      this.loadingService.hide()
    });
  }

  public addNewUser(): void {
    this.loadingService.show()
    let crp = this.form.value.crp.slice('/')
    this.form.patchValue({crp: crp})
    this.signOutService.addNewUser(this.form.value).subscribe(res => {
        res.error ? this.error = res : this.router.navigate(['login'])
        this.loadingService.hide()
    })
  }

  uploadImage(event: any){
    if(event.target.files[0]){
      console.log(event)
      let selectedImage: File = <File>event.target.files[0];
      let formData: FormData = new FormData();

      formData.append('file', selectedImage, selectedImage.name);
      this.loadingService.show()
      this.userDataService.uploadImg(formData).subscribe((res:any) => {
        this.form.patchValue({perfilImage: res});
        console.log(this.form.value)
        this.loadingService.hide()
      })
    }
  }

  checkSenha(){
    if(this.form.value.senha == this.form.value.confirmSenha){
      console.log("aqui")
      this.error = {
        password: false,
        message: ""
      }
    }else{
      this.error = {
        password: true,
        message: 'As senhas são diferentes'
      }
    }
  }
}
