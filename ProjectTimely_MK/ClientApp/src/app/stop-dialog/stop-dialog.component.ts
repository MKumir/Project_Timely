import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-stop-dialog',
    templateUrl: './stop-dialog.component.html',
})

export class StopDialogComponent implements OnInit{

    projectName: string;
    stopTime: string;
    startTime: string;
    duration: string;

    startTimeMiliseconds: Number

    ProjectList:any=[];

    constructor(
        private router: Router,
        private service: SharedService,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data) {
        this.startTimeMiliseconds = data.startVrijemeMilisekundeData
    }

    ngOnInit(): void {
        this.dialogRef.updateSize('80%', '55%');
        this.refreshProjectList();
    }

    refreshProjectList() {
        this.service.getProjectList().subscribe(data => {
            this.ProjectList = data
        });
    }

    vratiParametarVremena(p: Number) {
        if (p < 10) {
          return '0' + p
        } else {
          return p
        }
    }

    stopTimer() {
        let stopDate = new Date()
        let stopDay = this.vratiParametarVremena(stopDate.getUTCDate())
        let stopMonth = this.vratiParametarVremena(stopDate.getMonth() + 1)
        let stopYear = stopDate.getFullYear()
        let stopHours = this.vratiParametarVremena(stopDate.getHours())
        let stopMinutes = this.vratiParametarVremena(stopDate.getUTCMinutes())
        this.stopTime = stopDay + '.' + stopMonth + '.' + stopYear + '. ' + stopHours + ':' + stopMinutes

        let stopTimeMiliseconds = stopDate.getTime()
        let milisecondsDiff = stopTimeMiliseconds - Number(this.startTimeMiliseconds)
        let secondsDiff = Math.floor(milisecondsDiff / 1000)
        let minutesDiff = Math.floor(secondsDiff / 60)
        let hoursDiff = Math.floor(minutesDiff / 60)
        this.duration = this.vratiParametarVremena(hoursDiff) + ':' + this.vratiParametarVremena(minutesDiff)
        let lastIndx = this.ProjectList.length - 1
        let lastProject = this.ProjectList[lastIndx] 

        let project = {
            ProjectId: lastProject.ProjectId,
            ProjectName: this.projectName,
            StopDate: this.stopTime,
            Duration: this.duration
        }

        if(this.projectName == null || this.projectName == "") {
            alert("Molim Vas unesite ime projekta!")
            return;
        }
        this.dialogRef.close(
            this.service.updateProject(project).subscribe(res => {
                this.router.navigateByUrl('/start')
            })
        )
        
    }

    closeDialog() {
        this.dialogRef.close()
    }

}
