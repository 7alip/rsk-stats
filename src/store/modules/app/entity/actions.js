export const renderEntities = ({ state, dispatch }) => {
  for (let name in state.entities) {
    dispatch('createEntity', name)
  }
}

export const createEntity = ({ state, commit, getters }, name) => {
  let entity = state.entities[name]
  if (entity) {
    entity.title = entity.title || name
    entity.id = name
    entity.thFilter = (value) => { return value }
    entity.thValue = () => { return null }
    entity.colorValue = (value) => { return value }
    entity.color = (value) => { return '' }
    entity.filteredValue = (value) => {
      return getters.applyFilter(entity.filters, value)
    }
    let threshold = entity.threshold
    if (threshold) {
      let thObj = state.thresholds[threshold]
      if (thObj) {
        entity.thresholdObj = thObj
        let defaultFunc = () => { }
        let colorFunc = getters.thresholdColors(threshold)
        thObj.colorFunc = colorFunc || defaultFunc

        // let thFilter = (value) => { return value }
        let filters = thObj.filters
        entity.thFilter = (value) => {
          return getters.applyFilter(filters, value)
        }

        entity.thValue = (fields) => {
          if (fields && entity.thField) return fields[entity.thField]
          return null
        }

        entity.colorValue = (value, fields) => {
          let cv = entity.thValue(fields) || value
          if (cv && entity.thFilter) cv = entity.thFilter(cv)
          return cv
        }

        if (thObj.colorFunc) {
          entity.color = (value, fields) => {
            if (undefined === value) return ''
            let thValue = entity.thValue(fields)
            if (thValue !== null) value = thValue
            value = entity.thFilter(value)
            return thObj.colorFunc(value)
          }
        }
      }
    }
    commit('SET_RENDERED_ENTITY', entity)
  }
}