import React, { useEffect, useState } from 'react'
import { Black, lightGrey, Red, Blue, Purple } from '../../utils/colors'
import { ReactComponent as FiFilter } from '../../assets/svgSource/arrowLabel.svg'
import { ReactComponent as GreyFiFilter } from '../../assets/svgSource/arrowLabel_grey.svg'
import TeamImpactList from './TeamImpactList'

const TeamImpactTable = ({ impactType, teamImpact }) => {
	const [selectedIcon, setSelectedIcon] = useState(null)
	const [indicators, setIndicators] = useState([])
	const [maxOffensive, setMaxOffensive] = useState(0)
	const [maxDefensive, setMaxDefensive] = useState(0)
	const [maxNet, setMaxNet] = useState(0)

	const widths = [127, 136, 136, 136]
	const location = [127, 263, 399, 535]

	const sortAttributes = ['impact_to_offensive', 'impact_to_defensive', 'impact_to_net']

	useEffect(() => {
		let offensiveIndicators = teamImpact.all_indicators_impact.filter(
			indicator => indicator.type === 'offensive'
		)
	
		let defensiveIndicators = teamImpact.all_indicators_impact.filter(
			indicator => indicator.type === 'defensive'
		)
	
		let opponentIndicators = teamImpact.all_opponents_impact
	
		let indicators = impactType === 'offensive' ? offensiveIndicators : impactType === 'defensive' ? defensiveIndicators : opponentIndicators
	
		let maxOffensive = 0
		let maxDefensive = 0
		let maxNet = 0
	
		for (let indicator in indicators) {
			maxOffensive = Math.max(maxOffensive, indicators[indicator].impact_to_offensive)
			maxDefensive = Math.max(maxDefensive, indicators[indicator].impact_to_defensive)
			maxNet = Math.max(maxNet, indicators[indicator].impact_to_net)
		}

		setIndicators(indicators)

		setMaxOffensive(maxOffensive)
		setMaxDefensive(maxDefensive)
		setMaxNet(maxNet)

		setSelectedIcon(null)
	}, [impactType, teamImpact])

	const handleIconClick = (index) => {
		setSelectedIcon(index)

		let sortedIndicators = indicators.sort((a, b) => {
			const attribute = sortAttributes[index - 1]
			return b[attribute] - a[attribute]
		})
		setIndicators(sortedIndicators)
	}

	const handleIconClick1 = () => {
		handleIconClick(1)
	}

	const handleIconClick2 = () => {
		handleIconClick(2)
	}

	const handleIconClick3 = () => {
		handleIconClick(3)
	}
  
	return impactType === 'offensive' ?
		<div style={{ width: '535px', height: '405px', overflow: 'hidden', border: Black }}>
			<div style={{ width: '535px', height: '405px', backgroundColor: 'transparent', position: 'relative' }}>
				<svg width="535" height="45">
					<rect x={0} y={0} width={widths[0]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
					<rect x={location[0]} y={0} width={widths[1]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
					<rect x={location[1]} y={0} width={widths[2]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
					<rect x={location[2]} y={0} width={widths[3]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
				</svg>
				<div style={{ position: 'absolute', top: 0, left: 0, width: '127px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{ color: Red, fontSize: '18px', position: 'relative' }}>
						{'Off. Indicators'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[0], width: '136px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div onClick={handleIconClick1} style={{ position: 'absolute', left: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
						{selectedIcon === 1 ? <FiFilter style={{ width: '30px', height: 'auto' }} /> : <GreyFiFilter style={{ width: '30px', height: 'auto' }} />}
					</div>
					<div style={{ color: Black, fontSize: '18px', position: 'relative', marginLeft: '35px' }}>
						{'Off. Eff.'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[1], width: '136px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div onClick={handleIconClick2} style={{ position: 'absolute', left: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
						{selectedIcon === 2 ? <FiFilter style={{ width: '30px', height: 'auto' }} /> : <GreyFiFilter style={{ width: '30px', height: 'auto' }} />}
					</div>
					<div style={{ color: Black, fontSize: '18px', position: 'relative', marginLeft: '35px' }}>
						{'Def. Eff.'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[2], width: '136px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div onClick={handleIconClick3} style={{ position: 'absolute', left: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
						{selectedIcon === 3 ? <FiFilter style={{ width: '30px', height: 'auto' }} /> : <GreyFiFilter style={{ width: '30px', height: 'auto' }} />}
					</div>
					<div style={{ color: Black, fontSize: '18px', position: 'relative', marginLeft: '35px' }}>
						{'Net Eff.'}
					</div>
				</div>
				<div style={{ position: 'relative', left: '0px', top: '-4px', display: 'flex', flexDirection: 'column' }}>
					<TeamImpactList height={360} indicators={indicators} maxOffensive={maxOffensive} maxDefensive={maxDefensive} maxNet={maxNet} impactType={impactType} />
				</div>
				<div style={{ position: 'relative', left: '0px', top: '-50px', display: 'flex', flexDirection: 'column' }}>
					<svg width="535" height="45">
						<rect x={0} y={0} width={widths[0]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
						<rect x={location[0]} y={0} width={widths[1]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
						<rect x={location[1]} y={0} width={widths[2]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
						<rect x={location[2]} y={0} width={widths[3]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
					</svg>
				</div>
			</div>
		</div> :
		impactType === 'defensive' ?
		<div style={{ width: '535px', height: '225px', overflow: 'hidden', border: Black }}>
			<div style={{ width: '535px', height: '225px', backgroundColor: 'transparent', position: 'relative' }}>
				<svg width="535" height="45">
					<rect x={0} y={0} width={widths[0]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
					<rect x={location[0]} y={0} width={widths[1]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
					<rect x={location[1]} y={0} width={widths[2]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
					<rect x={location[2]} y={0} width={widths[3]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
				</svg>
				<div style={{ position: 'absolute', top: 0, left: 0, width: '127px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{ color: Blue, fontSize: '18px', position: 'relative' }}>
						{'Def. Indicators'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[0], width: '136px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div onClick={handleIconClick1} style={{ position: 'absolute', left: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
						{selectedIcon === 1 ? <FiFilter style={{ width: '30px', height: 'auto' }} /> : <GreyFiFilter style={{ width: '30px', height: 'auto' }} />}
					</div>
					<div style={{ color: Black, fontSize: '18px', position: 'relative', marginLeft: '35px' }}>
						{'Off. Eff.'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[1], width: '136px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div onClick={handleIconClick2} style={{ position: 'absolute', left: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
						{selectedIcon === 2 ? <FiFilter style={{ width: '30px', height: 'auto' }} /> : <GreyFiFilter style={{ width: '30px', height: 'auto' }} />}
					</div>
					<div style={{ color: Black, fontSize: '18px', position: 'relative', marginLeft: '35px' }}>
						{'Def. Eff.'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[2], width: '136px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div onClick={handleIconClick3} style={{ position: 'absolute', left: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
						{selectedIcon === 3 ? <FiFilter style={{ width: '30px', height: 'auto' }} /> : <GreyFiFilter style={{ width: '30px', height: 'auto' }} />}
					</div>
					<div style={{ color: Black, fontSize: '18px', position: 'relative', marginLeft: '35px' }}>
						{'Net Eff.'}
					</div>
				</div>
				<div style={{ position: 'relative', left: '0px', top: '-4px', display: 'flex', flexDirection: 'column' }}>
					<TeamImpactList height={185} indicators={indicators} maxOffensive={maxOffensive} maxDefensive={maxDefensive} maxNet={maxNet} impactType={impactType} />
				</div>
			</div>
		</div> :
		<div style={{ width: '535px', height: '180px', overflow: 'hidden', border: Black }}>
			<div style={{ width: '535px', height: '180px', backgroundColor: 'transparent', position: 'relative' }}>
				<svg width="535" height="45">
					<rect x={0} y={0} width={widths[0]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
					<rect x={location[0]} y={0} width={widths[1]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
					<rect x={location[1]} y={0} width={widths[2]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
					<rect x={location[2]} y={0} width={widths[3]} height={45} stroke={lightGrey} strokeWidth={1} fill='transparent' />
				</svg>
				<div style={{ position: 'absolute', top: 0, left: 0, width: '127px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div style={{ color: Purple, fontSize: '18px', position: 'relative' }}>
						{'Opponents'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[0], width: '136px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div onClick={handleIconClick1} style={{ position: 'absolute', left: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
						{selectedIcon === 1 ? <FiFilter style={{ width: '30px', height: 'auto' }} /> : <GreyFiFilter style={{ width: '30px', height: 'auto' }} />}
					</div>
					<div style={{ color: Black, fontSize: '18px', position: 'relative', marginLeft: '35px' }}>
						{'Off. Eff.'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[1], width: '136px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div onClick={handleIconClick2} style={{ position: 'absolute', left: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
						{selectedIcon === 2 ? <FiFilter style={{ width: '30px', height: 'auto' }} /> : <GreyFiFilter style={{ width: '30px', height: 'auto' }} />}
					</div>
					<div style={{ color: Black, fontSize: '18px', position: 'relative', marginLeft: '35px' }}>
						{'Def. Eff.'}
					</div>
				</div>
				<div style={{ position: 'absolute', top: 0, left: location[2], width: '136px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div onClick={handleIconClick3} style={{ position: 'absolute', left: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
						{selectedIcon === 3 ? <FiFilter style={{ width: '30px', height: 'auto' }} /> : <GreyFiFilter style={{ width: '30px', height: 'auto' }} />}
					</div>
					<div style={{ color: Black, fontSize: '18px', position: 'relative', marginLeft: '35px' }}>
						{'Net Eff.'}
					</div>
				</div>
				<div style={{ position: 'relative', left: '0px', top: '-4px', display: 'flex', flexDirection: 'column' }}>
					<TeamImpactList height={140} indicators={indicators} maxOffensive={maxOffensive} maxDefensive={maxDefensive} maxNet={maxNet} impactType={impactType} />
				</div>
			</div>
		</div>
}

export default TeamImpactTable