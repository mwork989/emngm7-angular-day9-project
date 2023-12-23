import { Component } from '@angular/core';
import { IUserFormData } from 'src/app/models/user.model';
import { UserformService } from 'src/app/services/userform.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {
  


   public userForm :IUserFormData;
   constructor(public userFormService:UserformService){
      this.userForm={} as IUserFormData;
   }

   
  public ngOnInit(): void {
    
  }
 


  public onSubmit(fromData:IUserFormData):void{


      // will submit the userform data to jsonserver backend
      // Check if all values in the form data are not empty
      const isFormValid = Object.values(fromData).every(value => !!value)
      if(isFormValid){
        this.userFormService.sendTemplateFormDataDetails(this.userForm).subscribe((
          response:IUserFormData
        )=>{
          console.log("response from json-server",response)
        })
      }
    
  }
}
