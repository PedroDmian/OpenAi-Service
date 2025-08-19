export interface IRule {
  entity_type: string;
  field_name: string;
  description: string;
  is_required: number;
  conditions: any;
}

export interface IPermission {
  type: string;
  name: string;
  description: string;
  rules: IRule[];
}

export interface IModule {
  name: string;
  description: string;
  permissions: IPermission[];
}
