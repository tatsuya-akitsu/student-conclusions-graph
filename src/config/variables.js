export const variables = {
  MY_LABELS: {
    selEq: [
      {
        label: 'selfAwareness',
        value: '自己理解',
        text:
          '自分の感情や思考を理解し、自分の他者に対する態度や行動にどのように影響しているかを理解する'
      },
      {
        label: 'selfManagement',
        value: 'セルフマネジメント',
        text:
          '難しい環境に遭っても、自分自身の感情や思考、態度をコントロールする'
      },
      {
        label: 'socialAwareness',
        value: '社会や他者への理解',
        text: '多様なバックグラウンドや文化を持つ他者に対して共感する力'
      },
      {
        label: 'relationship',
        value: '対人関係スキル',
        text:
          '多様な人々と関わるグループにおいて、他者と適切に関係を構築・維持する力'
      },
      {
        label: 'responsibleDecision',
        value: '責任ある意思決定',
        text: '人が良く生きるために自らの責任で意思決定する力のこと'
      }
    ],
    grit: [
      {
        label: 'courage',
        value: '度胸',
        text: '困難に挑み、逆境にたじろがない勇気'
      },
      { label: 'resilience', value: '復元力', text: '挫折から立ち直る力' },
      {
        label: 'spontaneity',
        value: '自発性',
        text: '率先して物事に取り組む力'
      },
      {
        label: 'obsession',
        value: '執念',
        text: 'どんなことがあっても物事に集中しつづける能力'
      }
    ],
    motivation: [
      {
        label: 'home',
        value: '家庭環境',
        text: '生徒の家庭環境について知る事が可能'
      },
      {
        label: 'friendship',
        value: '友人関係',
        text: '生徒の友人関係についてどう感じているか知る事が可能'
      },
      {
        label: 'trust',
        value: '教師への信頼度',
        text: '生徒が教師に対してどう感じているかを知る事が可能'
      },
      {
        label: 'community',
        value: 'コミュニティへの満足度',
        text: '部活動や社外活動などの満足度を知る事が可能'
      }
    ]
  },
  OUTLINES: {
    selEq: '社会性・情動スキルの教育のことで、欧米諸国で実践されている自尊感情、対人関係能力の育成を目的とした教育アプローチ',
    grit: '「やり抜く力」または「粘る力」。 困難に遭ってもくじけない闘志、気概や気骨など',
    motivation: '人が何かをする際の動機づけや目的意識を表す'
  },
  DESIGNATION_COLORS: {
    selEq: {
      category: 'SEL・EQ',
      label: 'selEq',
      color: '#00ABFF',
      background: 'rgba(229, 247, 255, 0.6)'
    },
    grit: {
      category: 'GRIT',
      label: 'grit',
      color: '#BF6BE6',
      background: 'rgba(249, 240, 252, 0.6)'
    },
    motivation: {
      category: 'モチベーション',
      label: 'motivation',
      color: '#00C09E',
      background: 'rgba(229, 249, 245, 0.6)'
    },
    deviation: {
      category: '模試',
      label: 'deviation',
      color: '#015593',
      background: 'rgba(230, 238, 244, 0.6)'
    }
  },
  OPTIONS: {
    legend: {
      labels: {
        filter: (items) => {
          return (items.text = "");
        }
      }
    },
    tooltips: {
      mode: "index",
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
            fontColor: "#7BA0A6",
            stepSize: 1 // Y軸の間隔
          },
          gridLines: {
            color: "#E1EBEB"
          }
        }
      ],
      yAxes: [
        {
          position: "right",
          ticks: {
            min: 0,
            max: 5,
            fontSize: 12,
            fontColor: "#7BA0A6",
            stepSize: 1
          },
          gridLines: {
            color: "#E1EBEB"
          }
        }
      ]
    }
  }
}
