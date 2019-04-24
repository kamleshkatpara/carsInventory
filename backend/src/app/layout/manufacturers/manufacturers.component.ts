import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ManufacturersService } from './../../shared/services/manufacturers/manufacturers.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Manufacturer } from './../../shared/services/manufacturers/manufacturer';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { AddManufacturerComponent } from './dialogs/add-manufacturer/add-manufacturer.component';
import { EditManufacturerComponent } from './dialogs/edit-manufacturer/edit-manufacturer.component';
import { DeleteManufacturerComponent } from './dialogs/delete-manufacturer/delete-manufacturer.component';


@Component({
  selector: 'app-manufacturers',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.css']
})
export class ManufacturersComponent implements OnInit {
  displayedColumns = ['id','manufacturer_name', 'created_at', 'updated_at', 'actions'];
  manufacturersDatabase: ManufacturersService | null;
  dataSource: ManufacturersDataSource | null;
  index: number;
  id: number;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: ManufacturersService
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

  addNew(manufacturer: Manufacturer) {
    const dialogRef = this.dialog.open(AddManufacturerComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: { manufacturer }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside ManufacturersService
        this.manufacturersDatabase.dataChange.value.push(
          this.dataService.getDialogData()
        );
        this.refreshTable();
      }
    });
  }

  startEdit(
    i: number,
    id: number,
    manufacturer_name: string,
    created_at: string,
    updated_at: string
  ) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(EditManufacturerComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {
        id,
        manufacturer_name,
        created_at,
        updated_at
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.manufacturersDatabase.dataChange.value.findIndex(
          x => id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.manufacturersDatabase.dataChange.value[
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
    manufacturer_name: string
  ) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteManufacturerComponent, {
      data: {
        id,
        manufacturer_name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.manufacturersDatabase.dataChange.value.findIndex(
          x => id === this.id
        );
        // for delete we use splice in order to remove single object from DataService
        this.manufacturersDatabase.dataChange.value.splice(foundIndex, 1);
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
    this.manufacturersDatabase = new ManufacturersService(this.httpClient);
    this.dataSource = new ManufacturersDataSource(
      this.manufacturersDatabase,
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


export class ManufacturersDataSource extends DataSource<Manufacturer> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Manufacturer[] = [];
  renderedData: Manufacturer[] = [];

  constructor(public _manufacturersDatabase: ManufacturersService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Manufacturer[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._manufacturersDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._manufacturersDatabase.getManufacturers();

    return merge(...displayDataChanges).pipe(map( () => {
      // Filter data
      this.filteredData = this._manufacturersDatabase.data.slice().filter((manufacturer: Manufacturer) => {
        if(manufacturer !== undefined) {
          const searchStr = (manufacturer.manufacturer_name).toLowerCase();
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
  sortData(data: Manufacturer[]): Manufacturer[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'manufacturer_name':
          [propertyA, propertyB] = [a.manufacturer_name, b.manufacturer_name];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
