import React from 'react'
import LightTooltip from '../../utils/LightTooltip'
import { Black, lightGrey } from '../../utils/colors'

const TeamImpactComponent = ({ indicator, maxOffensive, maxDefensive, maxNet, impactType }) => {
	const widths = [127, 136, 136, 136]
	const location = [127, 263, 399, 535]

	const indicatorMap = {'breakthrough_pass_nums': 'Breakthrough', 'offside_nums': 'Offside', 'tackle_nums': 'Tackle', 'freekick_nums': 'Freekick', 'foul_nums': 'Foul', 'corner_nums': 'Corner', 'long_pass_nums': 'Long Pass',
	'pass_success_rates': 'Pass Succ%', 'cross_success_rates': 'Cross Succ%', 'tackle_success_rates': 'Tackle Succ%', 'possession_rates': 'Possession%'}

	const efficiencyMap = {'offensive_efficiency': 'Off. Eff.', 'defensive_efficiency': 'Def. Eff.', 'net_efficiency': 'Net Eff.'}

	return (
		<div>
			<svg width="535" height="45">
				<rect x={0} y={0} width={widths[0]} height={45} stroke='lightGrey' strokeWidth={1} fill='transparent' />
				<rect x={location[0]} y={0} width={widths[1]} height={45} stroke='lightGrey' strokeWidth={1} fill='transparent' />
				<LightTooltip title={parseFloat(indicator.impact_to_offensive).toFixed(3)} placement='right'>
					<rect x={9 + location[0]} y={12} width={115 * indicator.impact_to_offensive / maxOffensive} height={23} fill={lightGrey} />
				</LightTooltip>
				<rect x={location[1]} y={0} width={widths[2]} height={45} stroke='lightGrey' strokeWidth={1} fill='transparent' />
				<LightTooltip title={parseFloat(indicator.impact_to_defensive).toFixed(3)} placement='right'>
					<rect x={9 + location[1]} y={12} width={115 * indicator.impact_to_defensive / maxDefensive} height={23} fill={lightGrey} />
				</LightTooltip>
				<rect x={location[2]} y={0} width={widths[3]} height={45} stroke='lightGrey' strokeWidth={1} fill='transparent' />
				<LightTooltip title={parseFloat(indicator.impact_to_net).toFixed(3)} placement='right'>
					<rect x={9 + location[2]} y={12} width={115 * indicator.impact_to_net / maxNet} height={23} fill={lightGrey} />
				</LightTooltip>
			</svg>
			<div style={{ position: 'absolute', top: 0, left: 0, width: '127px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{ color: Black, fontSize: '18px', position: 'relative' }}>
					{impactType !== 'opponent' ? indicatorMap[indicator.indicator] : efficiencyMap[indicator.efficiency_type]}
				</div>
			</div>
		</div>
	)
}

export default React.memo(TeamImpactComponent)