export interface CRMAction extends PLMasterObject {
    contactID: string;
    refContactID: string | null;
    type: CRMActionType;
    entryDate: string;
    scheduledDate: string | null;
    executionDate: string | null;
    endDate: string | null;
    sellerID: string | null;
    notes: string;
    categoryID: string | null;
    memos:any[];
    status:any[];
    actionStatusID: string | null;
    actionResources:any[];
  }
  export interface PLMasterObject extends PLObject {
    code: string;
    name: string;
    refNum: number | null;
    revision: number;
    creationDate: string;
    updateDate: string;
    creationUserID: string;
    updateUserID: string;
    isActive: boolean;
  }
  export interface PLObject {
    id: string;
    isNew: boolean;
    jExtraFields:any;
}
export enum CRMActionType{
    Request=0,
    Appointment=1,
    Communication=2,
    Task=3
}