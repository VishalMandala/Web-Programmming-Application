import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service'


@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {
  newMessage: string = '';
  messageList: string[] = [];
  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messageList.push(message);
    })
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
