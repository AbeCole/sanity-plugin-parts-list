import React from 'react'

import tools from 'sanity:debug'

import s from './PartsList.css'

class PartsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSections: ['definitions', 'implementations', 'plugins'],
      search: '',
    }
  }

  toggleActiveSection = (section) => {
    if (this.state.activeSections.includes(section)) {
      this.setState({
        activeSections: [
          ...this.state.activeSections.filter((s) => s !== section),
        ],
      })
    } else {
      this.setState({ activeSections: [...this.state.activeSections, section] })
    }
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value })
  }

  render() {
    const { activeSections, search } = this.state

    console.log('App render')
    if (Array.isArray(tools)) {
      tools.forEach(function (tool) {
        console.log(tool.title, tool)
      })
    } else {
      console.log('tools is not an Array', tools)
    }

    const searchCriteria = search === '' ? null : search.toLowerCase()

    return (
      <div className={s.container}>
        <h1 className={s.title}>Parts list</h1>
        <p>
          This page displays a basic output of currently available Sanity.io parts, these have
          been retrieved using the 'sanity:debug' part. The raw data object has been
          logged to the developer console for further examination.
        </p>
        <p>These parts are divided into 3 sections: Definitions, Implementations and Plugins. You can hide a section by clicking the heading.</p>
        <input
          type="text"
          placeholder="Search part name or path..."
          value={search}
          onChange={this.handleSearchChange}
          className={s.input}
        />
        <button
          type="button"
          className={s.button}
          onClick={() => this.toggleActiveSection('definitions')}
        >
          Definitions
        </button>
        {activeSections.includes('definitions') && (
          <ul className={s.partList}>
            {Object.keys(tools.definitions)
              .filter(
                (p) =>
                  !searchCriteria ||
                  p.includes(searchCriteria) ||
                  tools.definitions[p].path.includes(searchCriteria)
              )
              .map((partName) => (
                <li key={partName} className={s.partListItem}>
                  <h3 className={s.itemTitle}>{partName}</h3>
                  <div className={s.content}>
                    <p>
                      <strong>Plugin</strong> {tools.definitions[partName].plugin}
                      <br />
                      <strong>Path</strong> {tools.definitions[partName].path}
                      {tools.definitions[partName].isAbstract && (
                        <>
                          <br />
                          <strong>Abstract</strong>
                        </>
                      )}
                    </p>
                    {tools.definitions[partName].description && (
                      <p className={s.description}>
                        {tools.definitions[partName].description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        )}
        <button
          type="button"
          className={s.button}
          onClick={() => this.toggleActiveSection('implementations')}
        >
          Implementations
        </button>
        {activeSections.includes('implementations') && (
          <ul className={s.partList}>
            {Object.keys(tools.implementations)
              .filter(
                (p) =>
                  !searchCriteria ||
                  p.includes(searchCriteria) ||
                  tools.implementations[p].find(i => i.path.includes(searchCriteria))
              ).map((partName) => (
              <li key={partName} className={s.partListItem}>
                <h3 className={s.itemTitle}>{partName}</h3>
                <ul className={s.implementations}>
                  {tools.implementations[partName].map((implementation) => (
                    <li key={implementation.path}>
                      <strong>{implementation.plugin}</strong>{' '}
                      {implementation.path}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          className={s.button}
          onClick={() => this.toggleActiveSection('plugins')}
        >
          Plugins
        </button>
        {activeSections.includes('plugins') && (
          <ul className={s.partList}>
            {tools.plugins.filter(
                (p) =>
                  !searchCriteria ||
                  p.name.includes(searchCriteria) ||
                  p.path.includes(searchCriteria)
              ).map((part) => (
              <li key={part.name} className={s.partListItem}>
                <h3 className={s.itemTitle}>{part.name}</h3>
                <div className={s.content}>
                  {part.path}
                  {part.plugins.length > 0 && (
                    <>
                      <p className={s.itemSubTitle}>Plugins</p>
                      <ul className={s.implementations}>
                        {part.plugins.map((implementation) => (
                          <li key={implementation.path}>
                            <strong>{implementation.name}</strong>{' '}
                            {implementation.path}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default PartsList
