import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  navs = {
    search: false
  }

  constructor(private route:ActivatedRoute) { }

  setNav(){
    this.navs.search = this.isProfilePage()
  }

  isProfilePage(){
    try{
      // // // // console.log(this.route.routeConfig.path.split('/')[0] == 'profile')
      return this.route.routeConfig.path.split('/')[0] == 'profile'
    }catch(e){
      return false
    }
    
  }

  userIsLoggedIn(){
    try{
      return JSON.parse(localStorage.getItem('authSession')).isLoggedIn
    }catch(e){
      return false
    }
  }

  ngOnInit() {
    this.setNav()
  }

}
