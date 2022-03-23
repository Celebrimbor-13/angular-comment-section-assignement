import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Comment, Data, Reply } from "src/app/interfaces/data-interface";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-reply",
  templateUrl: "./reply.component.html",
  styleUrls: ["./reply.component.scss"],
})
export class ReplyComponent implements OnInit {
  @Input() comment!: Comment;
  @Input() data!: Data;
  @Input() reply!: Reply;
  @Output() modalStatetoCommentComp: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() replyToComment: EventEmitter<Reply> = new EventEmitter<Reply>();

  display: boolean[] = [];
  toggleEdit: boolean[] = [];
  increase = this.dataService.increase;
  decrease = this.dataService.decrease;
  storageData = this.dataService.saveToStorage;
  typedText = "";

  constructor(private dataService: DataService) {}

  oldText(reply: Reply) {
    return "@" + reply.replyingTo + " " + reply.content;
  }

  updateReply(reply: Reply, i: number) {
    let id = localStorage.getItem("id");
    reply.content = this.typedText.split(" ").slice(1).join(" ");
    this.storageData(this.data, String(id));
    this.toggleEdit[i] = !this.toggleEdit[i];
  }

  toggleReplyWindow(i: number) {
    this.display[i] = !this.display[i];
  }

  editComment(i: number) {
    this.toggleEdit[i] = !this.toggleEdit[i];
  }
  modalWindowFromReply() {
    this.modalStatetoCommentComp.emit(true);
  }

  sendreplyToComment(reply: Reply) {
    this.replyToComment.emit(reply);
  }

  ngOnInit(): void {}
}
