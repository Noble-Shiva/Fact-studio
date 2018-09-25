import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Fact } from '../Fact';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FactsService } from '../facts.service';

@Component({
  selector: 'app-fact-detail',
  templateUrl: './fact-detail.component.html',
  styleUrls: ['./fact-detail.component.scss']
})
export class FactDetailComponent implements OnInit {
  fact: Fact;
  facts: Observable<Fact[]>;
  comments: any;
  editing = false;
  commentsList: any;
  commentValue: '';
  selectedCategoryList: any;

  categoryList: string[] = ['Science', 'Technology', 'Sports', 'Travel', 'Other'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private factService: FactsService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.getFact();
  }

  getFact(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.factService.getFactData(id).subscribe(fact => {
      this.fact = fact;
      console.log(this.fact);
      this.commentsList = this.fact['comments'];
      this.selectedCategoryList = this.fact['category'];
    });
  }

  updateFact() {
    const formData = {
      title: this.fact.title,
      content: this.fact.content,
      category: this.fact.category
    };
    const id = this.route.snapshot.paramMap.get('id');
    console.log('id' + id);
    console.log(formData);
    this.factService.update(id, formData);
    this.editing = false;
  }

  delete() {
    const id = this.route.snapshot.paramMap.get('id');
    this.factService.delete(id);
    this.router.navigate(['/blog']);
  }

  addComment(commentText: string) {

    if (commentText === '') { return; }

    const id = this.route.snapshot.paramMap.get('id');
    const commentData = {
      commentBody: commentText,
      commentDate: new Date(),
      commentUserId: this.auth.currentUserId ,
      commentUserName: this.auth.authState.displayName || this.auth.authState.email,
      commentUserPhoto: this.auth.authState.photoURL,
      factId: id
    };
    this.fact.comments.push(commentData);
    const formData = this.fact;
    console.log('id' + id);
    console.log(commentData);
    this.factService.addComments(id, formData);
    this.commentValue = '';

    this.getFact();
  }

  compareWithFunc(a, b) {
    return a === b;
  }

  authorStory(authorId: string, authorName: string) {
    this.facts = this.factService.getFactsByAuthorId(authorId).valueChanges();
  }
}
