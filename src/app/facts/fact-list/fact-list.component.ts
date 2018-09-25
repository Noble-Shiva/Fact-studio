import { Component, OnInit } from '@angular/core';
import { FactsService } from '../facts.service';
import { AuthService } from '../../shared/services/auth.service';
import { Observable } from 'rxjs';
import { Fact } from '../Fact';

@Component({
  selector: 'app-fact-list',
  templateUrl: './fact-list.component.html',
  styleUrls: ['./fact-list.component.scss']
})
export class FactListComponent implements OnInit {
  facts: Observable<Fact[]>;
  filtered: Boolean = false;
  filterMsg: String = '';
  selectedCategory: String = '';

  categoryList: string[] = ['Science', 'Technology', 'Sports', 'Travel', 'Other'];

  constructor(private factService: FactsService, public auth: AuthService) {}

  ngOnInit() {
    this.facts = this.factService.getFacts();
  }

  delete(id: string) {
    this.factService.delete(id);
  }

  authorStory(authorId: string, authorName: string) {
    this.facts = this.factService.getFactsByAuthorId(authorId).valueChanges();
    this.filtered = true;
    this.filterMsg = `You are viewing posts by author ${ authorName }`;
    this.selectedCategory = '';
  }

  changeCategory(category: string) {
    this.facts = this.factService.getFactsByCategory(category).valueChanges();
    this.filtered = true;
    this.filterMsg = `You are viewing posts by ${ category } category`;
  }

  clearFilter() {
    this.facts = this.factService.getAllFacts().valueChanges();
    this.filtered = true;
    this.filterMsg = `Please select categories below`;
    this.selectedCategory = '';
  }

}
