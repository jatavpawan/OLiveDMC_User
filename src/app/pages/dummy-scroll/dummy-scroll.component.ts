// import { Component, OnInit } from '@angular/core';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';


@Component({
  selector: 'app-dummy-scroll',
  templateUrl: './dummy-scroll.component.html',
  styleUrls: ['./dummy-scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DummyScrollComponent implements OnInit {

    ds = new MyDataSource();
  constructor() { }

  ngOnInit(): void {
  }

}



export class MyDataSource extends DataSource<string | undefined> {
  private _length = 100000;
  private _pageSize = 50;
  private _cachedData = Array.from<string>({length: this._length});
  private _fetchedPages = new Set<number>();
  private _dataStream = new BehaviorSubject<(string | undefined)[]>(this._cachedData);
  private _subscription = new Subscription();

  connect(collectionViewer: CollectionViewer): Observable<(string | undefined)[]> {

      debugger;

    this._subscription.add(collectionViewer.viewChange.subscribe(range => {
      debugger
      const startPage = this._getPageForIndex(range.start);
      const endPage = this._getPageForIndex(range.end - 1);
      for (let i = startPage; i <= endPage; i++) {
        this._fetchPage(i);
      }
    }));
    return this._dataStream;
  }

  disconnect(): void {
    this._subscription.unsubscribe();
  }

  private _getPageForIndex(index: number): number {
    debugger;
    return Math.floor(index / this._pageSize);
  }

  private _fetchPage(page: number) {
    debugger;
    if (this._fetchedPages.has(page)) {
      return;
    }
    this._fetchedPages.add(page);

    // Use `setTimeout` to simulate fetching data from server.
    setTimeout(() => {
      debugger;
      this._cachedData.splice(page * this._pageSize, this._pageSize,
          ...Array.from({length: this._pageSize})
              .map((_, i) => `Item #${page * this._pageSize + i}`));
      this._dataStream.next(this._cachedData);
    }, Math.random() * 1000 + 200);
  }
}
