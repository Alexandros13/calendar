import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, ActionEventArgs, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { View } from '@syncfusion/ej2-angular-schedule';
import { tap } from 'rxjs';
import { CRMAction } from './crmaction.model';
@Component({
  selector: 'app-root',
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
  //templateUrl: './app.component.html',//
  styleUrls: ['./app.component.css'],
  template: `<ejs-schedule height="850" width="1250" (deleteEvent)="deleteCrmAction($event)"[eventSettings]="eventSettings" [selectedDate]="selectedDate" (actionBegin)="getNewFromPlano()" (actionComplete)="printArgs($event)"> </ejs-schedule>`
})
export class AppComponent implements OnInit {
  actionsList:CRMAction[] = [];
  actionsListForSyncfusion: Object[] = [];
  crmAction:CRMAction = {} as CRMAction;
  title = 'calendar';
  reqJson:any;
  /**
   *
   */
  constructor(private http:HttpClient) {
  }
  ngOnInit():void{
    this.getAllCRMActions()
  }
  public eventSettings: EventSettingsModel = { dataSource: this.actionsListForSyncfusion };
  public selectedDate: Date = new Date();
  getNewFromPlano(){
    const headers = {'content-type':'application/json','key':'1de6a576-7589-438d-8868-0956d012c415'}
    this.http.get<any>("http://65.108.6.222/api/crm/crmactions/getnew",{'headers':headers}).pipe(
      tap(resp => {
        this.crmAction = resp.collection[0];
      })
    ).subscribe()
  }
deleteCrmAction(event:any){
      let collection = [{id:event}]
      let payload = {collection}
  let body = payload
  const headers = {'content-type':'application/json','key':'1de6a576-7589-438d-8868-0956d012c415'}
  this.http.post<any>("http://65.108.6.222/api/crm/crmactions/delete",body,{'headers':headers}).pipe(
    tap(resp => {
    })
  ).subscribe(x => this.mappingmethod())
}
getAllCRMActions(){
  const headers = {'content-type':'application/json','key':'1de6a576-7589-438d-8868-0956d012c415'}
  this.http.get<any>("http://65.108.6.222/api/crm/crmactions/getall",{'headers':headers}).pipe(
    tap(resp => {
      this.actionsList = resp.collection;
    })
  ).subscribe(x => this.mappingmethod())
}
  mappingmethod(){
    this.actionsList.forEach(element => {
    this.actionsListForSyncfusion.push(
      {
        Subject:element.name,
        StartTime:element.entryDate,
        EndTime:element.endDate
      }
    )
  })
  }
  printArgs(args:any){
    args.addedRecords?.forEach((element: { Subject: any; StartTime :any; EndTime:any;}) => {
      this.crmAction.name = element.Subject;
      this.crmAction.entryDate = element.StartTime;
      this.crmAction.endDate = element.EndTime;
      let collection = [this.crmAction]
      let payload = {collection}
      let collection1 = [{collection}]
      console.log(payload)
      const headers = {'content-type':'application/json','key':'1de6a576-7589-438d-8868-0956d012c415'}
      this.http.post<any>("http://65.108.6.222/api/crm/crmactions",payload,{'headers':headers}).pipe(
        tap(x => {
          console.log(x.collection[0])
        })
      ).subscribe()
      //console.log(this.crmAction)
      //window.alert("Evala CRM Ergasia gia ton "+element.Subject+ " stis " + element.StartTime)
    });
  }
}
