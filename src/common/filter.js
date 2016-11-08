/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign*/

function formatTopicTime(time) {
  const msec = new Date(time).getTime();
  const curMsec = new Date().getTime();
  const gapSeconds = Math.floor((curMsec - msec) / 1000);

  function formatFuc(baseTime, suffix) {
    return Math.floor(gapSeconds / baseTime) + suffix;
  }

  let formatTime = '';

  switch (true) {
    case gapSeconds < 60 :
      formatTime = '刚刚';
      break;

    case gapSeconds < 60 * 60 :
      formatTime = formatFuc(60, '分钟前');
      break;

    case gapSeconds < 60 * 60 * 24 :
      formatTime = formatFuc(60 * 60, '小时前');
      break;

    case gapSeconds < 60 * 60 * 24 * 30 :
      formatTime = formatFuc(60 * 60 * 24, '天前');
      break;

    case gapSeconds < 60 * 60 * 24 * 30 * 12 :
      formatTime = formatFuc(60 * 60 * 24 * 30, '月前');
      break;

    case gapSeconds > 60 * 60 * 24 * 30 * 12 :
      formatTime = formatFuc(60 * 60 * 24 * 30 * 12, '年前');
      break;

    default : break;
  }

  return formatTime;
}

function formatTime(time, format = 'yyyy-MM-dd hh:mm:ss.S') {
  time = new Date(time);
  const o = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    S: time.getMilliseconds(),
  };
  if (/(y+)/.test(format)) {
    const year = String(time.getFullYear());
    const matched = RegExp.$1;
    format = format.replace(matched, year.substr(4 - matched.length));
  }
  for (const key of Object.keys(o)) {
    if (new RegExp(`(${key})`).test(format)) {
      const matched = RegExp.$1;
      format = format.replace(matched, matched.length === 1 ? o[key] : `00${o[key]}`.substr(String(o[key]).length));
    }
  }
  return format;
}

export function getLabel(topic) {
  if (topic.top) {
    return 'top';
  }
  if (topic.good) {
    return 'good';
  }
  const tab = topic.tab;
  return tab || 'notab';
}

export function formatLabel(label) {
  const labelMap = {
    share: '分享',
    ask: '问答',
    good: '精华',
    job: '工作',
    all: '全部',
    top: '置顶',
  };

  return label === 'notab' ? '暂无' : labelMap[label];
}

export default{
  formatTime,
  formatTopicTime,
  formatLabel,
  getLabel,
};
