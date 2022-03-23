import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Data, Comment, Reply } from 'src/app/interfaces/data-interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() data!: Data;
  @Output() modalStatetoParentFromComment: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() modalStatetoParentFromReply: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() sendComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Output() sendReply: EventEmitter<Reply> = new EventEmitter<Reply>();

  display: boolean[] = [];
  toggleEdit: boolean[] = [];
  increase = this.dataService.increase;
  decrease = this.dataService.decrease;
  storageData = this.dataService.saveToStorage;
  typedText = '';

  constructor(private dataService: DataService) {}

  oldText(comment: Comment) {
    return comment.content;
  }

  updateComment(comment: Comment, i: number) {
    let id = localStorage.getItem('id');
    comment.content = this.typedText;
    this.storageData(this.data, String(id));
    this.toggleEdit[i] = !this.toggleEdit[i];
  }

  toggleReplyWindow(i: number) {
    this.display[i] = !this.display[i];
  }
  editComment(i: number) {
    this.toggleEdit[i] = !this.toggleEdit[i];
  }

  modalWindowFromComment() {
    this.modalStatetoParentFromComment.emit(true);
  }

  passToAppComp(notHidden: boolean) {
    this.modalStatetoParentFromReply.emit(notHidden);
  }

  getComment(comment: Comment) {
    this.sendComment.emit(comment);
  }

  passReplyToApp(reply: Reply) {
    this.sendReply.emit(reply);
  }

  ngOnInit(): void {}
}
