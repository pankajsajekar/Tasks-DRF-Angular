import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../../_services/common.service';
import { NgFor, SlicePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor,
    SlicePipe,
    ReactiveFormsModule,
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent  implements OnInit {
  
  @ViewChild('closeEditTaskModal')
  closeEditTaskModal!: ElementRef;
  @ViewChild('closeAddTaskModal')
  closeAddTaskModal!: ElementRef;

  TaskForm!: FormGroup;
  EditTaskForm!: FormGroup;

  taskStatus = [
    {value: 'Pending', viewValue: 'Pending' },
    {value: 'Completed', viewValue: 'Completed' },
  ]

constructor(private CommonService: CommonService,
  private accountService: AccountService,
   private formBuilder:FormBuilder,
   private router: Router,
  private toastrService: ToastrService ){
}

  ngOnInit():void{
    this.LoadData();

    this.TaskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['',]
    })
    this.TaskForm.controls['status'].setValue('Pending'); 

    this.EditTaskForm = this.formBuilder.group({
      title: [''],
      description: [''],
      status: ['']
    });

  }

  AddTask(){
    console.log(this.TaskForm.value)
    if (this.TaskForm.invalid){
      // alert("Please Fill all required Fields");
      this.toastrService.info("Please Fillup all Fields");
      return 
    }
    else{
      const body = this.TaskForm.value
      this.CommonService.PostMethod('/task/add/', body).subscribe({
        next: (res:any)=>{
          if(res.code == 201){}
          this.LoadData();
          this.toastrService.success("New Task Added Successfully");
          this.closeAddTaskModal.nativeElement.click();
          this.TaskForm.reset();
        },
        error: (err:any) =>{
          alert(err)
        }
      })
    }
  }

  selectedTask : any;
  EditTask(item: any) {
    this.selectedTask = item;
    this.EditTaskForm.patchValue({
      title: item.title,
      description: item.description,
      status: item.status
    });
  }

  UpdateTask(){
    console.log(this.EditTaskForm.value)
    if (this.EditTaskForm.invalid){
      // alert("Please Fill all required Fields");
      this.toastrService.info("Please Fillup all Fields");
      return 
    }
      else{
        const body = this.EditTaskForm.value
        this.CommonService.PutMethod('/task/'+this.selectedTask.id+'/', body).subscribe({
        next: (res:any) => {
          console.log(res)
          this.LoadData();
          this.toastrService.success("Task Update Successfully");
          this.closeEditTaskModal.nativeElement.click();
        },
        error: (err:any) =>{
          alert(err)
        }
      });
    }
  }
  DelTask(item:any){
    this.CommonService.DeleteMethod('/task/'+item.id+'/').subscribe({
      next: (res:any) => {
        console.log(res)
        this.toastrService.error("Task Delete Successfully");
        this.LoadData();
      },
      error: (err:any) =>{
        alert(err)
      }
    });
  }

  TaskList: any;
  LoadData(){
    this.CommonService.GetMethod('/').subscribe({
      next: (res:any) => {
        console.log(res);
        if(!(res['data'] === undefined || res === null || Object.keys(res['data']).length === 0) ){
          this.TaskList = res.data
        }
        else{
          this.TaskList = []
        }
      },
      error: (error:any) => {
        console.warn(error)
      }});
  }


  logout(){
    this.accountService.logout()
    this.router.navigate(['/account/login'])
  }

}

