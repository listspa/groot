import {Injectable} from '@angular/core';
import {TableAutocolConfigServiceBase} from '../../../../../groot/src/lib/groot-table-autocol/services/table-autocol-config-service-base';
import {NbpuSchemaFieldType} from '../../../../../groot/src/lib/groot-base/utils/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class DemoTableAutocolConfigService extends TableAutocolConfigServiceBase {
  constructor() {
    super(
      [
        {
          key: 'fchubFeId',
          label: 'deals.fchubFeId',
          columnName: 'fchubFeId',
          fieldName: 'fchubFeId',
          showFilters: true
        },
        {
          key: 'soaCode',
          label: 'deals.soaCode',
          columnName: 'soaCode',
          fieldName: 'soaCode',
          showFilters: true
        },
        {
          key: 'branch',
          label: 'deals.branch',
          columnName: 'branch',
          fieldName: 'branch',
          showFilters: true
        },
        {
          key: 'dealIdFe',
          label: 'deals.dealIdFe',
          columnName: 'dealIdFe',
          fieldName: 'dealIdFe',
          showFilters: true
        },
        {
          key: 'contractIdRootFe',
          label: 'deals.contractIdRootFe',
          columnName: 'contractIdRootFe',
          fieldName: 'contractIdRootFe',
          showFilters: true
        },
        {
          key: 'mFamily',
          label: 'deals.mFamily',
          columnName: 'mFamily',
          fieldName: 'mFamily',
          showFilters: true
        },
        {
          key: 'mGroup',
          label: 'deals.mGroup',
          columnName: 'mGroup',
          fieldName: 'mGroup',
          showFilters: true
        },
        {
          key: 'mType',
          label: 'deals.mType',
          columnName: 'mType',
          fieldName: 'mType',
          showFilters: true
        },
        // In addition to the raw three columns, we add a "virtual" column with special rendering
        {
          key: 'assetClass',
          label: 'deals.assetClass'
        },
        {
          key: 'packageIdFe',
          label: 'deals.packageIdFe',
          columnName: 'packageIdFe',
          fieldName: 'packageIdFe',
          widthPx: 350,
          showFilters: false
        },
        {
          key: 'uti',
          label: 'deals.uti',
          columnName: 'uti',
          fieldName: 'uti',
          showFilters: true
        },
        {
          key: 'tradeDate',
          label: 'deals.tradeDate',
          columnName: 'tradeDate',
          fieldName: 'tradeDate',
          columnType: NbpuSchemaFieldType.DATE,
          showFilters: true
        },
        {
          key: 'ndgCode',
          label: 'deals.ndgCode',
          columnName: 'ndgCode',
          fieldName: 'ndgCode',
          showFilters: true
        },
        {
          key: 'shortDescription',
          label: 'deals.shortDescription',
          columnName: 'shortDescription',
          fieldName: 'shortDescription',
          showFilters: true
        },
        {
          key: 'arrivalTime',
          label: 'deals.arrivalTime',
          columnName: 'arrivalTime',
          fieldName: 'arrivalTime',
          columnType: NbpuSchemaFieldType.TIMESTAMP,
          showFilters: true
        },
        {
          key: 'sendTime',
          label: 'deals.sendTime',
          columnName: 'sendTime',
          fieldName: 'sendTime',
          columnType: NbpuSchemaFieldType.TIMESTAMP
        },
        {
          key: 'msgTypeWeb',
          label: 'deals.msgTypeWeb',
          columnName: 'msgTypeWeb',
          fieldName: 'msgTypeWeb',
          showFilters: true
        },
        {
          key: 'des',
          label: 'deals.des',
          columnName: 'des',
          fieldName: 'des',
          showFilters: true
        },
        {
          key: 'reason',
          label: 'deals.reason',
          columnName: 'reason',
          fieldName: 'reason',
          showFilters: true
        },
        {
          key: 'amount',
          label: 'deals.amount',
          columnName: 'amount',
          fieldName: 'amount',
          showFilters: true,
          columnType: NbpuSchemaFieldType.DOUBLE
        }
      ],
      // Default selected
      ['dealIdFe', 'packageIdFe', 'uti', 'amount', 'tradeDate', 'des', 'reason'],
      // Default accordion
      ['assetClass', 'mFamily', 'mGroup', 'mType', 'ndgCode', 'sendTime', 'arrivalTime'],
      // Save keys
      'demo.deals.selected', 'demo.deals.accordion', 'demo.deals.widths');
  }
}
