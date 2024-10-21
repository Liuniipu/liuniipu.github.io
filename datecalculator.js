// 初始化Flatpickr日期选择器
flatpickr("#startDate", { dateFormat: "Y-m-d" });
flatpickr("#endDate", { dateFormat: "Y-m-d" });

// 使用date-fns计算日期差
function calculateDateDifference() {
  var startDateStr = document.getElementById('startDate').value;
  var endDateStr = document.getElementById('endDate').value;

  if (startDateStr && endDateStr) {
    var startDate = dateFns.parseISO(startDateStr);
    var endDate = dateFns.parseISO(endDateStr);

    // 确保结束日期不早于开始日期
    if (dateFns.isBefore(endDate, startDate)) {
      document.getElementById('result').textContent = '目前尚不支援時光機，最後一天不能早於第一天。';
      return;
    }

    // 计算年、月、天
    var difference = dateFns.intervalToDuration({ start: startDate, end: endDate });

 // 获取差异年、月、天，并用默认值0替换未定义值
 var years = difference.years || 0;
 var months = difference.months || 0;
 var days = difference.days || 0;

 // 根据差异情况显示不同的格式
 var resultText = '就這樣過了';
 if (years > 0) resultText += years + ' 年 ';
 if (months > 0 || years > 0) resultText += months + ' 月 ';
 resultText += days + ' 天';

    document.getElementById('result').textContent = 
    //   '日期差：' + difference.years + ' 年 ' + difference.months + ' 月 ' + difference.days + ' 天';
    resultText;
  } else {
    document.getElementById('result').textContent = '請先選擇兩個日期。';
  }
}