export default {
  methods: {
    setOptions() {
      this.options = {
        legend: {
          labels: {
            filter: (items) => {
              return (items.text = '')
            }
          }
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true, // Y軸の表示
              ticks: {
                min: 0, // Y軸の最小値
                max: 5, // Y軸の最大値
                fontSize: 12, // Y軸のフォントサイズ
                fontColor: '#7BA0A6',
                stepSize: 1 // Y軸の間隔
              },
              gridLines: {
                color: '#E1EBEB'
              }
            }
          ],
          yAxes: [
            {
              position: 'right',
              ticks: {
                min: 0,
                max: 5,
                fontSize: 12,
                fontColor: '#7BA0A6',
                stepSize: 1
              },
              gridLines: {
                color: '#E1EBEB'
              }
            }
          ]
        }
      }
    }
  }
}
