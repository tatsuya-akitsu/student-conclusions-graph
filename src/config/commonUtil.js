import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.locale('ja')

export const commonUtil = {
  sortDateAsc(arr) {
    return [...arr].sort((a, b) => dayjs(a.created) - dayjs(b.created))
  },
  setSummaryChartData(data, { background, color }) {
    const dataset = data
    const sortArr = this.sortDateAsc(dataset)
    const chartData = {
      labels: sortArr.map((d) => dayjs(d.created_at).format('M') + '月'),
      datasets: [
        {
          data: sortArr.map((d) => d.value || d.score),
          lineTension: 0,
          backgroundColor: background,
          borderColor: color,
          pointBackgroundColor: color
        }
      ]
    }
    return chartData
  },
  setDetailChartData(data, { background, color }) {
    const dataset = data
    const sortArr = this.sortDateAsc(dataset)
    const chartData = {
      labels: sortArr.map((d) => dayjs(d.created_at).format('M') + '月'),
      datasets: [
        {
          data: sortArr.map((d) => d.value),
          lineTension: 0,
          backgroundColor: background,
          borderColor: color,
          pointBackgroundColor: color
        }
      ]
    }
    return chartData
  }
}
