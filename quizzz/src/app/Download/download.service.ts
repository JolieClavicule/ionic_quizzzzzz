import { Injectable } from '@angular/core';
import { Quiz } from '../Quizz/quizz.model';
import { Directory, Encoding, Filesystem, FilesystemDirectory, FilesystemEncoding } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private platform: Platform) { }

  async downloadQuizResults(quiz: Quiz, score: number) {
    try {
      let resultText = `Result for quiz: ${quiz.title}\n`;
      resultText += `Date: ${new Date().toLocaleDateString()}\n`;
      resultText += `Final Score: ${score.toFixed(0)}%\n\n`;

      const fileName = `Quiz_${quiz.title}_Result.txt`;

      if (this.platform.is('android')) {
        await Filesystem.writeFile({
          path: fileName,
          data: resultText,
          directory: Directory.Documents,
          encoding: Encoding.UTF8
        });

        const fileInfo = await Filesystem.getUri({
          directory: Directory.Documents,
          path: fileName
        });
        return fileInfo.uri;
      } else {
        const blob = new Blob([resultText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        return a
      }

    } catch (error) {
      console.error('Error downloading results:', error);
      throw error;
    }
  }
}
