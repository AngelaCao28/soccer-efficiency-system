import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import ViewNameBox from '../../utils/ViewNameBox'
import TeamInfoBox from '../../components/TeamInfoBox/TeamInfoBox'
import TeamIndicatorChart from '../../components/TeamIndicatorChart/TeamIndicatorChart'
import TeamImpactTable from '../../components/TeamImpactTable/TeamImpactTable'
import { lightGrey } from '../../utils/colors'

const useStyles = makeStyles({})

const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 0,
  style: { width: 1390, height: 460, margin: '10px 10px 0px 0px' }
}

const IndicatorView = ({ league, teamId, teamName, teamImpact }) => {
  const classes = useStyles()

  if (teamImpact === null) {
    return (
      <Box borderRadius={6} {...defaultProps}>
      <div className="ControlPanel">
        <div className={classes.header}>
          <div style={{ height: '40px', width: '250px', position: 'relative' }}>
            <ViewNameBox label="Indicator View" style={{ position: 'absolute', top: 8, left: 10 }} />
          </div>
        </div>
      </div>
    </Box>
    )
  }
  else {
    return (
      <Box borderRadius={6} {...defaultProps}>
        <div className="ControlPanel">
          <div className={classes.header}>
            <div style={{ height: '40px', width: '250px', position: 'relative' }}>
              <ViewNameBox label="Indicator View" style={{ position: 'absolute', top: 8, left: 10 }} />
            </div>
            <div style={{ marginLeft: '24px', marginTop: '5px', position: 'relative' }}>
              <TeamInfoBox league={league} teamId={teamId} teamName={teamName} teamInfo={teamImpact['team_info']} />
            </div>
            <div style={{ marginLeft: '24px', marginTop: '18px', position: 'absolute' }}>
              <TeamIndicatorChart teamIndicator={teamImpact['all_indicators_impact']} />
            </div>
            <div style={{ marginLeft: '290px', marginTop: '-136px', position: 'absolute' }}>
              <TeamImpactTable impactType={'offensive'} teamImpact={teamImpact} />
            </div>
            <div style={{ marginLeft: '842px', marginTop: '-136px', position: 'absolute' }}>
              <TeamImpactTable impactType={'defensive'} teamImpact={teamImpact} />
            </div>
            <div style={{ marginLeft: '842px', marginTop: '89px', position: 'absolute', height: '3pt', width: '535px', backgroundColor: lightGrey }} />
            <div style={{ marginLeft: '842px', marginTop: '89px', position: 'absolute' }}>
              <TeamImpactTable impactType={'opponent'} teamImpact={teamImpact} />
            </div>
          </div>
        </div>
      </Box>
    )
  }
}

export default IndicatorView