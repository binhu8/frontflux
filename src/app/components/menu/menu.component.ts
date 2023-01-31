import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { faCalendar, faUser } from '@fortawesome/free-regular-svg-icons';
import { faDollar, faGear, faPencil } from '@fortawesome/free-solid-svg-icons';
import { ItemMenu } from 'src/app/models/item-menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public itensMenu: ItemMenu[] = [
    
    {icon: 'home', name: 'Home', routerLink: '', mobile: true},
    {icon: 'event', name: 'Agenda', routerLink: '/minha-agenda', mobile: true},
    {icon: 'group', name: 'Meus Clientes', routerLink: '/meus-clientes', mobile: true},
    {icon: 'account_balance_wallet', name: 'Minhas finanças', routerLink: '/minhas-financas', mobile: true},
    {icon: 'manage_accounts', name: 'Configurações', routerLink: '/configuracoes', mobile: false},
    {icon: 'grade', name: 'Novidades', routerLink: '/news',mobile:false},
  ]

  constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  logout(){
    this.router.navigate(['/login']);
    localStorage.clear()
  }

}
