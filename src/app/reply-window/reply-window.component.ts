import { Component, Input, OnInit } from '@angular/core';
import { Comment, Data, Reply } from 'src/interfaces/interface';
import { DataService } from 'src/data.service';

@Component({
  selector: 'app-reply-window',
  templateUrl: './reply-window.component.html',
  styleUrls: ['./reply-window.component.scss'],
})
export class ReplyWindowComponent implements OnInit {
  constructor(private dataService: DataService) {}
  @Input() data!: Data;
  @Input() comment!: Comment;
  @Input() reply!: Reply;
  @Input() visible!: boolean;

  id = localStorage.getItem('id');

  storageData = this.dataService.saveToStorage;

  toWhomMainCom() {
    return '@' + this.comment.user.username + ' ';
  }

  toWhomReplyCom() {
    return '@' + this.reply.user.username + ' ';
  }

  typedText = '';

  replyToComment() {
    if (this.id) {
      this.id = (parseInt(this.id) + 1).toString();
    }
    let replyObj: Reply = {
      content: this.typedText.split(' ').slice(1).join(' '),
      createdAt: '1 month ago',
      id: Number(this.id),
      replyingTo: this.comment.user.username,
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
      this.comment.replies.push(replyObj);
      this.storageData(this.data, String(this.id));
      this.visible = !this.visible;
    }
  }

  replyToReply() {
    if (this.id) {
      this.id = (parseInt(this.id) + 1).toString();
    }
    let replyObj: Reply = {
      content: this.typedText.split(' ').slice(1).join(' '),
      createdAt: '1 month ago',
      id: Number(this.id),
      replyingTo: this.reply.user.username,
      score: 0,
      user: {
        image: {
          png: this.data.currentUser.image.png,
          webp: this.data.currentUser.image.webp,
        },
        username: this.data.currentUser.username,
      },
    };

    this.data.comments.forEach((cmnt) => {
      if (cmnt.replies.includes(this.reply)) {
        if (this.typedText) {
          cmnt.replies.push(replyObj);
          this.storageData(this.data, String(this.id));
          this.visible = !this.visible;
        }
      }
    });
  }

  ngOnInit(): void {}
}
