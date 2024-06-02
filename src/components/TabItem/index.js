import './index.css'

const TabItem = props => {
  const {tabItem, changeTabId, isActive} = props
  const {tabId, displayText} = tabItem
  const fontColor = isActive ? 'dark-color' : 'light-color'

  const onChangeTabId = () => {
    changeTabId(tabId)
  }

  return (
    <li className="tab-list">
      <button
        type="button"
        className={`${fontColor} tab-button`}
        onClick={onChangeTabId}
      >
        {displayText}
      </button>
      {isActive && <hr className="horizontal-ruler" />}
    </li>
  )
}

export default TabItem
