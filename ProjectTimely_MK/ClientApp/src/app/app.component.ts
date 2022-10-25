import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {

  start = false;
  stopTimer = false;

  startVrijeme: string;
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
    this.start = true
    this.stopTimer = false
    let date = new Date()
    this.startVrijemeMilisekunde= date.getTime()
    let dan = this.vratiParametarVremena(date.getUTCDate())
    let mjesec = this.vratiParametarVremena(date.getMonth() + 1)
    let godina = date.getFullYear()
    let sati = this.vratiParametarVremena(date.getHours())
    let minute = this.vratiParametarVremena(date.getUTCMinutes())
    this.startVrijeme = dan + '.' + mjesec + '.' + godina + '. ' + sati + ':' + minute
    let projekt = {
      projektIme: "", 
      projektStart: this.startVrijeme, 
      projektStop: "", 
      projektTrajanje: ""
    }
    this.projekti.push(projekt)
  } 

  constructor(private dialog : MatDialog) {}

  openDialog() {
    console.log(this.projekti.length)
    let dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(res => {
      let projectName = res.projectNameData
      let stopVrijeme = res.vrijemeData
      let stopVrijemeMilisekunde = res.stopVrijemeMilisekunde
      let razlikaMilisekunde = Number(stopVrijemeMilisekunde) - Number(this.startVrijemeMilisekunde)
      let razlikaSekunde = Math.floor(Number(razlikaMilisekunde) / 1000)
      let razlikaMinute = Math.floor(Number(razlikaSekunde) / 60)
      let razlikaSati = Math.floor(Number(razlikaMinute) / 60)
      let trajanje = this.vratiParametarVremena(razlikaSati) + ':' + this.vratiParametarVremena(razlikaMinute)
      let lastIndx = this.projekti.length - 1 
      if ((this.projekti[lastIndx].projektStop == "")) {
        this.projekti[lastIndx].projektIme = projectName;
        this.projekti[lastIndx].projektStop = stopVrijeme;
        this.projekti[lastIndx].projektTrajanje = trajanje
      }
      else {
        this.projekti.push({
          projektIme: projectName,
          projektStart: this.startVrijeme, 
          projektStop: stopVrijeme,
          projektTrajanje: trajanje
        })
      }
      
      this.stopTimer = true
      console.log(this.projekti)
    })
  }
  
}


