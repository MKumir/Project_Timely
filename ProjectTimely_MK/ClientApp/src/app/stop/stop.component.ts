import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { StopDialogComponent } from '../stop-dialog/stop-dialog.component';


@Component({
  selector: 'app-stop',
  templateUrl: './stop.component.html'
})

export class StopComponent implements OnInit {

    constructor(private dialog : MatDialog, private router: Router) {
        this.router.getCurrentNavigation().extras.state
     }

    ngOnInit(): void {
        console.log(history.state)
    }
    

    startVrijemeMilisekunde: Number
  
    openDialog() {
        this.dialog.open(StopDialogComponent, {
            data: {
                startVrijemeMilisekundeData: history.state.data
            }
        });
  
    }
    
  }


