import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModelsService } from './../../shared/services/models/models.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Model } from './../../shared/services/models/model';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { AddModelComponent } from './dialogs/add-model/add-model.component';
import { EditModelComponent } from './dialogs/edit-model/edit-model.component';
import { DeleteModelComponent } from './dialogs/delete-model/delete-model.component';


@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  displayedColumns = ['id','manufacturer_name', 'model_name', 'model_count', 'actions'];
  modelsDatabase: ModelsService | null;
  dataSource: ModelsDataSource | null;
  index: number;
  id: number;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: ModelsService
  ) { }

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild('filter')
  filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(model: Model) {
    const dialogRef = this.dialog.open(AddModelComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: { model }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside ModelsService
        this.modelsDatabase.dataChange.value.push(
          this.dataService.getDialogData()
        );
        this.refreshTable();
      }
    });
  }

  startEdit(
    i: number,
    id: number,
    manufacturer_id: number,
    model_name: string,
    color: string,
    manufacturing_year: number,
    registration_number: number,
    note: string,
    first_image: string,
    second_image: string,
    model_count: number,
    created_at: string
  ) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(EditModelComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {
        id,
        manufacturer_id,
        model_name,
        color,
        manufacturing_year,
        registration_number,
        note,
        first_image,
        second_image,
        model_count,
        created_at
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.modelsDatabase.dataChange.value.findIndex(
          x => id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.modelsDatabase.dataChange.value[
          foundIndex
        ] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(
    i: number,
    id: number,
    manufacturer_id: number,
    model_name: string,
    color: string,
    manufacturing_year: number,
    registration_number: number,
    note: string,
    first_image: string,
    second_image: string,
    model_count: number,
    created_at: string
  ) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteModelComponent, {
      data: {
        id,
        manufacturer_id,
        model_name,
        color,
        manufacturing_year,
        registration_number,
        note,
        first_image,
        second_image,
        model_count,
        created_at
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.modelsDatabase.dataChange.value.findIndex(
          x => id === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.modelsDatabase.dataChange.value.splice(foundIndex, 1);
        this.loadData();
      }
    });
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  private refreshTable() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.modelsDatabase = new ModelsService(this.httpClient);
    this.dataSource = new ModelsDataSource(
      this.modelsDatabase,
      this.paginator,
      this.sort
    );
    fromEvent(this.filter.nativeElement, 'keyup')
    //  .debounceTime(150)
     // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}


export class ModelsDataSource extends DataSource<Model> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Model[] = [];
  renderedData: Model[] = [];

  constructor(public _modelsDatabase: ModelsService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Model[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._modelsDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._modelsDatabase.getModels();

    return merge(...displayDataChanges).pipe(map( () => {
      // Filter data
      this.filteredData = this._modelsDatabase.data.slice().filter((model: Model) => {
        if(model !== undefined) {
          const searchStr = (model.model_name).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;  
        }
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;

    })
    );
  }
  disconnect() {
  }



  /** Returns a sorted copy of the database data. */
  sortData(data: Model[]): Model[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'model_name':
          [propertyA, propertyB] = [a.model_name, b.model_name];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
