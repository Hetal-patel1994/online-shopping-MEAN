
import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

//import { FileService } from './file.service';
import { BusinessService } from '../business.service';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
//import { uploadfolder } from '../../../api/uploads/1547405441302.IMG-20181230-WA0012.jpg'

const uri = 'http://localhost:4000/KC/uploads';

@Component({
selector: 'app-gst-add',
templateUrl: './gst-add.component.html',
styleUrls: ['./gst-add.component.css']
})


export class GstAddComponent implements OnInit {
angForm: FormGroup;
uploader:FileUploader = new FileUploader({url:uri});

    attachmentList:any = [];
constructor(private fb: FormBuilder, private bs: BusinessService) {
this.createForm();

this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
 console.log(JSON.stringify(response))
 
 this.attachmentList.push(JSON.parse(response));
 //console.log(JSON.parse(response))
}



}





createForm() {
this.angForm = this.fb.group({
product_name: ['', Validators.required ],
category_name: ['', Validators.required ],
fileupload : ['', Validators.required ],
material_name: ['', Validators.required ],
price: ['', Validators.required ],
description: ['', Validators.required ]
// business_name: ['', Validators.required ],
// business_gst_number: ['', Validators.required ]
});
}
addBusiness(product_name, category_name, material_name, price, description) {
//console.log(this.filestring)
this.bs.addBusiness(product_name, category_name, material_name, price, description, this.filestring);
}

selectedimage = null;
filestring = null;
selectedfile = null;
imagePreview = null;


onFileChanged(event) {

  var files = event.target.files;
  console.log("files"+JSON.stringify(files))
      var file = files[0];

    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }


}


_handleReaderLoaded(readerEvt) {

  var binaryString = readerEvt.target.result;
            this.imagePreview= btoa(binaryString);
            console.log(btoa(binaryString));

}

// upload(img: File) {
//   var formData: FormData = new FormData();
//   formData.append("image", img, img.name);
//    console.log("upload form")
//   var xhr = new XMLHttpRequest();
//   xhr.upload.addEventListener("progress", (ev: ProgressEvent) => {
//   });
//   xhr.open("PUT", "http://localhost:4000/KC/uploads", true);
//   console.log("form____"+JSON.stringify(formData))
//   xhr.send(formData);
// }

ngOnInit() {
}
}
