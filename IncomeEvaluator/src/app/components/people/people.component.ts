import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatGridTile, MatGridList } from '@angular/material/grid-list';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardFooter,
  MatCardImage,
  MatCardTitle,
  MatCardActions,
} from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { MatProgressBar } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { UserService } from '../../user.service';
import { TaxDataService } from '../../taxdata.service';
import { Observable } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  MatSort,
  Sort,
  MatSortHeader,
  MatSortDefaultOptions,
  MatSortModule,
} from '@angular/material/sort';
import { Person } from '../../user.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [
    MatGridList,
    MatFormField,
    MatLabel,
    MatCard,
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardContent,
    MatToolbar,
    MatCardHeader,
    MatCardFooter,
    MatCardImage,
    MatCardTitle,
    MatCardActions,
    MatGridTile,
    MatCardImage,
    MatInput,
    MatButton,
    MatProgressBar,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
  ],
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent implements OnInit, AfterViewInit {
  userId: string = '';
  people: any[] = [];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'zipCode',
    'income',
    'incomeVsZipAvg',
    'incomeVsStateAvg',
    'actions',
  ];
  dataSource = new MatTableDataSource(this.people);
  personForm!: FormGroup;
  showAddPersonForm = false;
  editMode = false;
  currentPersonId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private liveAnnouncer: LiveAnnouncer,
    private taxDataService: TaxDataService
  ) {}

  ngOnInit() {
    this.personForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      zipCode: ['', Validators.required],
      income: [0, Validators.required],
      incomeVsZipAvg: [{ value: 0, disabled: true }],
      incomeVsStateAvg: [{ value: 0, disabled: true }],
    });

    this.route.paramMap.subscribe((params) => {
      if (params.get('id') != localStorage.getItem('userId')) {
        this.router.navigate(['/']);
      }
      this.userId = params.get('id') || '';
      this.loadPeople();
    });
  }

  @ViewChild(MatSort)
  sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  toggleAddPersonForm() {
    this.showAddPersonForm = !this.showAddPersonForm;
    this.editMode = false;
    this.currentPersonId = null;
    this.personForm.reset();
  }

  savePerson() {
    if (this.personForm.invalid) {
      return;
    }

    const personData = this.personForm.value;
    personData.userID = parseInt(this.userId, 10);

    if (this.editMode) {
      personData.personID = this.currentPersonId;
      this.userService.editPerson(personData).subscribe(() => {
        this.loadPeople();
        this.toggleAddPersonForm();
      });
    } else {
      this.userService.addPerson(personData).subscribe(() => {
        this.loadPeople();
        this.toggleAddPersonForm();
      });
    }
  }

  editPerson(person: any) {
    this.personForm.patchValue(person);
    this.editMode = true;
    this.currentPersonId = person.personID;
    this.showAddPersonForm = true;
  }

  deletePerson(person: any) {
    this.userService.deletePerson(person.personID).subscribe(() => {
      this.loadPeople();
    });
  }

  loadPeople() {
    this.userService
      .getUserPeople(parseInt(this.userId, 10))
      .subscribe((data) => {
        this.people = data;
        this.people.forEach((person) => {
          this.taxDataService
            .getZipCodeTaxData(person.zipCode)
            .subscribe((zipData) => {
              const zipAvgIncome =
              (zipData.reduce(
                (acc: any, curr: { adjustedGrossIncome: any }) =>
                  acc + curr.adjustedGrossIncome * 1000,
                0
              ) /
              (zipData.reduce(
                (acc: any, curr: { numberOfIndividuals: any }) =>
                  acc + curr.numberOfIndividuals,
                0
              )));

              const state = zipData[0]['state'];
              this.taxDataService
                .getStateTaxData(state)
                .subscribe((stateData) => {
                  const stateAvgIncome =
                    (stateData.reduce(
                      (acc: any, curr: { adjustedGrossIncome: any }) =>
                        acc + curr.adjustedGrossIncome * 1000,
                      0
                    ) /
                    (stateData.reduce(
                      (acc: any, curr: { numberOfIndividuals: any }) =>
                        acc + curr.numberOfIndividuals,
                      0
                    )));

                  person.incomeVsZipAvg = this.calculateIncomePercentage(
                    person.income,
                    zipAvgIncome
                  ).toFixed(2);
                  person.incomeVsStateAvg = this.calculateIncomePercentage(
                    person.income,
                    stateAvgIncome
                  ).toFixed(2);
                });
            });
        });
        this.dataSource.data = this.people;
      });
  }

  calculateIncomePercentage(income: number, comparison: number) {
    return (income / comparison);
  }
}
