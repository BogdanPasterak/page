import { Injectable } from '@angular/core';
import { element, error } from 'protractor';
import { functions } from 'firebase';
import { DataFile } from './dataFile';

@Injectable({
  providedIn: 'root'
})
export class ImageResizeService {

  width: number = 1200;
  height: number = 900;

  constructor() { }

  readFileAsync(file: File) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    })
  }

  loadImageAsync(src: any) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener("load", () => resolve(img));
      img.addEventListener("error", err => reject(err));
      img.src = src;
    });
  }

  getCanvasBlobAsync(canvas) {
    return new Promise(function(resolve, reject) {
      try {
        canvas.toBlob(function(blob) {
          resolve(blob)
        }, 'image/jpeg', 0.7)
      } catch (error) {
        reject(error);
      }
    })
  }
  


  async getImgAsync(file: File) {
    try {
      // name new file
      let newName: string;
      if (file.name.includes(".")){
        newName = `${file.name.split('.').slice(0,-1).join('.')}_resize`
      } else {
        newName = file.name + "_resize";
      }
      // read data async
      let result = await this.readFileAsync(file) as string | ArrayBuffer;
      // create image async from data
      let img = await this.loadImageAsync(result) as HTMLImageElement;
      // canvas with prefered size
      const elem = document.createElement('canvas');
      elem.width = this.width;
      elem.height = this.height;
      const ctx = elem.getContext('2d');
      ctx.drawImage(img, 0, 0, this.width, this.height);

      const blob = await this.getCanvasBlobAsync(ctx.canvas) as Blob;

      const newFile = new File([blob], newName, {
        type: 'image/jpeg',
        lastModified: Date.now()
      });

      let data = await this.readFileAsync(newFile) as string | ArrayBuffer;

      let dataFile: DataFile = {data: data, file: newFile}

      return dataFile;
    } catch (error) {
      return error;
    }
  }


}
