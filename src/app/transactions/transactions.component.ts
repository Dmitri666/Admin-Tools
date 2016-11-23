import { Component, OnInit } from '@angular/core';
import {TransactionsViewModel} from './TransactionViewModel';
import {Model} from './Model';
import {DataService} from '../../../core/qdata/src/DataService';
import {GlobalSettings} from "../constants/global-settings";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  public viewModel: TransactionsViewModel;
  constructor(private dataService: DataService) {
    let dataModel = new Model(dataService, GlobalSettings.API_ENDPOINT + '/contact');
    this.viewModel = new TransactionsViewModel(dataModel);
    this.viewModel.refresh();
  }

  ngOnInit() {
  }

}
