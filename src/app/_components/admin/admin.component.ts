import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export interface UserData {
  id: string;
  account_type: string;
  areas_number: number;
  name: string;
  service_number: number;
  role: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns: string[] = ['name', 'role', 'account_type', 'areas_number', 'service_number', 'id'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  baseUrl = 'http://api.ofiex.shop';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }),
    observe: 'response' as 'response'
  };

  constructor(public http: HttpClient) {
  }

  ngOnInit() {
    const requestGetUsers = this.baseUrl + '/users/list';

    this.http.get(requestGetUsers, this.httpOptions)
      .subscribe((success: any) => {
        console.log(success.body);
        this.dataSource = new MatTableDataSource<UserData>(success.body);
        this.dataSource.paginator = this.paginator;
      }, error => {
        console.log(error);
      });
  }

  changeRole(id): void {
    const requestChangeUser = this.baseUrl + '/users/changeRole/' + id;

    this.http.post(requestChangeUser, {role: 'kingAdmin'},this.httpOptions)
      .subscribe((success: any) => {
        console.log(success.body);
        this.ngOnInit();
      }, error => {
        console.log(error);
      });
  }

  deleteUser(id): void {
    const requestDeleteUser = this.baseUrl + '/users/delete/' + id;

    this.http.delete(requestDeleteUser, this.httpOptions)
      .subscribe((success: any) => {
        console.log(success.body);
        this.ngOnInit();
      }, error => {
        console.log(error);
      });
  }

}
