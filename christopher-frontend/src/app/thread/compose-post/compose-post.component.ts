import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbFileUploadComponent } from 'mdb-file-upload';

@Component({
  selector: 'app-compose-post',
  templateUrl: './compose-post.component.html',
  styleUrls: ['./compose-post.component.scss']
})
export class ComposePostComponent implements OnInit {

  @ViewChild('postFeatureImg')
  postFeatureImgEl: MdbFileUploadComponent;

  editPostForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.editPostForm = this.formBuilder.group({
      postTitle: [ 'Sample Post Title', [ Validators.required ] ],
      postFeatureImg: [ null, [ Validators.required ] ],
      postContent: [ null ]
    })
  }

  get postTitle() {
    return this.editPostForm.get('postTitle');
  }

  get postFeatureImg() {
    return this.editPostForm.get('postFeatureImg');
  }

  get postContent() {
    return this.editPostForm.get('postContent');
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.postFeatureImgEl.textTranslation.fileText = 'Drag and drop or click to add your post feature image.';
      this.postFeatureImgEl.textTranslation.imageFileText = 'Drag and drop or click to replace your post feature image.';
    })
  }

  onFileAdd(file: File) {
    this.editPostForm.get('postFeatureImg')?.setValue(file);
  }

  onFileRemove() {
    this.editPostForm.get('postFeatureImg')?.setValue(null);
  }

  onSubmit(editorInput: any) {
    console.log(editorInput.postTitle);
    console.log(editorInput.postFeatureImg);
    console.log(editorInput.postContent);
  }


}
