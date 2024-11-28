import React from 'react'
import { Black, lightGrey } from '../../utils/colors'
import LeagueInfoList from './LeagueInfoList'
import leagueData from '../../assets/league-info.json'

const LeagueInfoTable = ({ league }) => {
	let maxScore = 0
	let maxMatchNum = 0

	for (let division in leagueData[league]) {
		maxScore = Math.max(maxScore, leagueData[league][division].avg_score)
		maxMatchNum = Math.max(maxMatchNum, leagueData[league][division].match_num)
	}

	const widths = [96, 163, 110, 110]
	const location = [96, 259, 369, 479]

	return (
		<div style={{ width: '480px', height: '450px', overflow: 'hidden', border: Black }}>
			<div style={{ width: '480px', height: '450px', backgroundColor: 'transparent', position: 'relative' }}>
				<svg width="480" height="45">
					<rect x={0} y={0} width={widths[0]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
					<rect x={location[0]} y={0} width={widths[1]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
					<rect x={location[1]} y={0} width={widths[2]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
					<rect x={location[2]} y={0} width={widths[3]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
				</svg>
				<div style={{ position: 'absolute', top: 0, left: 0, width: '96px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{ color: Black, fontSize: '18px', position: 'relative' }}>
						{'Net Eff.'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[0], width: '163px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{ color: Black, fontSize: '18px', position: 'relative' }}>
						{'Match Results'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[1], width: '110px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{ color: Black, fontSize: '18px', position: 'relative' }}>
						{'Avg Score'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[2], width: '110px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{ color: Black, fontSize: '18px', position: 'relative' }}>
						{'Match Num'}
					</div>
				</div>
				<div style={{ position: 'relative', left: '0px', top: '-4px', display: 'flex', flexDirection: 'column' }}>
					<LeagueInfoList divisions={leagueData[league]} maxScore={maxScore} maxMatchNum={maxMatchNum}/>
				</div>
			</div>
		</div>
	)
}

export default LeagueInfoTable