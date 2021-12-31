import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PlantService } from 'src/app/core/services/plant.service';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent implements OnInit {

  date: string = new Date().toLocaleDateString('PL-pl');
  time: string = new Date().toLocaleTimeString('Pl-pl');
  showEditIcon: boolean = false;
  editMode: boolean = false;
  plantName: FormControl = new FormControl('');
  plantname: string = '';
  constructor(private router: Router, private plantService: PlantService) { }

  ngOnInit(): void {
    if(this.router.url ==='/panel/informacje') this.showEditIcon = true;
    else this.showEditIcon = false;
    setInterval(()=> {
      this.time = new Date().toLocaleTimeString('PL-pl');
    }, 1000)
    this.getPlant();
  }

  getPlant(): void {
    this.plantService.getPlant().subscribe((data: any) =>{
     this.plantname = data.plant.name
    })
  }

  editPlant(): void {
    this.showEditIcon = true;
    this.editMode = false;
    this.plantService.editPlant(this.plantName.value).subscribe((data:any) => {
      this.getPlant();
      console.log(data)
    })
  }

}
