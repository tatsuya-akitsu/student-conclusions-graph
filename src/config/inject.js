import { variables } from '@/config/variables.js'
import { commonUtil as _c } from '@/config/commonUtil.js'

export const createGraphData = (summary, list, contentLabel, keyLabel) => {
  const survey = {
    category: variables.DESIGNATION_COLORS[contentLabel].category,
    label: variables.DESIGNATION_COLORS[contentLabel].label,
    color: variables.DESIGNATION_COLORS[contentLabel].color,
    background: variables.DESIGNATION_COLORS[contentLabel].background,
    summary: summary.summary[keyLabel][0],
    monthly: summary.monthly[keyLabel],
    feature: switchInjectFeature(keyLabel, list),
    summaryData: _c.setSummaryChartData(summary.monthly[keyLabel], {
      background: variables.DESIGNATION_COLORS[contentLabel].background,
      color: variables.DESIGNATION_COLORS[contentLabel].color
    }),
    detailData: _c.setDetailChartData(
      switchInjectFeature(keyLabel, list)[variables.MY_LABELS[variables.DESIGNATION_COLORS[contentLabel].label][0].label].data,
      {
        background: variables.DESIGNATION_COLORS[contentLabel].background,
        color: variables.DESIGNATION_COLORS[contentLabel].color
      }
    ),
    details: {
      intro: {
        title: variables.MY_LABELS[variables.DESIGNATION_COLORS[contentLabel].label][0].value,
        text: variables.MY_LABELS[variables.DESIGNATION_COLORS[contentLabel].label][0].text
      },
      data: variables.MY_LABELS[variables.DESIGNATION_COLORS[contentLabel].label]
    },
    outline: variables.MY_LABELS[contentLabel],
    selectDetailIndex: 0
  }

  return survey
}

const switchInjectFeature = (keyLabel, list) => {
  switch (keyLabel) {
    case 'sel_eq':
      return {
        selfAwareness: {
          summary: list.summary.self_awareness[0],
          data: list.monthly.self_awareness
        },
        selfManagement: {
          summary: list.summary.selfmanagement[0],
          data: list.monthly.selfmanagement
        },
        socialAwareness: {
          summary: list.summary.social_awareness[0],
          data: list.monthly.social_awareness
        },
        relationship: {
          summary: list.summary.relationship_skills[0],
          data: list.monthly.relationship_skills
        },
        responsibleDecision: {
          summary: list.summary.responsible_decision_making[0],
          data: list.monthly.responsible_decision_making
        }
      }
    case 'grit':
      return {
        courage: {
          summary: list.summary.courage[0],
          data: list.monthly.courage
        },
        resilience: {
          summary: list.summary.resilience[0],
          data: list.monthly.resilience
        },
        spontaneity: {
          summary: list.summary.spontaneity[0],
          data: list.monthly.spontaneity
        },
        obsession: {
          summary: list.summary.obsession[0],
          data: list.monthly.obsession
        }
      }
    case 'motivation':
      return {
        home: {
          summary: list.summary.home_environment[0],
          data: list.monthly.home_environment
        },
        friendship: {
          summary: list.summary.friendship[0],
          data: list.monthly.friendship
        },
        trust: {
          summary: list.summary.teacher_trust[0],
          data: list.monthly.teacher_trust
        },
        community: {
          summary: list.summary.community_satisfaction[0],
          data: list.monthly.community_satisfaction
        }
      }
  }
}
