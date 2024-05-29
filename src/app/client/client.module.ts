import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    ClientListComponent,
    ClientEditComponent,
  ],

  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {},
    },
  ]
})
export class ClientModule { }
