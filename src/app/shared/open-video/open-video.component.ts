import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-open-video',
  templateUrl: './open-video.component.html',
  styleUrls: ['./open-video.component.css']
})
export class OpenVideoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    data == undefined || data == undefined ? "../assets/PublicAssets/video/AWP.mp4" : data;
  }

  ngOnInit(): void {
  }


}
