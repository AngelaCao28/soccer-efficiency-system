import React, { useMemo } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import LightTooltip from '../../utils/LightTooltip'
import { Black, Red, Blue } from '../../utils/colors'
import offensiveDefensiveIcon from '../../assets/svgSource/offensiveDefensive.svg'
import offensiveIcon from '../../assets/svgSource/offensive.svg'
import defensiveIcon from '../../assets/svgSource/defensive.svg'
import noOffensiveNoDefensiveIcon from '../../assets/svgSource/noOffensiveNoDefensive.svg'
import teamData from '../../assets/average-efficiency.json'
import { Typography } from '@material-ui/core';
const motion = require('framer-motion').motion

function unescapeUnicode(str) {
  return str.replace(/\\u([a-fA-F0-9]{4})/g, function (_, g) {
    return String.fromCharCode(parseInt(g, 16))
  })
}

const useStyles = makeStyles((theme) => ({
  dashLineVertical: {
    position: 'absolute',
		backgroundImage: 'linear-gradient(to bottom, #ccc 0%, #ccc 50%, transparent 0%)',
		backgroundSize: '100% 12px',
		backgroundRepeat: 'repeat-y'
  },
	dashLineHorizontal: {
    position: 'absolute',
		backgroundImage: 'linear-gradient(to right, #ccc 50%, #ccc 0%, transparent 0%)',
		backgroundSize: '12px 100%',
		backgroundRepeat: 'repeat-x'
  }
}))

const TeamScatterPlot = ({league, teamId, onTeamChange, onTeamNameChange}) => {
	const classes = useStyles()

	const teamDataInLeague = teamData[league]
	const maxOffensive = useMemo(() => teamDataInLeague.reduce((max, teamInfo) => Math.max(max, teamInfo.offensive_efficiency), 0), [teamDataInLeague])
	const minOffensive = useMemo(() => teamDataInLeague.reduce((min, teamInfo) => Math.min(min, teamInfo.offensive_efficiency), maxOffensive), [teamDataInLeague, maxOffensive])
	const maxDefensive = useMemo(() => teamDataInLeague.reduce((max, teamInfo) => Math.max(max, teamInfo.defensive_efficiency), 0), [teamDataInLeague])
	const minDefensive = useMemo(() => teamDataInLeague.reduce((min, teamInfo) => Math.min(min, teamInfo.defensive_efficiency), maxDefensive), [teamDataInLeague, maxDefensive])

	let avgOffensive = 0
	let avgDefensive = 0

	for (let team in teamData[league]) {
		avgOffensive = avgOffensive + teamData[league][team].offensive_efficiency
		avgDefensive = avgDefensive + teamData[league][team].defensive_efficiency
	}

	avgOffensive = avgOffensive / teamData[league].length
	avgDefensive = avgDefensive / teamData[league].length

	const minOffensiveCanvas = avgOffensive - Math.max(maxOffensive - avgOffensive, avgOffensive - minOffensive) - 0.03
	const maxOffensiveCanvas = avgOffensive + Math.max(maxOffensive - avgOffensive, avgOffensive - minOffensive) + 0.03
	const minDefensiveCanvas = avgDefensive - Math.max(maxDefensive - avgDefensive, avgDefensive - minDefensive) - 0.03
	const maxDefensiveCanvas = avgDefensive + Math.max(maxDefensive - avgDefensive, avgDefensive - minDefensive) + 0.03

	const handleTeamChange = item => {
		onTeamChange(item.team_id)
		onTeamNameChange(item.team_name)
	}

	return (
		<div style={{ width: '480px', height: '480px', border: '1px solid #ccc', borderRadius: 6 }}>
			<div style={{ position: 'absolute', top: 10, left: 0, width: '96px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{ color: Black, fontSize: '18px', position: 'relative', textAlign: 'center' }}>
					{'Defensive'}
				</div>
			</div>
			<div style={{ position: 'absolute', top: 10, left: 377, width: '103px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{ color: Black, fontSize: '18px', position: 'relative', textAlign: 'center' }}>
					{'Offensive & Defensive'}
				</div>
			</div>
			<div style={{ position: 'absolute', bottom: 10, left: 0, width: '126px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{ color: Black, fontSize: '18px', position: 'relative', textAlign: 'center' }}>
					{'No Offensive & No Defensive'}
				</div>
			</div>
			<div style={{ position: 'absolute', bottom: 10, left: 382, width: '98px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{ color: Black, fontSize: '18px', position: 'relative', textAlign: 'center' }}>
					{'Offensive'}
				</div>
			</div>
			<div style={{ position: 'absolute', top: 54, left: 10, width: '25px', height: '25px', display: 'flex' }}>
				<img src={defensiveIcon} width={25} height={25} alt='defensive'/>
			</div>
			<div style={{ position: 'absolute', top: 54, left: 445, width: '25px', height: '25px', display: 'flex' }}>
				<img src={offensiveDefensiveIcon} width={25} height={25} alt='offensive and defensive'/>
			</div>
			<div style={{ position: 'absolute', bottom: 54, left: 10, width: '25px', height: '25px', display: 'flex' }}>
				<img src={noOffensiveNoDefensiveIcon} width={25} height={25} alt='no offensive and no defensive'/>
			</div>
			<div style={{ position: 'absolute', bottom: 54, left: 445, width: '25px', height: '25px', display: 'flex' }}>
				<img src={offensiveIcon} width={25} height={25} alt='offensive'/>
			</div>
			<div className={classes.dashLineVertical} style={{ top: 7.5, left: 240, width: '1.5px', height: '465px' }} />
			<div className={classes.dashLineHorizontal} style={{ top: 240, left: 7.5, width: '465px', height: '1.5px' }} />
			<div style={{ position: 'absolute', top: 7.5, left: 240, width: '42px', height: '17.5px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{ color: Black, fontSize: '16px', position: 'relative', textAlign: 'center' }}>
					{parseFloat(minDefensiveCanvas).toFixed(2)}
				</div>
			</div>
			<div style={{ position: 'absolute', bottom: 7.5, left: 240, width: '42px', height: '17.5px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{ color: Black, fontSize: '16px', position: 'relative', textAlign: 'center' }}>
					{parseFloat(maxDefensiveCanvas).toFixed(2)}
				</div>
			</div>
			<div style={{ position: 'absolute', top: 245, left: 7.5, width: '30px', height: '17.5px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{ color: Black, fontSize: '16px', position: 'relative', textAlign: 'center' }}>
					{parseFloat(minOffensiveCanvas).toFixed(2)}
				</div>
			</div>
			<div style={{ position: 'absolute', top: 245, left: 442.5, width: '30px', height: '17.5px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{ color: Black, fontSize: '16px', position: 'relative', textAlign: 'center' }}>
					{parseFloat(maxOffensiveCanvas).toFixed(2)}
				</div>
			</div>
			<div style={{ position: 'absolute', top: 7.5, left: 7.5, width: '465px', height: '465px', display: 'flex' }}>
				{teamDataInLeague.map((item, index) => (
					<div key={item.team_id} style={{ 
						position: 'absolute',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						left: (item.offensive_efficiency - minOffensiveCanvas) / (maxOffensiveCanvas - minOffensiveCanvas) * 465 - 7.5,
						top: (item.defensive_efficiency - minDefensiveCanvas) / (maxDefensiveCanvas - minDefensiveCanvas) * 465 - 7.5 }}>
						<LightTooltip title={
							<React.Fragment>
								<Typography>{unescapeUnicode(item.team_name)}</Typography>
								<Typography variant='subtitle2'>{`Offensive Efficiency: ${parseFloat(item.offensive_efficiency).toFixed(3)}`}</Typography>
								<Typography variant='subtitle2'>{`Defensive Efficiency: ${parseFloat(item.defensive_efficiency).toFixed(3)}`}</Typography>
								<Typography variant='subtitle2'>{`Net Efficiency: ${parseFloat(item.net_efficiency).toFixed(3)}`}</Typography>
							</React.Fragment>
							} placement='right'>
							<motion.div style={{
								width: 15,
								height: 15,
								borderRadius: '50%',
								border: item.team_id !== teamId ? '0.5px solid #fff' : '0.5px solid #000',
								background: item.net_efficiency >= 0 ? Red : Blue,
								zIndex: item.team_id !== teamId ? 8 : 999 }}
								onClick={() => handleTeamChange(item)}
								whileHover={{
									boxShadow: '0px 0px 4px 1px rgba(0,0,0,0.1)',
          				zIndex: 999,
								}} />
						</LightTooltip>
					</div>
				))}
			</div>
		</div>
	)
}

export default TeamScatterPlot