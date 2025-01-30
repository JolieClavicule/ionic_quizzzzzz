import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection,
  addDoc, 
  deleteDoc, 
  doc,
  getDocs,
  getDoc,
  updateDoc,
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

    async addQuiz(quiz: Quiz) {
      const quizzesRef = collection(this.firestore, 'quizzes');
  const docRef = await addDoc(quizzesRef, quiz);
  await updateDoc(docRef, { id: docRef.id });
  return docRef;
    }

  async deleteQuiz(id: string) {
    try {
      const quizDocRef = doc(this.firestore, 'quizzes', id);
      await deleteDoc(quizDocRef);
      console.log('Quiz successfully deleted');
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw error;
    }
  }

  getQuizzById(id: string): Observable<Quiz | null> {
    try {
      const quizDocRef = doc(this.firestore, 'quizzes', id);
      return from(getDoc(quizDocRef)).pipe(
        map(docSnap => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            return { id: docSnap.id, ...data } as Quiz;
          } else {
            console.log('No quiz found with ID:', id);
            return null;
          }
        })
      );
    } catch (error) {
      console.error('Error getting quiz:', error);
      throw error;
    }
  }
}
