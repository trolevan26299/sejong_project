export interface IMenu {
  id: number | null;
  menuId: null | string;
  menuNm: null | string;
  menuDisplayNm: null | string;
  menuUrl: null | string;
  menuOrder: number | null;
  depth: number | null;
  usedYn: null | string;
  viewYn: null | string;
  editYn: null | string;
  children: null | Array<IMenu>;
}

export interface Product {
  id?: number | null;
  userName: string;
  category: string;
  regDt: string;
  email: string;
  pwd: string;
  viewCnt: number;
  title: string;
  body: string;
}

export interface Filter {
  _page?: number;
  _limit?: number;
  regDt_gte?: string;
  regDt_lte?: string;
  q?: string;
  userName_like?: string;
  title_like?: string;
  body_like?: string;
  _sort?: string;
  _order?: string;
}
