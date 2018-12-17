import config from '@config'

const DATE_REGEX = /(\d{2})\/(\d{2})\/(\d{4})/

const validators = {
	number: (filter, rawValue) => {
		const value = parseInt(rawValue, 10)

		if (typeof filter === 'number') {
			return value === filter
		} else if (
			typeof filter === 'object' &&
			((filter.gte && value < filter.gte) || (filter.lte && value > filter.lte))
		) {
			return false
		}
		return true
	},
	date: (filter, rawValue) => {
		const match = DATE_REGEX.exec(rawValue)
		const value = Date.parse(`${match[3]}-${match[2]}-${match[1]}`)

		if (filter instanceof Date) {
			return value === filter.getTime()
		} else if (
			(filter.gte && value < filter.gte.getTime()) ||
			(filter.lte && value > filter.lte.getTime())
		) {
			return false
		}
		return true
	},
	regex: (filter, rawValue) => {
		const regex = new RegExp(filter)
		return regex.test(rawValue)
	},
}

const filterOffer = ({features}) => {
	for (const [prop, filter] of Object.entries(config.filter || {})) {
		const rawValue = features[prop]
		if (rawValue === undefined) {
			if (filter.rejectEmpty) {
				return false
			}
			continue
		}

		for (const [type, validator] of Object.entries(validators)) {
			if (filter[type]) {
				if (!validator(filter[type], rawValue)) {
					return false
				}
				break
			}
		}
	}
	return true
}

export default filterOffer
