//  获取 y - m 格式的时间
//  params : 时间戳

function getTimeStr(timer?: any, offset = 0) {
  const date1 = timer || new Date().getTime();
  let year: number, month: any;
  year = new Date(date1).getFullYear();
  month = new Date(date1).getMonth() + 1;
  if (offset != 0) {
    month += offset;
    if (month < 0) {
      month += 12;
      year -= 1;
    } else if (month > 12) {
      month -= 12;
      year += 1;
    }
  }
  month = (100 + month + "").slice(1);
  return year + "-" + month;
}

export default { getTimeStr };
