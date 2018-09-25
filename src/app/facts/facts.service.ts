import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Fact } from './Fact';


@Injectable()
export class FactsService {
  factsCollection: AngularFirestoreCollection<Fact>;
  commentsCollection: AngularFirestoreCollection<Fact['comments']>;
  factDoc: AngularFirestoreDocument<Fact>;
  commentDoc: AngularFirestoreDocument<Fact['comments']>;

  constructor(private afs: AngularFirestore) {
    this.factsCollection = this.afs.collection('facts', ref =>
      ref.orderBy('published', 'desc')
    );
    this.commentsCollection = this.afs.collection('comments');
  }

  create(data: Fact) {
    this.factsCollection.add(data);
  }

  delete(id: string) {
    return this.getFact(id).delete();
  }

  getFact(id: string) {
    return this.afs.doc<Fact>(`facts/${id}`);
  }

  getFacts() {
    return this.factsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Fact;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    }));
  }

  getFactData(id: string) {
    this.factDoc = this.afs.doc<Fact>(`facts/${id}`);
    return this.factDoc.valueChanges();
  }

  update(id: string, formData) {
    return this.getFact(id).update(formData);
  }

  addComments(id, formData) {
    // return this.commentsCollection.add(formData)
    return this.getFact(id).update(formData);
  }

  getFactsByAuthorId(authorId) {
    return this.factsCollection = this.afs.collection('facts', ref => ref.where('authorId', '==', authorId));
  }

  getFactsByCategory(catregory) {
    return this.factsCollection = this.afs.collection('facts', ref => ref.where('category', 'array-contains', catregory));
  }

  getAllFacts() {
    return this.factsCollection = this.afs.collection('facts', ref => ref);
  }
}
