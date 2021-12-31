import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/core/interfaces/Image';
import { ImageService } from 'src/app/core/services/image.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  filename: string = '';
  images$: Observable<any>;
  images: Image[] = [];
  @ViewChild('fileUpload') fileUpload: any;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    this.imageService.getImages().subscribe((data: any) => {
      console.log(data)
      this.images = data.images
    })
  }

  onSelectFile(event: any): void {
    event.preventDefault();
    const file:File = event.target.files[0];

    if (file) {
        this.filename = file.name;
        const formData = new FormData();
        formData.append("image", file);
        this.imageService.upload(formData).subscribe((data: any) => console.log(data));
    }
  }

  removeImage(image: Image): void {
    this.imageService.removeImage(image.name)
      .subscribe(() => {
        this.getImages();
    });
  }
}

