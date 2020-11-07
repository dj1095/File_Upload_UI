import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FileUploadResponse } from 'src/shared/FileUploadResponse';
import { Router } from '@angular/router';
import { Employee } from 'src/shared/Employee';
import { Employees } from 'src/shared/Employees';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gernerate-report-ui';
  baseUrl = 'http://localhost:8080';
  selectedFile: File = null;
  selectedFileId: number;
  displayedColumns: string[] = ['Employee_id', 'Name', 'Department'];
  dataSource: Employee[] = null;
  isDataVisible = false;
  constructor(private http: HttpClient, private router: Router) {

  }
  onFileSelected(event) {
    this.reset();
    this.selectedFile = event.target.files[0];
  }

  onUpload(form: NgForm) {
    const ref = this;
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    const size = ((this.selectedFile.size / 1024) / 1024);
    if (size > 2) {
      throw Error('Maximum File Size Exceeded');
    }
    console.log(size);
    this.http.post<FileUploadResponse>(this.baseUrl + '/upload/report', formData).subscribe(res => {
      ref.selectedFileId = res.fileId;
      alert('upload successful');
    });
  }
  getURL(): string {
    return this.baseUrl + '/download/employees/data/' + this.selectedFileId.toString();
  }
  fetchEmployees() {
    const ref = this;
    this.http.get<Employees>(this.baseUrl + '/employees/all').subscribe(res => {
      ref.dataSource = res.employees;
      console.log(ref.dataSource);
      ref.isDataVisible = true;
    });
  }
  onHideEmployees() {
    this.isDataVisible = false;
  }
  reset() {
    this.selectedFile = null;
    this.selectedFileId = null;
    this.dataSource = null;
    this.isDataVisible = false;
  }
}
