import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
})

export class DialogComponent implements OnInit{

    projectName: string;
    vrijeme: string

    vratiParametarVremena(p: Number) {
        if (p < 10) {
          return '0' + p
        } else {
          return p
        }
    }

    constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any){}
   
    ngOnInit(): void {
        this.dialogRef.updateSize('80%', '55%');
    }

    stopTimer() {
        let date = new Date()
        let dan = this.vratiParametarVremena(date.getUTCDate())
        let mjesec = this.vratiParametarVremena(date.getMonth() + 1)
        let godina = date.getFullYear()
        let sati = this.vratiParametarVremena(date.getHours())
        let minute = this.vratiParametarVremena(date.getUTCMinutes())
        let vrijeme = dan + '.' + mjesec + '.' + godina + '. ' + sati + ':' + minute
        if(this.projectName == null) {
            alert("Molim Vas unesite ime projekta!")
            return;
        }
        this.dialogRef.close({
            projectNameData: this.projectName, 
            vrijemeData: vrijeme,
            stopVrijemeMilisekunde: date.getTime()
        })
    }

    closeDialog() {
        this.dialogRef.close()
    }

}
