import { Component, OnInit } from '@angular/core';
import { Quiz } from '../Quizz/quizz.model';
import { QuizzService } from '../Quizz/quizz.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit { 
  quizList: Quiz[] = [];

  constructor(private quizService: QuizzService) {}

  ngOnInit() {
    this.quizService.getQuizzes().subscribe(quizzes => {
      this.quizList = quizzes as Quiz[];
    });
  }
}
