import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Quiz } from 'src/app/Quizz/quizz.model';
import { QuizzService } from 'src/app/Quizz/quizz.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonicModule,ReactiveFormsModule, CommonModule],
})
export class DetailPage implements OnInit {

  quiz: Quiz | null = null;
  quizId: string | null = null;

  constructor(private quizService: QuizzService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('id');
    if (this.quizId) {
      this.quizService.getQuizzById(this.quizId).subscribe(quiz => {
        this.quiz = quiz;
        console.log("Fetched quiz:", this.quiz);
      });
    }
  }
}
