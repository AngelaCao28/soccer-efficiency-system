import React from 'react'
import { FixedSizeList as List } from 'react-window'
import LeagueComponent from './LeagueComponent'

const LeagueInfoList = ({ divisions, maxScore, maxMatchNum }) => {
	const Row = ({ index, style }) => (
		<div style={{ ...style, display: 'flex' }}>
			<LeagueComponent division={divisions[index]} maxScore={maxScore} maxMatchNum={maxMatchNum} />
		</div>
	)

	return (
		<List height={405} itemCount={divisions.length} itemSize={45} width={480} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
			{Row}
		</List>
	)
}

export default LeagueInfoList