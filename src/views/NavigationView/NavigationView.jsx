import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import ViewNameBox from '../../utils/ViewNameBox'
import CustomSelect from '../../utils/CustomSelect'
import LeagueInfoTable from '../../components/LeagueInfoTable/LeagueInfoTable'
import TeamScatterPlot from '../../components/TeamScatterPlot/TeamScatterPlot'
import teamData from '../../assets/average-efficiency.json'

const useStyles = makeStyles({})

const defaultProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 0,
  style: { width: 500, height: 1020, margin: '10px 10px' }
}

const NavigationView = ({ onTeamChange, onTeamNameChange, onLeagueChange }) => {
  const classes = useStyles()
  const [competition, setCompetition] = useState(0)
  const [team, setTeam] = useState(teamData.england[0].team_name)
  const [teamId, setTeamId] = useState(teamData.england[0].team_id)

  const leagueList = ['england', 'france', 'germany', 'italy', 'spain', 'euro']

  const handleCompetitionChange = option => {
    setCompetition(option.value)
    switch (option.value) {
      case 0:
        onLeagueChange('England')
        break
      case 1:
        onLeagueChange('France')
        break
      case 2:
        onLeagueChange('Germany')
        break
      case 3:
        onLeagueChange('Italy')
        break
      case 4:
        onLeagueChange('Spain')
        break
      case 5:
        onLeagueChange('Euro')
        break
      default:
        onLeagueChange('England')
        break
    }
    /* If change the team when the league has changed? */
    setTeam(teamData[leagueList[option.value]][0].team_name)
    setTeamId(teamData[leagueList[option.value]][0].team_id)
    onTeamChange(teamData[leagueList[option.value]][0].team_id)
    onTeamNameChange(teamData[leagueList[option.value]][0].team_name)
  }

  const getCompetitions = () => {
    return [
      { value: 0, label: 'England' },
      { value: 1, label: 'France' },
      { value: 2, label: 'Germany' },
      { value: 3, label: 'Italy' },
      { value: 4, label: 'Spain' },
      { value: 5, label: 'Euro' }
    ]
  }

  useEffect(() => {
    onTeamChange(teamId)
    onTeamNameChange(team)
  }, [teamId, team, onTeamChange, onTeamNameChange])

  const customStyles = {
    input: {
      margin: '0px',
      padding: '0px'
    },
    dropdownIndicator: {},
    singleValue: {
      marginLeft: '6px',
      marginRight: 'auto',
      fontSize: 18
    },
    valueContainer: {
      justifyContent: 'center'
    }
  }

  return (
    <Box borderRadius={6} {...defaultProps}>
      <div className="ControlPanel">
        <div className={classes.header}>
          <div style={{ height: '40px', width: '250px', position: 'relative' }}>
            <ViewNameBox label="Navigation View" style={{ position: 'absolute', top: 8, left: 10 }} />
          </div>
          <div style={{ marginLeft: 335, marginTop: -32, display: 'flex', alignItems: 'center' }}>
            <CustomSelect
              customStyles={customStyles}
              defaultValue={{ value: 0, label: 'England' }}
              getOptions={getCompetitions}
              onChange={handleCompetitionChange}
              width={155.5}
            />
          </div>
          <div style={{ marginLeft: '10px', marginTop:'20px', position: 'relative' }}>
            <LeagueInfoTable league={leagueList[competition]} />
          </div>
          <div style={{ marginLeft: '10px', marginTop:'15px', position: 'relative' }}>
            <TeamScatterPlot league={leagueList[competition]} teamId={teamId} onTeamChange={setTeamId} onTeamNameChange={setTeam} />
          </div>
        </div>
      </div>
    </Box>
  )
}

export default NavigationView