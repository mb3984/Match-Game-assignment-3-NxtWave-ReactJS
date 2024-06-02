import './index.css'

const ImagesItem = props => {
  const {imageDetail, onClickThumbnail} = props
  const {id, thumbnailUrl} = imageDetail

  const clickThumbnail = () => {
    onClickThumbnail(id)
  }

  return (
    <li className="thumbnail-list">
      <button
        type="button"
        className="thumbnail-button"
        onClick={clickThumbnail}
      >
        <img src={thumbnailUrl} alt="thumbnail" className="thumbnail-img" />
      </button>
    </li>
  )
}

export default ImagesItem
