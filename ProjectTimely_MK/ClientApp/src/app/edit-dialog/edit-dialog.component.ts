import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../shared.service';

@Component({
    selector: 'app-edit-dialog',
    templateUrl: './edit-dialog.component.html',
})

export class EditDialogComponent implements OnInit {

    project;
    projectName: string;

    constructor(
        private service: SharedService,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data) {
        this.project = data.projectJSON
    }

    ngOnInit(): void {
        this.dialogRef.updateSize('80%', '55%');
    }

    refreshProjectList() {
        this.service.getProjectList()
    }

    editProject() {
        let project_ = {
            ProjectId: this.project.ProjectId,
            ProjectName: this.projectName,
            StopDate: this.project.StopDate,
            Duration: this.project.Duration
        }
        if(this.projectName == null || this.projectName == "") {
            alert("Molim Vas unesite ime projekta!")
            return;
        }
        this.dialogRef.close(
            this.service.updateProject(project_).subscribe())
    }

    closeDialog() {
        this.dialogRef.close()
    }



}