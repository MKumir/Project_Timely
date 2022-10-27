import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})

export class StartComponent {

    constructor(private service:SharedService, private router: Router) { }

    startVrijemeMilisekunde: Number
  
    projekti = []
  
    vratiParametarVremena(p: Number) {
      if (p < 10) {
        return '0' + p
      } else {
        return p
      }
    }
  
    Startaj() {
      let date = new Date()
      this.startVrijemeMilisekunde = date.getTime()
      let dan = this.vratiParametarVremena(date.getUTCDate())
      let mjesec = this.vratiParametarVremena(date.getMonth() + 1)
      let godina = date.getFullYear()
      let sati = this.vratiParametarVremena(date.getHours())
      let minute = this.vratiParametarVremena(date.getUTCMinutes())
      let startVrijeme = dan + '.' + mjesec + '.' + godina + '. ' + sati + ':' + minute
      let project = {
        ProjectName: "", 
        StartDate: startVrijeme, 
        StopDate: "", 
        Duration: ""
      }
      this.service.addProject(project).subscribe(res => {
        this.router.navigateByUrl('/stop', {state: {data: this.startVrijemeMilisekunde}})
      })
    } 
    
  }


