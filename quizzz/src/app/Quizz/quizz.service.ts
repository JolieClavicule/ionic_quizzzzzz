import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection,
  addDoc, 
  deleteDoc, 
  doc,
  getDocs,
} from '@angular/fire/firestore';
import { Quiz } from './quizz.model';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {
  constructor(private firestore: Firestore) {}

  getQuizzes(): Observable<Quiz[]> {
    return from(getDocs(collection(this.firestore, 'quizzes'))).pipe(
      map(snap => snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Quiz)))
    );
  }

  addQuiz(quiz: Quiz) {
    const quizzesRef = collection(this.firestore, 'quizzes');
    return addDoc(quizzesRef, quiz);
  }

  deleteQuiz(id: string) {
    const quizDocRef = doc(this.firestore, `quizzes/${id}`);
    return deleteDoc(quizDocRef);
  }
}
