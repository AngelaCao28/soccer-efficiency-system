import React from 'react'
import { FixedSizeList as List } from 'react-window'
import TeamImpactComponent from './TeamImpactComponent'

const TeamImpactList = ({ indicators, maxOffensive, maxDefensive, maxNet, height, impactType }) => {
  const Row = ({ index, style }) => (
		<div style={{ ...style, display: 'flex' }}>
			<TeamImpactComponent indicator={indicators[index]} maxOffensive={maxOffensive} maxDefensive={maxDefensive} maxNet={maxNet} impactType={impactType} />
		</div>
	)

	return (
		<List height={height} itemCount={indicators.length} itemSize={45} width={535} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
			{Row}
		</List>
	)
}

export default TeamImpactList