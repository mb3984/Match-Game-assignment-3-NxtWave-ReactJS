import {Component} from 'react'
import ImagesItem from '../ImagesItem'
import TabItem from '../TabItem'
import './index.css'

class MatchImage extends Component {
  state = {
    displayImageUrl: '',
    displayImageId: '',
    thumbnailId: '',
    activeTabId: 'FRUIT',
    score: 0,
    timer: 60,
  }

  componentDidMount() {
    const {imagesList} = this.props
    this.setState({
      displayImageUrl: imagesList[0].imageUrl,
      displayImageId: imagesList[0].id,
    })

    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    this.setState(prevState => ({
      timer: prevState.timer - 1,
    }))
    const {timer} = this.state
    if (timer === 0) {
      clearInterval(this.timerId)
    }
  }

  getRandomId = () => {
    const {imagesList} = this.props
    const randomNo = Math.floor(Math.random() * imagesList.length)
    const randomImageId = imagesList[randomNo].id
    this.setState({
      displayImageUrl: imagesList[randomNo].imageUrl,
      displayImageId: randomImageId,
    })
  }

  filteredImageList = () => {
    const {imagesList} = this.props
    const {activeTabId} = this.state
    return imagesList.filter(eachItem => eachItem.category === activeTabId)
  }

  changeTabId = tabId => {
    this.setState({activeTabId: tabId})
  }

  onClickThumbnail = id => {
    this.setState({thumbnailId: id}, this.validateMatchItem)
  }

  validateMatchItem = () => {
    const {displayImageId, thumbnailId} = this.state
    if (displayImageId === thumbnailId) {
      this.setState(
        prevState => ({score: prevState.score + 1}),
        this.getRandomId(),
      )
    } else {
      this.setState({timer: 0}, clearInterval(this.timerId))
    }
  }

  onClickPlayAgain = () => {
    this.setState({timer: 60, score: 0}, this.componentDidMount())
  }

  renderScoreCardView = () => {
    const {score} = this.state
    return (
      <div className="score-card-bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="trophy-image"
        />
        <div className="your-score-container">
          <p className="your-score">YOUR SCORE</p>
          <p className="score-result">{score}</p>
        </div>
        <button
          type="button"
          className="play-again-button"
          onClick={this.onClickPlayAgain}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
            alt="reset"
            className="reset-image"
          />
          <p className="play-again-title">PLAY AGAIN</p>
        </button>
      </div>
    )
  }

  render() {
    const {displayImageUrl, activeTabId, score, timer} = this.state
    const {tabsList} = this.props
    const filteredList = this.filteredImageList()

    return (
      <>
        <nav className="header-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <ul className="score-timer-container">
            <li>
              <p className="score-title">
                Score: <span className="score-value">{score}</span>
              </p>
            </li>
            <li>
              <div className="timer-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                  alt="timer"
                  className="timer"
                />
                <p className="timer-value">{timer} sec</p>
              </div>{' '}
            </li>
          </ul>
        </nav>
        <div className="responsive-container">
          {timer === 0 ? (
            this.renderScoreCardView()
          ) : (
            <>
              <img src={displayImageUrl} alt="match" className="match-image" />
              <ul className="tab-container">
                {tabsList.map(eachTab => (
                  <TabItem
                    key={eachTab.tabId}
                    tabItem={eachTab}
                    changeTabId={this.changeTabId}
                    isActive={eachTab.tabId === activeTabId}
                  />
                ))}
              </ul>
              <ul className="thumbnail-image-list-container">
                {filteredList.map(eachImage => (
                  <ImagesItem
                    imageDetail={eachImage}
                    key={eachImage.id}
                    onClickThumbnail={this.onClickThumbnail}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </>
    )
  }
}

export default MatchImage
