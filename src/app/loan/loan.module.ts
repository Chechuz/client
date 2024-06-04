import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LoanListComponent } from './loan-list/loan-list.component';
import { LoanAddComponent } from './loan-add/loan-add.component';
import { LoanSearchComponent } from './loan-search/loan-search.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { LoanService } from './loan.service';
import { GameService } from '../game/game.service';
import { ClientService } from '../client/client.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    LoanListComponent,
    LoanAddComponent,
    LoanSearchComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule, 
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatPaginatorModule
  ],
  providers: [
    LoanService,
    GameService,
    ClientService,
    DatePipe
  ]
})
export class LoanModule { }
