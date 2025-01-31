import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Quiz } from 'src/app/Quizz/quizz.model';
import { QuizzService } from 'src/app/Quizz/quizz.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  imports: [IonicModule,ReactiveFormsModule, CommonModule],
})
export class CreatePage implements OnInit {

  quizForm!: FormGroup;

  constructor(private fb: FormBuilder, private quizService: QuizzService, private router: Router) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.quizForm = this.fb.group({
      quizTitle: ['', Validators.required],
      questions: this.fb.array([])
    });

    this.addQuestion();
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      questionText: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],
      correctAnswer: [null, Validators.required]
    });
  }

  addQuestion() {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  async saveQuiz() {
    if (this.quizForm.valid) {
      const quiz: Quiz = {
        id: '',
        title: this.quizForm.value.quizTitle,
        questions: this.quizForm.value.questions
      };
      
      try {
        await this.quizService.addQuiz(quiz);
        console.log('Quiz saved successfully!');
        this.quizForm.reset();
      } catch (error) {
        console.error('Error saving quiz:', error);
      }
    }
  }

  home() {
    this.router.navigate(['/home']);
  }
}
