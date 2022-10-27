import { Component,  } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {

    constructor(private service:SharedService, private router: Router) { }

    startVrijemeMilisekunde: Number;

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