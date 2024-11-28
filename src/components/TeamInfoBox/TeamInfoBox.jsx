import React from 'react'
import { Black, lightGrey, lighterGrey, Orange, Purple } from '../../utils/colors'
import offensiveDefensiveIcon from '../../assets/svgSource/offensiveDefensive.svg'
import offensiveIcon from '../../assets/svgSource/offensive.svg'
import defensiveIcon from '../../assets/svgSource/defensive.svg'
import noOffensiveNoDefensiveIcon from '../../assets/svgSource/noOffensiveNoDefensive.svg'
import LightTooltip from '../../utils/LightTooltip'
import { Typography } from '@material-ui/core';

function unescapeUnicode(str) {
  return str.replace(/\\u([a-fA-F0-9]{4})/g, function (_, g) {
    return String.fromCharCode(parseInt(g, 16))
  })
}

const TeamInfoBox = ({ league, teamId, teamName, teamInfo }) => {
	const getIcon = (teamType) => {
		switch (teamType) {
			case 'offensive_and_defensive':
				return offensiveDefensiveIcon
			case 'offensive':
				return offensiveIcon
			case 'defensive':
				return defensiveIcon
			case 'no_offensive_and_no_defensive':
				return noOffensiveNoDefensiveIcon
			default:
				return offensiveDefensiveIcon
		}
	}

	const teamIcon = getIcon(teamInfo['team_type'])
	const unicodeTeamName = unescapeUnicode(teamName)
  
	return (
		<div style={{ width: '246px', height: '136px', overflow: 'hidden', backgroundColor: lighterGrey }}>
			<div style={{ position: 'absolute', top: 18, left: 12, width: '25px', height: '25px', display: 'flex' }}>
				<img src={teamIcon} width={25} height={25} alt='type icon'/>
			</div>
			<div style={{ position: 'absolute', top: 20, left: 42, width: '102px', height: '21px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<LightTooltip title={
								<React.Fragment>
									<Typography>{unicodeTeamName}</Typography>
								</React.Fragment>
								} placement='right'>
						<div style={{ color: Black, fontSize: '18px', position: 'relative', textAlign: 'center' }}>
							{unicodeTeamName.length > 9 ? `${unicodeTeamName.substring(0, 9)}..` : unicodeTeamName}
						</div>
					</LightTooltip>
			</div>
			<div style={{ position: 'absolute', top: 16, left: 150, width: '84px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: lightGrey, borderRadius: '6px' }}>
				<div style={{ color: Black, fontSize: '18px', position: 'relative', textAlign: 'center' }}>
					{league}
				</div>
			</div>
			<div style={{ position: 'absolute', top: 58, left: 12, width: '220px', height: '23px', display: 'flex' }}>
				<svg width="220" height="23">
					<LightTooltip title={parseFloat(teamInfo.win_rate).toFixed(3)} placement='right'>
						<rect x={0} y={0} width={220 * teamInfo.win_rate} height={23} fill={Orange} />
					</LightTooltip>
					<LightTooltip title={parseFloat(teamInfo.draw_rate).toFixed(3)} placement='right'>
						<rect x={220 * teamInfo.win_rate} y={0} width={220 * teamInfo.draw_rate} height={23} fill={lightGrey} />
					</LightTooltip>
					<LightTooltip title={parseFloat(teamInfo.lose_rate).toFixed(3)} placement='right'>
						<rect x={220 * (1 - teamInfo.lose_rate)} y={0} width={220 * teamInfo.lose_rate} height={23} fill={Purple} />
					</LightTooltip>
				</svg>
			</div>
			<div style={{ position: 'absolute', top: 97, left: 12, width: '220px', height: '23px', display: 'flex' }}>
				<svg width="220" height="23">
					<LightTooltip title={parseFloat(teamInfo.avg_score).toFixed(3)} placement='right'>
						<rect x={0} y={0} width={220 * (teamInfo.avg_score / 3)} height={23} fill={Orange} stroke={Orange} strokeWidth={1} />
					</LightTooltip>
					<rect x={220 * (teamInfo.avg_score / 3)} y={0} width={220 * (1 - (teamInfo.avg_score / 3))} height={23} fill='transparent' stroke={Orange} strokeWidth={1} />
				</svg>
			</div>
			<div style={{ position: 'absolute', top: 98, left: 12 + 5, width: '20px', height: '20px', display: 'flex', alignItems: 'left', justifyContent: 'center' }}>
				<div style={{ color: Black, fontSize: '18px', position: 'relative', textAlign: 'left' }}>
					{parseFloat(teamInfo.avg_score).toFixed(1)}
				</div>
			</div>
		</div>
	)
}

export default TeamInfoBox