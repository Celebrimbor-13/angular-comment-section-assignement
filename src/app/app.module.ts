import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CommentComponent } from './comment/comment.component';
import { ReplyComponent } from './comment/reply/reply.component';
import { ReplyWindowComponent } from './reply-window/reply-window.component';
import { FormsModule } from '@angular/forms';
import { TimestampTransformPipe } from './pipes/timestamp-transform.pipe';

@NgModule({
  declarations: [AppComponent, CommentComponent, ReplyComponent, ReplyWindowComponent, TimestampTransformPipe],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
