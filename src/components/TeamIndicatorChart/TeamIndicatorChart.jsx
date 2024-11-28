import React, { useEffect, useState } from 'react'
import { Black, lightGrey, lighterGrey, Red, Blue } from '../../utils/colors'
import { Radar } from 'react-chartjs-2'
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)
ChartJS.defaults.font.family = ' "DIN Alternate", "GillSans", "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif '
ChartJS.defaults.font.size = 12
ChartJS.defaults.plugins.legend.display = false

const TeamIndicatorChart = ({ teamIndicator }) => {
	const [selected, setSelected] = useState(false)
	const [radarData, setRadarData] = useState({
		labels: [],
		datasets: [
			{
				backgroundColor: 'transparent',
				borderColor: Red,
				pointBackgroundColor: Red,
				pointHoverBackgroundColor: "#fff",
				data: []
			}
		]
	})
	const [rawRadarData, setRawRadarData] = useState([])

	const handleFilterClick = () => {
		setSelected(!selected)
	}

	useEffect(() => {
		let indicatorMap = {'breakthrough_pass_nums': 'Breakthrough', 'offside_nums': 'Offside', 'tackle_nums': 'Tackle', 'freekick_nums': 'Freekick', 'foul_nums': 'Foul', 'corner_nums': 'Corner', 'long_pass_nums': 'Long Pass',
		'pass_success_rates': 'Pass%', 'cross_success_rates': 'Cross%', 'tackle_success_rates': 'Tackle%', 'possession_rates': 'Poss.%'}

		let radarLabels = []
		let radarContents = []
		let rawRadarContents = []
		let filteredIndicator = selected ? teamIndicator.filter(indicator => indicator.type === 'defensive') : teamIndicator.filter(indicator => indicator.type === 'offensive')

		for (let indicator in filteredIndicator) {
			radarLabels.push(indicatorMap[filteredIndicator[indicator]['indicator']])
			radarContents.push(filteredIndicator[indicator]['average_indicator_value'] / filteredIndicator[indicator]['max_indicator_value'])
			rawRadarContents.push(filteredIndicator[indicator]['average_indicator_value'])
		}
		
		setRadarData({
			labels: radarLabels,
			datasets: [
				{
					backgroundColor: 'transparent',
					borderColor: selected ? Blue : Red,
					pointBackgroundColor: selected ? Blue : Red,
					pointHoverBackgroundColor: "#fff",
					data: radarContents
				}
			]
		})
		setRawRadarData(rawRadarContents)
	}, [teamIndicator, selected])

	const radarOptions = {
		scales: {
			r: {
				suggestedMin: 0,
				suggestedMax: 1,
				pointLabels: {
					font: {
						size: 12
					},
					padding: 5,
					backdropPadding: 0,
					color: Black
				},
				ticks: {
					display: false,
					stepSize: 0.25
				},
				grid: {
					circular: true
				}
			}
		},
		elements: {
      line: {
        borderWidth: 1
      }
    },
		animations: false,
		plugins: {
			tooltip: {
				displayColors: false,
				callbacks: {
					title: () => '',
					label: (context) => {
						return parseFloat(rawRadarData[context.dataIndex]).toFixed(3)
					}
				}
			}
		}
	}

	return (
		<div style={{ width: '246px', height: '250px', overflow: 'hidden' }}>
			<div style={{ position: 'absolute', top: 0, left: 0, width: '246px', height: '30px', display: 'flex', overflow: 'hidden', borderRadius: '6px', fontSize: 18, border: `1px solid ${lightGrey}`, zIndex: 999 }}>
				<div style={{
					width: '50%',
					backgroundColor: selected ? 'white' : lightGrey,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					cursor: 'pointer'
				}} onClick={handleFilterClick}>
					{'Off. Indicators'}
				</div>
				<div style={{
					width: '50%',
					backgroundColor: selected ? lightGrey : 'white',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					cursor: 'pointer'
				}} onClick={handleFilterClick}>
					{'Def. Indicators'}
				</div>
			</div>
			<div style={{ position: 'absolute', top: 30, left: 0, width: '246px', height: '230px', display: 'flex', overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
				<Radar data={radarData} options={radarOptions} />
			</div>
		</div>
	)
}

export default TeamIndicatorChart