import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
  standalone: true
})
export class ImagePipe implements PipeTransform {

  private readonly _imgUrlNotImg = 'https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png';

  async transform(value: string): Promise<string> {
    try {
      await this.loadImage(value);
      return value;
    } catch {
      return this._imgUrlNotImg;
    }
  }

  private loadImage(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = url;
    });
  }

}
