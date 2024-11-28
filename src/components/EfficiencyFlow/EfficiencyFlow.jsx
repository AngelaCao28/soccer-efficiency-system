import React, { useEffect, useState } from 'react'
import { Black, lightGrey, Orange, Purple, Red, Blue } from '../../utils/colors'
import offensiveDefensiveIcon from '../../assets/svgSource/offensiveDefensive.svg'
import offensiveIcon from '../../assets/svgSource/offensive.svg'
import defensiveIcon from '../../assets/svgSource/defensive.svg'
import noOffensiveNoDefensiveIcon from '../../assets/svgSource/noOffensiveNoDefensive.svg'
import LightTooltip from '../../utils/LightTooltip'
import { Typography } from '@material-ui/core'
import teamData from '../../assets/average-efficiency.json'
import CustomSelect from '../../utils/CustomSelect'

function unescapeUnicode(str) {
	return str.replace(/\\u([a-fA-F0-9]{4})/g, function (_, g) {
		return String.fromCharCode(parseInt(g, 16))
	})
}

const EfficiencyFlow = ({ league, teamId, teamName }) => {
	const [efficiencyDetail, setEfficiencyDetail] = useState([])
	const [filteredEfficiencyDetail, setFilteredEfficiencyDetail] = useState([])
	const [efficiencyType, setEfficiencyType] = useState('Net Eff.')
	const [maxValue, setMaxValue] = useState(0)

	const leagueLowerCaseMap = {'England': 'england', 'France': 'france', 'Germany': 'germany', 'Italy': 'italy', 'Spain': 'spain', 'Euro': 'euro'}
	const optionKeyMap = {'Off. Eff.': 'offensive_efficiency', 'Def. Eff.': 'defensive_efficiency', 'Net Eff.': 'net_efficiency'}

	const getTeams = () => {
		return teamData[leagueLowerCaseMap[league]].map((value, index) => ({
			value: index,
			label: unescapeUnicode(value.team_name),
			id: value.team_id
		}))
	}

	const getEfficiency = () => {
		return [
			{ value: 0, label: 'Off. Eff.' },
			{ value: 1, label: 'Def. Eff.' },
			{ value: 2, label: 'Net Eff.' }
		]
	}

	const getMatchType = () => {
		return [
			{ value: 0, label: 'All' },
			{ value: 1, label: 'Win' },
			{ value: 2, label: 'Draw' },
			{ value: 3, label: 'Lose' }
		]
	}

	const handleTeamChange = option => {
		const fetchDetailData = async () => {
      const frontendData = {
        LeagueName: leagueLowerCaseMap[league],
        TeamName: option.label,
        TeamId: option.id
      }
  
      try {
        const response = await fetch('http://localhost:5050/detailInfo', {
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
        setEfficiencyDetail(responseData)
				setFilteredEfficiencyDetail(responseData)
      } catch (error) {
        console.error(error)
      }
    }

		fetchDetailData()
	}

	const handleEfficiencyChange = option => {
		setEfficiencyType(option.label)
	}

	const handleMatchChange = option => {
		switch (option.label) {
			case 'All':
				setFilteredEfficiencyDetail(efficiencyDetail)
				break
			case 'Win':
				setFilteredEfficiencyDetail(efficiencyDetail.filter(detail => detail.match_result === 'win'))
				break
			case 'Draw':
				setFilteredEfficiencyDetail(efficiencyDetail.filter(detail => detail.match_result === 'draw'))
				break
			case 'Lose':
				setFilteredEfficiencyDetail(efficiencyDetail.filter(detail => detail.match_result === 'lose'))
				break
			default:
				setFilteredEfficiencyDetail(efficiencyDetail)
		}
	}

	useEffect (() => {
		let maxValue = 0
		let optionKeyMap = {'Off. Eff.': 'offensive_efficiency', 'Def. Eff.': 'defensive_efficiency', 'Net Eff.': 'net_efficiency'}

		for (let match in filteredEfficiencyDetail) {
			maxValue = Math.max(maxValue, Math.abs(filteredEfficiencyDetail[match][optionKeyMap[efficiencyType]]))
		}

		setMaxValue(maxValue)
	}, [filteredEfficiencyDetail, efficiencyType])

	const getIcon = (matchType) => {
		switch (matchType) {
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

	const customStyles = {
    input: {
      margin: '0px',
      padding: '0px'
    },
    dropdownIndicator: {},
    singleValue: {
      marginLeft: '6px',
      marginRight: 'auto',
      fontSize: 18
    },
    valueContainer: {
      justifyContent: 'center'
    }
  }

	return (
		<div style={{ width: '1365px', height: '200px', overflow: 'hidden' }}>
			<div style={{ position: 'absolute', top: 0, left: 0, width: '156px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{ color: Black, fontSize: '18px', position: 'relative' }}>
					{'Select Team:'}
				</div>
			</div>
			<div style={{ position: 'absolute', top: 28, left: 0, width: '156px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<CustomSelect
					customStyles={customStyles}
					defaultValue={{ value: 0, label: 'Team' }}
					getOptions={getTeams}
					onChange={handleTeamChange}
					width={155.5}
				/>
			</div>
			<div style={{ position: 'absolute', top: 70, left: 0, width: '156px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{ color: Black, fontSize: '18px', position: 'relative' }}>
					{'Select Efficiency:'}
				</div>
			</div>
			<div style={{ position: 'absolute', top: 98, left: 0, width: '156px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<CustomSelect
					customStyles={customStyles}
					defaultValue={{ value: 2, label: 'Net Eff.' }}
					getOptions={getEfficiency}
					onChange={handleEfficiencyChange}
					width={155.5}
				/>
			</div>
			<div style={{ position: 'absolute', top: 140, left: 0, width: '156px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
				<div style={{ color: Black, fontSize: '18px', position: 'relative' }}>
					{'Select Match:'}
				</div>
			</div>
			<div style={{ position: 'absolute', top: 168, left: 0, width: '156px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<CustomSelect
					customStyles={customStyles}
					defaultValue={{ value: 0, label: 'All' }}
					getOptions={getMatchType}
					onChange={handleMatchChange}
					width={155.5}
				/>
			</div>
			<div style={{ position: 'absolute', top: 0, left: 170, width: '1192px', display: 'flex' }}>
				<div style={{ position: 'absolute', top: 100, left: 0, height: '1px', width: (25 + 6.5) * filteredEfficiencyDetail.length - 6.5, backgroundColor: lightGrey }} />
				{filteredEfficiencyDetail.map((item, index) => (
					<div key={item.round} style={{
						position: 'absolute',
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
						left: index * (25 + 6.5),
						top: 0,
						width: 25,
						height: 200
					}}>
						<div style={{ position: 'absolute', top: 0, left: 0, height: '20px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<img src={getIcon(item['match_type'])} width={20} height={20} alt='type icon'/>
						</div>
						{efficiencyType === 'Def. Eff.' ?
						<LightTooltip title={parseFloat(item[optionKeyMap[efficiencyType]]).toFixed(3)} placement='right'>
							<div style={{ position: 'absolute', top: 100, height: maxValue !== 0 ? 68 * Math.abs(item[optionKeyMap[efficiencyType]]) / maxValue : 0, width:'25px', backgroundColor: Blue }} /> 
						</LightTooltip> :
						item[optionKeyMap[efficiencyType]] >= 0 ?
						<LightTooltip title={parseFloat(item[optionKeyMap[efficiencyType]]).toFixed(3)} placement='right'>
							<div style={{ position: 'absolute', bottom: 100, height: maxValue !== 0 ? 68 * Math.abs(item[optionKeyMap[efficiencyType]]) / maxValue : 0, width:'25px', backgroundColor: Red }} />
						</LightTooltip> :
						<LightTooltip title={parseFloat(item[optionKeyMap[efficiencyType]]).toFixed(3)} placement='right'>
							<div style={{ position: 'absolute', top: 100, height: maxValue !== 0 ? 68 * Math.abs(item[optionKeyMap[efficiencyType]]) / maxValue : 0, width:'25px', backgroundColor: Blue }} /> 
						</LightTooltip>}
						<div style={{ position: 'absolute', bottom: 0, left: 0, height: '20px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<LightTooltip title={
								<React.Fragment>
									<Typography variant='subtitle2'>{unescapeUnicode(item.match_info)}</Typography>
								</React.Fragment>
							}>
								<div style={{
									width: 20,
									height: 20,
									borderRadius: '50%',
									background: item.match_result === 'win' ? Orange : item.match_result === 'draw' ? lightGrey : Purple
								}} />
							</LightTooltip>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default EfficiencyFlow