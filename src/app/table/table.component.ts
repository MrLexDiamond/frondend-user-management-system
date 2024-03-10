import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  StudentArray : any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  
  fname: string ="";
  lname: string ="";
  bdate: string ="";
  gender: string ="";
  email: string ="";
  mnumber: string ="";
  address: string ="";
  currentStudentID = "";

constructor(private http: HttpClient ) 
{
  this.getAllStudent();
}
ngOnInit(): void {
}
getAllStudent()
{ 
  this.http.get("http://localhost:8585/api/student/")
  .subscribe((resultData: any)=>
  {
      this.isResultLoaded = true;
      console.log(resultData.data);
      this.StudentArray = resultData.data;
  });
}

// Register
register()
{
  let bodyData = {
    "fname" : this.fname,
    "lname" : this.lname,
    "bdate" : this.bdate,
    "gender" : this.gender,
    "email" : this.email,
    "mnumber" : this.mnumber,
    "address" : this.address,
  };
  this.http.post("http://localhost:8585/api/student/add",bodyData).subscribe((resultData: any)=>
  {
      console.log(resultData);
      alert("Employee Registered Successfully")
      this.getAllStudent();
  });
}

// Update
setUpdate(data: any) 
  {
    this.fname = data.fname;
    this.lname = data.lname;
    this.bdate = data.bdate;
    this.gender = data.gender;
    this.email = data.email;
    this.mnumber = data.mnumber;
    this.address = data.address;

    this.currentStudentID = data.id;
  
    const modelDiv = document.getElementById('myModal');
    if(modelDiv!= null){
      modelDiv.style.display = 'block';
    }
  }
UpdateRecords()
{
  let bodyData = 
  {
    "fname" : this.fname,
    "lname" : this.lname,
    "bdate" : this.bdate,
    "gender" : this.gender,
    "email" : this.email,
    "mnumber" : this.mnumber,
    "address" : this.address,
  };
  
  this.http.put("http://localhost:8585/api/student/update"+ "/"+ this.currentStudentID,bodyData).subscribe((resultData: any)=>
  {
      console.log(resultData);
      alert("Student Registered Updateddd")
      this.getAllStudent();
    
  });
}

// Save
save()
{
  if(this.currentStudentID == '')
  {
      this.register();
  }
    else
    {
      this.UpdateRecords();
    }       

}

// Delete
setDelete(data: any)
{
  this.http.delete("http://localhost:8585/api/student/delete"+ "/"+ data.id).subscribe((resultData: any)=>
  {
      console.log(resultData);
      alert("Student Deletedddd")
      this.getAllStudent();
  });
}

// Popup button
openModel() {
  const modelDiv = document.getElementById('myModal');
  if(modelDiv!= null){
    modelDiv.style.display = 'block';
  }
}
CloseModel() {
  const modelDiv = document.getElementById('myModal');
  if(modelDiv!= null){
    modelDiv.style.display = 'none';
  }
}
}
