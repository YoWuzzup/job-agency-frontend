export interface IDefaultButton {
  text: string;
  handleClick?: (e: any) => void;
  inputName: string;
  propStyles?: {};
  propClassNames?: string;
  after?: JSX.Element;
  before?: JSX.Element;
}

export interface IDefaultInput {
  plholder: string;
  ariaLabel: string;
  inputName: string;
  handleChange?: (e: any) => void;
  header?: string;
  propValue?: string;
  propStyles?: {};
  headerPropStyles?: {};
  inputPropStyles?: {};
  propClassNames?: string;
  after?: React.ReactNode;
  before?: React.ReactNode;
}

export interface IDefaultMultipleSelectCheckmarks {
  plholder: string;
  dataToMap: { label: string; value: string }[];
  header?: string;
  propStyles?: {};
  propHandleChange: (e: any) => void | null;
  headerPropStyles?: {};
  inputPropStyles?: {};
  iconIfChecked?: React.ReactNode;
  iconIfUnchecked?: React.ReactNode;
  selected: string[] | string;
}

export interface IDefaultRangeSlider {
  header?: string | React.ReactNode;
  valueShownInHeader?: boolean;
  min: number;
  max?: number;
  minValue: number;
  maxValue?: number;
  step: number;
  valueDisplay: boolean;
  plholder?: string;
  propStyles?: {};
  propName?: string;
  propHandleChange?: (e: any) => void;
  headerPropStyles?: {};
  inputPropStyles?: {};
}

export interface IDefaultSwitch {
  label: string;
  propName: string;
  checked: boolean;
  propHandleChange: any;
  propStyles?: {};
  labelPropStyles?: {};
}

export interface IDefaultGroupedSwitch {
  header: string;
  headerPropStyles?: {};
  propHandleChange?: (e: any) => void;
  propStyles?: {};
  switches: { name: string; value: boolean; label: string }[];
}
