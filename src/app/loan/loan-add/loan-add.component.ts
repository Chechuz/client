import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { LoanService } from '../loan.service';
import { GameService } from 'src/app/game/game.service'; 
import { ClientService } from 'src/app/client/client.service';
import { Game } from 'src/app/game/model/Game';
import { Client } from 'src/app/client/model/Client';
import { Loan } from '../model/Loan';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-loan-add',
  templateUrl: './loan-add.component.html',
  styleUrls: ['./loan-add.component.scss']
})
export class LoanAddComponent implements OnInit {
  loanForm: FormGroup;
  games: Game[] = [];
  clients: Client[] = [];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar,
    private loanService: LoanService,
    private gameService: GameService,
    private clientService: ClientService,
    public dialogRef: MatDialogRef<LoanAddComponent>
  ) { }

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      game: ['', Validators.required],
      client: ['', Validators.required],
      loan_date: ['', Validators.required],
      return_date: ['', Validators.required]
    });

    // Cargar juegos y clientes
    this.gameService.getGames().subscribe(games => this.games = games);
    this.clientService.getClients().subscribe(clients => this.clients = clients);
  }

  onSave(): void {
    if (this.loanForm.invalid) {
      return;
    }

    const loanData = this.loanForm.getRawValue();
    const diffInDays = this.calculateDateDifferenceInDays(loanData.loan_date, loanData.return_date);
  // Obtener las partes de la fecha y formatearlas
    const loanDate = this.formatDate(loanData.loan_date);
    const returnDate = this.formatDate(loanData.return_date);

    console.log('Datos del formulario:', loanData);

    if (diffInDays > 14) {
      this.showAlert('El período de préstamo máximo es de 14 días. Por favor, seleccione un período más corto.');
    } else {
      const newLoan: Loan = {
        id: null,
        game: loanData.game.id,
        client: loanData.client.id,
        loan_date: loanData.loanDate,
        return_date: loanData.returnDate
      };

      this.loanService.saveLoan(newLoan).subscribe({
        next: () => {
          this.showAlert('Préstamo guardado exitosamente.');
          this.dialogRef.close(true); // Cierra el diálogo y pasa un valor de retorno
        },
        error: () => this.showAlert('Ocurrió un error al guardar el préstamo.')
      });
    }
  }

  onClose(): void {
    this.dialogRef.close(); // Cierra el diálogo
  }

  private calculateDateDifferenceInDays(startDate: Date, endDate: Date): number {
    const startTime = new Date(startDate).getTime();
    const endTime = new Date(endDate).getTime();
    const diffInMs = endTime - startTime;
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }

  private showAlert(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000
    });
  }
  // Método para formatear la fecha
  formatDate(date: Date): string {
    const year = date.getFullYear().toString().slice(4); // Obtiene los dígitos del año
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Agrega un cero al principio si el mes es de un solo dígito
    const day = date.getDate().toString().padStart(2, '0'); // Agrega un cero al principio si el día es de un solo dígito
    return `${year}-${month}-${day}`;
  }
}
