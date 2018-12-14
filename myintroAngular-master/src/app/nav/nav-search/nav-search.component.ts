import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileLoaderService } from '../../profile/profile-loader.service';
import { AlertWindowService } from '../../alert-window.service';
import { ImageSizerService } from '../../image-sizer.service';
import { AuthUser } from '../../classes/auth-user';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {

  imageSize: number

  logo = {
    image: './assets/img/logo.png',
    alt: 'MyIntro: Introduce Yourself'
  }

  search = {
    placeholder: 'Search MyIntro'
  }

  userImage = {
    image: null,
    alt: '',
    link: ''
  }

  user: AuthUser

  searchQuery

  jobs() {
    this.router.onSameUrlNavigation = "reload"
    let navigate = () => {
      this.router.navigateByUrl('jobs')
    }

    if(this.router.url.indexOf('jobs') == -1){
      this.alertwindowservice.showDataWithoutButton('Loading Jobs')
      setTimeout(() => {
        navigate()
      }, 400);
    }else{
      navigate()
    }
  }

  resizeImage() {
    // // // console.log('user exists: ' + !!this.user)
    if (!!this.user) {
      this.getUserAvatar()
      if (!this.imageSize || this.imageSize > 0) {
        let imageContainers = document.getElementById('page')
        let imageHeight = imageContainers.clientHeight
        this.setImageSize(imageHeight)
      }
    }
  }

  triggerResize(state) {
    this.resizeImage()
  }

  setImageSize(size: number) {
    this.imageSize = size
  }

  userIsSameAsLoggedIn(){
    if(!!this.user){
      let username = this.user.get('username')
      return window.location.href.indexOf(username) != -1
    }else{
      return false
    }
  }

  home() {
    if (this.user) {
      if(window.location.href.indexOf('profile') != -1 && !this.userIsSameAsLoggedIn()){
        let newUser:AuthUser = this.auth.getUserFromSession()
        this.prof.swapUsers(newUser, this.alertwindowservice)
        window.history.pushState(null, 'MyIntro | ' + newUser.get('firstname'), '/profile/' + newUser.get('username'))
      }else if ((window.location.href.indexOf('profile') == -1 || !this.userIsSameAsLoggedIn()) || window.location.href.indexOf('edit') != -1) {
        this.alertwindowservice.showDataWithoutButton('Loading Profile')
        setTimeout(() => {
          this.router.navigateByUrl('/profile/' + this.user.get('username'))
        }, 400)
      }
    } else {
      this.alertwindowservice.showDataWithoutButton('Welcome')
      setTimeout(() => {
        this.router.navigateByUrl('signin')
      }, 400)

    }

  }

  edit() {
    // // // console.log(this.route)
    // // // console.log(window.location.href.indexOf('edit'))
    if (window.location.href.indexOf('edit') == -1) {
      this.alertwindowservice.showDataWithoutButton('Loading Profile')
      let user: AuthUser = new AuthUser(JSON.parse(localStorage.getItem('authSession')).user).get('username')
      setTimeout(() => {
        this.router.navigateByUrl('/profile/' + user + '/edit')
      }, 400)
    }
    // if(this.route.pathFromRoot.indexOf('edit')!= -1){
    // // // // console.log(this.route.snapshot.params)
    // 
    // }



  }

  getUserAvatar() {
    let avatar = this.user.get('avatar') //AuthUser = new AuthUser(JSON.parse(localStorage.getItem('authSession')).user).get('avatar')
    
    this.userImage.image = avatar
  }
  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router, private imageTrigger: ImageSizerService, private prof: ProfileLoaderService, private alertwindowservice: AlertWindowService) {
    imageTrigger.imageTrigger$.subscribe(
      trigger => {
        this.triggerResize(trigger)
      }
    )
  }

  load() {
    this.resizeImage()
  }

  ngOnInit() {
    this.prof.$loadComponents.subscribe(
      loadComponents => {
        this.load()
      }
    )

    this.user = this.auth.getUserFromSession()
    

    this.auth.$localUser.subscribe(
      localUser => {
        this.user = new AuthUser(localUser)
        // this.resizeImage()
      }
    )


    // this.load()
  }

}
