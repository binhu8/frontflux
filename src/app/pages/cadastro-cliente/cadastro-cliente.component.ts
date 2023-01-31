import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/core/services/loading.service';
import { CepService } from 'src/app/services/cep/cep.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { UserDataService } from 'src/app/services/user-data/user-data.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {
  public crpResponsavel: string | null = ''
  public teste = ''
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
    crpResponsavel: new FormControl('',),
    cpf: new FormControl('', Validators.required), 
    dataNascimento: new FormControl('', Validators.required), 
    telefone: new FormControl('', Validators.required), 
    contatoEmergencia: new FormGroup({
      numero: new FormControl('', Validators.required),
      nome: new FormControl('',Validators.required)
    }),
    email: new FormControl('', Validators.required), 
    endereco: new FormGroup({
      cep: new FormControl('', Validators.required),
      logradouro: new FormControl('', Validators.required),
      numero: new FormControl('', Validators.required),
      complemento: new FormControl(''),
      bairro: new FormControl('',Validators.required),
      localidade: new FormControl('',Validators.required),
      uf: new FormControl('',Validators.required)
    })
  })
  constructor(
    private clienteService: ClienteService, 
    private cepService: CepService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userDataService: UserDataService,
    private loadingService: LoadingService) { }

  ngOnInit(): void {

    this.crpResponsavel = this.activatedRoute.snapshot.paramMap.get('crp')
    if(this.crpResponsavel != null) this.form.patchValue({crpResponsavel: this.crpResponsavel})
  }

  addCliente(): void{
    this.loadingService.show()
    this.clienteService.addCliente(this.form.value).subscribe(res => {
      this.router.navigate(['/obrigado'])
      this.loadingService.hide()
    })
  }
  

  getEndereco(cep: string): void {
     let newCep = cep.replace('-', '').replace('.', '')
    this.cepService.getCep(newCep).subscribe(res => {
      console.log(res)
      this.form.patchValue({endereco: res})
      console.log(this.form.value)
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
