function formatTopicTime(time){
  const msec = new Date(time).getTime(),
    curMsec = new Date().getTime(),
    gapSeconds = Math.floor((curMsec - msec) / 1000);

  const formatFuc = function(baseTime, suffix){
    return Math.floor(gapSeconds / baseTime) + suffix;
  };

  let formatTime = '';

  switch(true){
    case gapSeconds < 60 :
      formatTime = '刚刚';
      break;

    case gapSeconds < 60 * 60 :
      formatTime = formatFuc(60, '分钟前');
      break;

    case gapSeconds < 60 * 60 * 24 :
      formatTime = formatFuc(60*60, '小时前');
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
  };

  return formatTime;
}

function formatTime(time, format='yyyy-MM-dd hh:mm:ss.S'){
  time = new Date(time);
  const o = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'S' : time.getMilliseconds(),
  };
  if (/(y+)/.test(format)) {
    const year = time.getFullYear() + "",
      matched = RegExp.$1;
    format = format.replace(matched, year.substr(4 - matched.length));
  }
  for (let key in o) {
    if (new RegExp("("+key+")").test(format)) {
      const matched = RegExp.$1;
      format = format.replace(matched, matched.length === 1 ? o[key] : ("00" + o[key]).substr(("" + o[key]).length));
    }
  }
  return format;
}

function getLabel(topic){
  if (topic.top) {
    return 'top';
  }
  if (topic.good) {
    return 'good';
  }
  const tab = topic.tab;
  return tab || 'notab';
}

function formatLabel(label){
  const labelMap = {
    share: '分享',
    ask: '问答',
    good: '精华',
    job: '工作',
    all: '全部',
    top: '置顶',
  }

  return label === 'notab' ? '暂无' : labelMap[label];
}

export default{
  formatTime,
  formatTopicTime,
  formatLabel,
  getLabel,
};
