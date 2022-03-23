import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Data, Comment, Reply } from 'src/app/interfaces/data-interface';
import data from '../data.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  data: Data = this.dataService.getFromStorage();
  hidden = false;
  comment!: Comment;
  reply!: Reply;
  storageData = this.dataService.saveToStorage;
  typedText = '';

  constructor(private dataService: DataService) {}

  show(notHidden: boolean) {
    this.hidden = notHidden;
  }

  cancelDeletion() {
    this.hidden = false;
  }

  receieveComment(comment: Comment) {
    this.comment = comment;
  }

  receiveReply(reply: Reply) {
    this.reply = reply;
  }

  processDeletion() {
    this.hidden = false;
    if (this.data.comments.includes(this.comment)) {
      let index = this.data.comments.indexOf(this.comment);
      this.data.comments.splice(index, 1);
      this.storageData(this.data);
    }

    this.data.comments.forEach((comment) => {
      if (comment.replies.includes(this.reply)) {
        let index = comment.replies.indexOf(this.reply);
        comment.replies.splice(index, 1);
        this.storageData(this.data);
      }
    });
  }

  sendComment() {
    let id = localStorage.getItem('id');
    if (id) {
      id = (parseInt(id) + 1).toString();
    }
    let replyObj: Comment = {
      content: this.typedText,
      createdAt: Date.now().toString(),
      id: Number(id),
      replies: [],
      score: 0,
      user: {
        image: {
          png: this.data.currentUser.image.png,
          webp: this.data.currentUser.image.webp,
        },
        username: this.data.currentUser.username,
      },
    };

    if (this.typedText) {
      this.data.comments.push(replyObj);
      this.storageData(this.data, String(id));
    }
  }

  ngOnInit(): void {
    if (!this.data) {
      this.data = data;
    } else {
      return;
    }
  }
}
