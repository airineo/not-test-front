import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from './chat.service';
import { ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { userNotification } from './model/userNotification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'notification-test';
  message : string;
  messages: string[] = [];
  userName : string;
  isAddedUser : boolean = false;
  sessionSocketUser : string;
  dataSource = new MatTableDataSource();
  data: any;
  dtOptions: any = {};
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  columnsToDisplay = ['id', 'name', 'email', 'creationDate', 'phoneNumber', 'subscribed', 'channels'];
  userNotification : userNotification;
  constructor(private chatService: ChatService, private http: HttpClient) { 
      this.query();
  }

  sendMessage(){
     this.chatService.sendMessage(this.message);
     this.message = "";
  }
  access(){
       console.log("Setting user..."|| new Date());
       this.setUser();
       console.log("after of response ..."||new Date());
       this.userNotification = new userNotification( "100", "mockuser", "gila@gmail.com", new Date(),  777567343,  ["Finance", "Sports"], ["SMS", "E-Mail"] );
       console.log(this.userNotification);
       this.http.post("http://localhost:3000/addUser", this.userNotification).subscribe(data => {
        
          console.log( data);
        
       }, error => {
          console.log("error");
          console.log(error)
       }); 
  }
  async setUser() {
      console.log("waiting for response..."|| new Date());
      this.chatService.setUser(this.userName);
      this.isAddedUser = true;
  }
  query(){
    console.log("searching...");
    this.http.get("http://localhost:3000/history").subscribe(data => {
        
        console.log( data);
        this.data = data;
        this.dataSource = new MatTableDataSource(this.data);
        
        this.dataSource.sort = this.sort;
        
    }, error => {
        console.log("error");
        console.log(error)
    });
  }
  ngOnInit(){
      
      this.chatService.getMessage().subscribe((message : string) =>{
          this.messages.push(message);
      }); 
      

  }


}
