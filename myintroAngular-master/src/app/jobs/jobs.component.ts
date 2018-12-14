import { Component, OnInit } from '@angular/core';
import { AlertWindowService } from '../alert-window.service';
import { ProfileLoaderService } from '../profile/profile-loader.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  constructor(private alertwindowservice:AlertWindowService, private prof:ProfileLoaderService) {
    // prof.$loadComponents.subscribe(
    //   loadComponent => {
    //     this.load()
    //   }
    // )
   }

   load(){
    this.prof.loadComponent('jobs')
   }
  ngOnInit() {
    this.load()
  }

}
