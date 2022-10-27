import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html'
})

export class ProjectTableComponent implements OnInit {

  ProjectList: any = [];

  constructor(private service: SharedService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshProjectList();
  }

  refreshProjectList() {
    this.service.getProjectList().subscribe(data => {
      this.ProjectList = data
    });
  }

  removeProject(project) {
    console.log(project.ProjectId)
    let id = project.ProjectId
    if (confirm("Jeste li sigurni da želite izbrisati projekt?")) {
      this.service.deleteProject(id).subscribe(data => {
        this.refreshProjectList();
        this.router.navigateByUrl('/start')
      })
    }
  }

  openEditDialog(project) {
    let dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        projectJSON: project
      }
    })

    dialogRef.afterClosed().subscribe(res => {
      this.refreshProjectList()
    })
  }



}
