import { makeStyles } from '@material-ui/core/styles'
import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import './theme/app.css'
import NavigationView from './views/NavigationView/NavigationView'
import DetailView from './views/DetailView/DetailView'
import IndicatorView from './views/IndicatorView/IndicatorView'

const useStyles = makeStyles(theme => ({
  mainView: {
    display: 'flex',
    flexDirection: 'row',
    height: 1040
  },
  mainViewLeft: {
    display: 'flex',
    flexDirection: 'row',
    height: 1040
  },
  mainViewRight: {
    display: 'flex',
    flexDirection: 'column',
    height: 1040
  },
  App: {
    width: 1920,
    height: 1080,
    backgroundColor: '#f0f0f0'
  }
}))

const App = () => {
  const classes = useStyles()
  const [league, setLeagueName] = useState('England')
  const [teamId, setTeamId] = useState(1646)
  const [teamName, setTeamName] = useState('Burnley')
  const [teamImpact, setTeamImpact] = useState(null)

  const leagueLowerCaseMap = {'England': 'england', 'France': 'france', 'Germany': 'germany', 'Italy': 'italy', 'Spain': 'spain', 'Euro': 'euro'}
  const leagueName = leagueLowerCaseMap[league]

  useEffect(() => {
    const fetchImpactData = async () => {
      const frontendData = {
        LeagueName: leagueName,
        TeamName: teamName,
        TeamId: teamId
      }
  
      try {
        const response = await fetch('http://localhost:5050/indicatorInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(frontendData)
        })
  
        if (!response.ok) {
          throw new Error('Failed to send data to backend')
        }
  
        const responseData = await response.json()
        setTeamImpact(responseData)
      } catch (error) {
        console.error(error)
      }
    }
  
    fetchImpactData()
  }, [leagueName, teamId, teamName])

  return (
    <div className={classes.App}>
      <Header/>
      <div className={classes.mainView}>
        <div className={classes.mainViewLeft}>
          <NavigationView onTeamChange={setTeamId} onTeamNameChange={setTeamName} onLeagueChange={setLeagueName} />
        </div>
        <div className={classes.mainViewRight}>
          <IndicatorView league={league} teamId={teamId} teamName={teamName} teamImpact={teamImpact} />
          <DetailView league={league} teamId={teamId} teamName={teamName} />
        </div>
      </div>
    </div>
  )
}

export default App