import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FactsService } from '../facts.service';
import { Observable } from 'rxjs';
import { finalize, startWith, map } from 'rxjs/operators';

import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';

import { MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';


@Component({
  selector: 'app-fact-dashboard',
  templateUrl: './fact-dashboard.component.html',
  styleUrls: ['./fact-dashboard.component.scss']
})
export class FactDashboardComponent implements OnInit {
  image: string;

  saving = 'Create Post';

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  titleFormGroup: FormGroup;
  contentFormGroup: FormGroup;
  imageFormGroup: FormGroup;
  categoryFormGroup: FormGroup;


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  categoryCtrl = new FormControl();
  filteredcategories: Observable<string[]>;
  categories: string[] = ['Other'];
  allcategories: string[] = ['Science', 'Technology', 'Sports', 'Travel', 'Other'];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;


  constructor(
    private auth: AuthService,
    private factService: FactsService,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder
  ) {
    this.filteredcategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) => category ? this._filter(category) : this.allcategories.slice()));
  }


  ngOnInit() {
    this.imageFormGroup = this.formBuilder.group({
      imageCtrl: ['', Validators.required]
    });
    this.contentFormGroup = this.formBuilder.group({
      contentCtrl: ['', Validators.required]
    });
    this.titleFormGroup = this.formBuilder.group({
      titleCtrl: ['', Validators.required]
    });
    this.categoryFormGroup = this.formBuilder.group({
      categoryCtrl: ['', Validators.required]
    });
  }

  createPost() {
    const postData = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      authorPhoto: this.auth.authState.photoURL,
      content: this.contentFormGroup.value.contentCtrl,
      image: this.image || null,
      published: new Date(),
      title: this.titleFormGroup.value.titleCtrl,
      category: this.categories.length === 0 ? ['Other'] : this.categories,
      comments: []
    };
    this.factService.create(postData);
    this.titleFormGroup.reset();
    this.contentFormGroup.reset();
    this.imageFormGroup.reset();
    this.categoryFormGroup.reset();
    this.image = '';
    this.categories = [];
    this.uploadPercent = null;

    this.saving = 'Post Created!';
    setTimeout(() => (this.saving = 'Create Post'), 3000);
  }

  uploadImage(event) {
    const file = event.target.files[0];
    const path = `facts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files');
    } else {
      const task = this.storage.upload(path, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(() => {
          this.storage.ref(path).getDownloadURL().subscribe(imageUrl => {
            this.image = imageUrl.toString();
            console.log('Image Uploaded!');
        });
          this.downloadURL = this.storage.ref(path).getDownloadURL();
        })
     ).subscribe();
    }
  }

  remove(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allcategories.filter(category => category.toLowerCase().indexOf(filterValue) === 0);
  }

}
