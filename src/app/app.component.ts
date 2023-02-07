import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from './chat.service';

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

  constructor(private chatService: ChatService, private http: HttpClient) { }

  sendMessage(){
     this.chatService.sendMessage(this.message);

     this.message = "";
  }
  access(){
     this.chatService.setUser(this.userName);
     this.isAddedUser = true;
  }
  query(){
    console.log("searching...");
    this.http.get("http://localhost:3000/history").subscribe(data => {
        
        console.log( data);
        
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
