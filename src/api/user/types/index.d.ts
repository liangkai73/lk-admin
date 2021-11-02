declare namespace Ram {
  interface ramUserArr<ramUserItem> {
    [_: number]: ramUserItem;
  }
  interface ramUserItem {
    email: string;
    note: string;
    telephone: string;
    userName: string;
  }
  interface limit {
    pageNum?: number;
    pageSize?: number;
    userName?: string;
    telephone?: string;
    email?: string;
    status?: number;
  }
}
