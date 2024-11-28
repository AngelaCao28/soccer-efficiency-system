import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { lightGrey } from '../../utils/colors'
import ViewNameBox from '../../utils/ViewNameBox'
import EfficiencyFlow from '../../components/EfficiencyFlow/EfficiencyFlow'

const useStyles = makeStyles({})

const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 0,
  style: { width: 1390, height: 550, margin: '10px 10px 10px 0px' }
}

const DetailView = ({ league, teamId, teamName }) => {
  const classes = useStyles()

  return (
    <Box borderRadius={6} {...defaultProps}>
      <div className="ControlPanel">
        <div className={classes.header}>
          <div style={{ height: '40px', width: '250px', position: 'relative' }}>
            <ViewNameBox label="Detail View" style={{ position: 'absolute', top: 8, left: 10 }} />
          </div>
          <div style={{ marginLeft: '12px', marginTop: '16px', position: 'relative' }}>
            <EfficiencyFlow league={league} teamId={teamId} teamName={teamName} />
          </div>
          <div style={{ marginLeft: '12px', marginTop: '30px', position: 'relative', height: '1px', width: '1362px', backgroundColor: lightGrey }} />
          <div style={{ marginLeft: '12px', marginTop: '30px', position: 'relative' }}>
            <EfficiencyFlow league={league} teamId={teamId} teamName={teamName} />
          </div>
        </div>
      </div>
    </Box>
  )
}

export default DetailView