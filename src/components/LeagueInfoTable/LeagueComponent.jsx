import React from 'react'
import LightTooltip from '../../utils/LightTooltip'
import { Black, Orange, Purple, lightGrey } from '../../utils/colors'

const LeagueComponent = ({ division, maxScore, maxMatchNum }) => {
	const widths = [96, 163, 110, 110]
	const location = [96, 259, 369, 479]

	const divisionList = ['0.3~', '0.2~0.3', '0.1~0.2', '0~0.1', '=0', '-0.1~0', '-0.2~-0.1', '-0.3~-0.2', '~-0.3']

	if (division.match_num !== 0) {
		return (
			<div>
				<svg width="480" height="45">
					<rect x={0} y={0} width={widths[0]} height={45} stroke='lightGrey' strokeWidth={1} fill='transparent' />
					<rect x={location[0]} y={0} width={widths[1]} height={45} stroke='lightGrey' strokeWidth={1} fill='transparent' />
					<LightTooltip title={parseFloat(division.win_rate).toFixed(3)} placement='right'>
						<rect x={9 + location[0]} y={12} width={145 * division.win_rate} height={23} fill={Orange} />
					</LightTooltip>
					<LightTooltip title={parseFloat(division.draw_rate).toFixed(3)} placement='right'>
						<rect x={9 + location[0] + 145 * division.win_rate} y={12} width={145 * division.draw_rate} height={23} fill={lightGrey} />
					</LightTooltip>
					<LightTooltip title={parseFloat(division.lose_rate).toFixed(3)} placement='right'>
						<rect x={9 + location[0] + 145 * (1 - division.lose_rate)} y={12} width={145 * division.lose_rate} height={23} fill={Purple} />
					</LightTooltip>
					<rect x={location[1]} y={0} width={widths[2]} height={45} stroke='lightGrey' strokeWidth={1} fill='transparent' />
					<LightTooltip title={parseFloat(division.avg_score).toFixed(3)} placement='right'>
						<rect x={9 + location[1]} y={12} width={90 * (division.avg_score / maxScore)} height={23} fill={Orange} />
					</LightTooltip>
					<rect x={location[2]} y={0} width={widths[3]} height={45} stroke='lightGrey' strokeWidth={1} fill='transparent' />
					<LightTooltip title={division.match_num} placement='right'>
						<rect x={9 + location[2]} y={12} width={90 * (division.match_num / maxMatchNum)} height={23} fill={lightGrey} />
					</LightTooltip>
				</svg>
				<div style={{ position: 'absolute', top: 0, left: 0, width: '96px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{ color: Black, fontSize: '18px', position: 'relative' }}>
						{divisionList[division.division_id]}
					</div>
				</div>
			</div>
		)
	}
	else {
		return (
			<div>
				<svg width="480" height="45">
					<rect x={0} y={0} width={widths[0]} height={45} stroke='lightGrey' strokeWidth={1} fill='transparent' />
					<rect x={location[0]} y={0} width={widths[1]} height={45} stroke='lightGrey' strokeWidth={1} fill='transparent' />
					<rect x={location[1]} y={0} width={widths[2]} height={45} stroke='lightGrey' strokeWidth={1} fill='transparent' />
					<rect x={location[2]} y={0} width={widths[3]} height={45} stroke='lightGrey' strokeWidth={1} fill='transparent' />
				</svg>
				<div style={{ position: 'absolute', top: 0, left: 0, width: '96px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{ color: Black, fontSize: '18px', position: 'relative' }}>
						{divisionList[division.division_id]}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[0], width: '163px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{ color: Black, fontSize: '18px', position: 'relative' }}>
						{'/'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[1], width: '110px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{ color: Black, fontSize: '18px', position: 'relative' }}>
						{'/'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[2], width: '110px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{ color: Black, fontSize: '18px', position: 'relative' }}>
						{'/'}
					</div>
				</div>
			</div>
		)
	}
}

export default React.memo(LeagueComponent)